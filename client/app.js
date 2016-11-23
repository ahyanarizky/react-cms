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
      console.log('datapage');
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
      console.log('getinitdatacontent');
        return {data: []}
    },
    loadData: function() {
      console.log('ajaxloaddata');
      console.log('this', this);
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(response) {
              console.log(response);
                this.setState({data: response})
                console.log('state after ajax response :', this.state.data);
            }.bind(this),
            error: function(xhr, status, err) {
                console.log('error loadData');
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        })
    },
    deleteData: function(data_id) {
      var del = confirm('Are you sure want to delete this data ?')
      if (del) {
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          cache: false,
          data: {
            id: data_id
          },
          success: function() {
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
      console.log('render DataContent');
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1>Welcome to Data Page</h1>
                </div>
                <ButtonAdd/>
                <TableDataBox dataContentState={this.state.data} funcDelete={this.deleteData}/>
            </div>
        )
    },
    componentDidMount: function() {
      console.log('componentDidMount');
        this.loadData()
    }

})

const TableDataBox = React.createClass({
    render: function() {
      console.log('render tableDataBox');
      console.log('tableDataBox data:', this.props.dataContentState);
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
      console.log(typeof(this.props.dataContentState));
        var tableContent = this.props.dataContentState.map(function(data) {
            console.log('each data in table data :', data);
            return (<EachData key={data.dataId} letter={data.letter} frequency={data.frequency} funcDelete={this.props.funcDelete}/>)
        }.bind(this))
        console.log('tableContent :', tableContent);
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
        this.props.funcDelete(this.props.key)
    },
    render: function() {
      console.log('render each data');
        return (
            <tr>
                <td>{this.props.letter}</td>
                <td>{this.props.frequency}</td>
                <td>
                    <span className="form-group">
                        <button className="btn btn-success">
                            <span className="glyphicon glyphicon-edit"></span>
                            Update</button>
                        <button className="btn btn-danger" onClick={this.handleDelete}>
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
          console.log('render form add');
            return (<FormAdd hideForm={this.hideFormAdd} url="http://localhost:3000/api/data" handleDataSubmit={this.handleDataSubmit}/>)
        } else {
          console.log('render button add');
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
    },
    handleDataSubmit: function(value) {
        var dataNow = this.state.data
        this.setState({data: dataNow})
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            method: 'post',
            data: value,
            success: function(response) {
                this.setState({data: response})
            }.bind(this),
            error: function(xhr, status, err) {
                this.setState({data: dataNow})
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        })
    }

})

const FormAdd = React.createClass({
    getInitialState: function() {
        return {letter: '', frequency: ''}
    },
    handleLetterChange: function(e) {
        this.setState({letter: e.target.value})
        console.log('letter state', this.state.letter);
    },
    handleFrequencyChange: function(e) {
        this.setState({frequency: e.target.value})
        console.log('freq state', this.state.frequency);
    },
    handleSubmit: function(e) {
        console.log('this is submit');
        e.preventDefault()
        var letter = this.state.letter.trim()
        var frequency = this.state.frequency.trim()
        if (!letter || !frequency) {
            return
        } else {
            this.props.handleDataSubmit({letter: letter, frequency: frequency})
            this.setState({letter: '', frequency: ''})
        }
    },
    render: function() {
        console.log('state', this.state);
        return (
            <div>
                <form className="form-inline" onSubmit={this.props.handleSubmit}>
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
                        <button type="button" className="btn btn-default" onClick={this.props.hideForm}>Cancel</button>
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
