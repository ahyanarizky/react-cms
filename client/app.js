const Router = ReactRouter.Router
const Route = ReactRouter.Route
const Link = ReactRouter.Link
const hashHistory = ReactRouter.hashHistory

const Navbar = React.createClass({
    render: function() {
        return (
            <nav className="navbar navbar-inverse navbar-static-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">CMS - React</a>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/data">Data</Link>
                            </li>
                            <li>
                                <Link to="/datadate">Data Date</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
})
const HomeContent = React.createClass({
    render: function() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1>Welcome to Home</h1>
                </div>
            </div>
        )
    }
})

const HomePage = React.createClass({
    render: function() {
        return (
            <div>
                <Navbar/>
                <HomeContent/>
            </div>
        )
    }
})

const DataPage = React.createClass({
    render: function() {
        return (
            <div>
                <Navbar/>
                <DataContent url="http://localhost:3000/api/data"/>
            </div>
        )
    }
})

const DataContent = React.createClass({
    getInitialState: function() {
        return {data: []}
    },
    loadData: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(response) {
                this.setState({data: response})
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        })
    },
    postData: function(objectFromFormAdd) {
      var recentState = this.state.data
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        method: 'post',
        data: objectFromFormAdd,
        success: function(response) {
          var newPost = recentState.concat([response])
          this.setState({data: newPost})
        }.bind(this),
        error: function(xhr, status, err) {
            this.setState({data: recentState})
            console.error(this.props.url, status, err.toString());
        }.bind(this)
      })
    },
    deleteData: function(data_id) {
      console.log('data_id :',data_id);
      var del = confirm('Are you sure want to delete this data ?')
      if (del) {
        $.ajax({
          url: this.props.url,
          method: 'DELETE',
          dataType: 'json',
          data: {
            id: data_id
          },
          success: function(response) {
            console.log('success');
            this.loadData()
          }.bind(this),
          error: function(xhr, status, err) {
            console.log('failed');
              console.error(this.props.url, status, err.toString());
          }.bind(this)
        })
      } else {
        console.log('confirm error');
        return ;
      }
    },
    render: function() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1>Welcome to Data Page</h1>
                </div>
                <ButtonAdd postDataFromDataContent={this.postData}/>
                <TableDataBox dataContentState={this.state.data} funcDelete={this.deleteData}/>
            </div>
        )
    },
    componentDidMount: function() {
        this.loadData()
    }

})

const TableDataBox = React.createClass({
    render: function() {
        return (
            <div className="tableDataBox">
                <h1>CMS Table</h1>
                <TableData dataContentState={this.props.dataContentState} funcDelete={this.props.funcDelete}/>
            </div>
        )
    }
})

const TableData = React.createClass({
    render: function() {
        var tableContent = this.props.dataContentState.map(function(data) {
            return (<EachData key={data.dataId} letter={data.letter} frequency={data.frequency} dataId={data.dataId} funcDelete={this.props.funcDelete}/>)
        }.bind(this))
        return (
            <table className="table table-hover">
                <thead className="thead-inverse">
                    <tr>
                        <th>Letter</th>
                        <th>Frequency</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }
})

const EachData = React.createClass({
    handleDelete: function() {
        console.log('this props :', this.props);
        this.props.funcDelete(this.props.dataId)
    },
    render: function() {
        return (
            <tr>
                <td>{this.props.letter}</td>
                <td>{this.props.frequency}</td>
                <td>
                    <span className="form-group">
                        <button className="btn btn-success">
                            <span className="glyphicon glyphicon-edit"></span>
                            Update</button>
                        <button className="btn btn-danger inline-btn" onClick={this.handleDelete}>
                            <span className="glyphicon glyphicon-trash"></span>
                            Delete</button>
                    </span>
                </td>
            </tr>
        )
    }
})

const ButtonAdd = React.createClass({
    getInitialState: function() {
        return {isAdding: false}
    },
    render: function() {
        if (this.state.isAdding) {
            return (<FormAdd hideForm={this.hideFormAdd} postDataFromDataContent={this.props.postDataFromDataContent}/>)
        } else {
            return (
                <div>
                    <button className="btn btn-primary" onClick={this.showFormAdd}>
                        <span className="glyphicon glyphicon-plus"></span>
                        add</button>
                    <div id="add-form"></div>
                </div>
            )

        }
    },
    showFormAdd: function() {
        this.setState({isAdding: true})
    },
    hideFormAdd: function() {
        this.setState({isAdding: false})
    }
})

const FormAdd = React.createClass({
    getInitialState: function() {
        return {letter: '', frequency: ''}
    },
    handleLetterChange: function(e) {
        this.setState({letter: e.target.value})
    },
    handleFrequencyChange: function(e) {
        this.setState({frequency: e.target.value})
    },
    handleSubmit: function() {
        var letter = this.state.letter.trim()
        var frequency = this.state.frequency.trim()
        var upLetter = letter.toUpperCase()
        var upFreq = frequency.toUpperCase()
        if (!letter || !frequency) {
            return
        } else {
            this.props.postDataFromDataContent({letter: upLetter, frequency: upFreq})
            this.setState({letter: '', frequency: ''})
        }
    },
    render: function() {
        return (
            <div>
                <form className="form-inline" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Letter</label>
                        <input type="text" className="form-control let-freq" id="input-add-letter" placeholder="Enter Letter" value={this.state.letter} onChange={this.handleLetterChange}/>
                    </div>
                    <div className="form-group">
                        <label>Frequency</label>
                        <input type="text" className="form-control let-freq" id="input-add-frequency" placeholder="Enter Frequency" value={this.state.frequency} onChange={this.handleFrequencyChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary btn-in">Post</button>
                    <span>
                        <a role="button" className="btn btn-default" onClick={this.props.hideForm}>Cancel</a>
                    </span>
                </form>
            </div>
        )
    }
})

const DataDatePage = React.createClass({
    render: function() {
        return (
            <div>
                <Navbar/>
                <DataDateContent/>
            </div>
        )
    }
})

const DataDateContent = React.createClass({
    render: function() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1>Welcome to Data Date Page</h1>
                </div>
                <ButtonAdd/>
            </div>
        )
    }
})

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={HomePage}/>
        <Route path="/data" component={DataPage}/>
        <Route path="/datadate" component={DataDatePage}/>
    </Router>
), document.getElementById('main-navbar'))
