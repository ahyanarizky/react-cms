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
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//                                               DATA PAGE
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------

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
        console.log('data_id :', data_id);
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
            return;
        }
    },
    editData: function(data_id, letter, frequency) {
        console.log('data_id :', data_id);
        console.log('letter :', letter);
        console.log('frequency :', frequency);
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            method: 'PUT',
            data: {
                id: data_id,
                letter: letter,
                frequency: frequency
            },
            success: function(response) {
                this.loadData()
            }.bind(this),
            error: function(xhr, status, err) {
                console.log('failed');
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        })
    },
    render: function() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1>Welcome to Data Page</h1>
                </div>
                <ButtonAdd postDataFromDataContent={this.postData}/>
                <TableDataBox dataContentState={this.state.data} funcDelete={this.deleteData} funcEdit={this.editData}/>
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
                <TableData dataContentState={this.props.dataContentState} funcDelete={this.props.funcDelete} funcEdit={this.props.funcEdit}/>
            </div>
        )
    }
})

const TableData = React.createClass({
    getInitialState: function() {
        return {searchedLetter: '', searchedFrequency: ''}
    },
    getSearchedLetter(e) {
        this.setState({searchedLetter: e.target.value})
        console.log('letter :', this.state.searchedLetter);

    },
    getSearchedFrequency(e) {
        this.setState({searchedFrequency: e.target.value})
        console.log('freq :', this.state.searchedFrequency);

    },
    render: function() {
        let filteredData = this.props.dataContentState
        console.log('filetr: ',filteredData);

        if (this.state.searchedLetter != '' && this.state.searchedFrequency != '') {
            filteredData = this.props.dataContentState.filter((data) => {
                return data.letter.toLowerCase().startsWith(this.state.searchedLetter.toLowerCase()) && data.frequency.startsWith(this.state.searchedFrequency)
            })
        } else if (this.state.searchedLetter != '') {
            filteredData = this.props.dataContentState.filter((data) => {
                return data.letter.toLowerCase().startsWith(this.state.searchedLetter.toLowerCase())
            })
        } else if (this.state.searchedFrequency != '') {
            filteredData = this.props.dataContentState.filter((data) => {
                return data.frequency.startsWith(this.state.searchedFrequency)
            })
        }
        var tableContent = filteredData.map(function(data) {
            return (<EachData key={data.dataId} letter={data.letter} frequency={data.frequency} dataId={data.dataId} funcDelete={this.props.funcDelete} funcEdit={this.props.funcEdit}/>)
        }.bind(this))
        return (
            <div>
                <div className="container search-form well">
                    <SearchForm atLetterChange={this.getSearchedLetter.bind(this)} valLetter={this.state.searchedLetter} atFrequencyChange={this.getSearchedFrequency.bind(this)} valFrequency={this.state.searchedFrequency}/>
                </div>
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
            </div>
        )
    }
})

const SearchForm = React.createClass({
  render: function() {
    return (
      <form className="form-inline">
          <div className="form-group">
              <label className="inline">Letter</label>
              <input type="text" className="form-control" id="form-search-letter" value={this.props.valLetter} onChange={this.props.atLetterChange} placeholder="Search Letter"/>
          </div>
          <div className="form-group">
              <label className="inline">Frequency</label>
              <input type="text" className="form-control" id="form-search-frequency" value={this.props.valFrequency} onChange={this.props.atFrequencyChange} placeholder="Search Frequency"/>
          </div>
      </form>
    )
  }
})

const EachData = React.createClass({
    getInitialState: function() {
        return {
            editing: false,
            letter: this.props.letter || '',
            frequency: this.props.frequency || ''
        }
    },
    handleDelete: function() {
        console.log('this props :', this.props);
        this.props.funcDelete(this.props.dataId)
    },
    handleEditing() {
        console.log('handleEditing');
        this.setState({editing: true})
    },
    handleCancelButton() {
        this.setState({editing: false})
    },
    handleLetterChange(e) {
        this.setState({letter: e.target.value})
        console.log('letter state : ', this.state.letter);
    },
    handleFrequencyChange(e) {
        this.setState({frequency: e.target.value})
        console.log('freq state : ', this.state.frequency);

    },
    confirmEdit() {
        console.log('state :', this.state);
        var letter = this.state.letter.trim()
        var frequency = this.state.frequency
        var upLetter = letter.toUpperCase()
        var upFreq = frequency
        console.log('letter :', letter);
        console.log('freq :', frequency);
        if (!letter || !frequency) {
            return;
        } else {
            this.props.funcEdit(this.props.dataId, upLetter, upFreq)
            this.setState({editing: false})
        }
    },

    render: function() {
        if (this.state.editing) {
            return (
                <tr>
                    <form className="form-inline" onSubmit={this.confirmEdit}>
                        <td>
                            <div className="form-group">
                                <label>Edit Letter</label>
                                <input type="text" className="form-control let-freq" id="input-edit-letter" placeholder="Enter Letter" value={this.state.letter} onChange={this.handleLetterChange}/>
                            </div>
                        </td>
                        <td>
                            <div className="form-group">
                                <label>Edit Frequency</label>
                                <input type="text" className="form-control let-freq" id="input-edit-frequency" placeholder="Enter Frequency" value={this.state.frequency} onChange={this.handleFrequencyChange}/>
                            </div>
                        </td>
                        <td>
                            <button type="submit" className="btn btn-success btn-in">
                                <span className="glyphicon glyphicon-ok"></span>
                                Confirm Edit</button>
                            <span>
                                <a onClick={this.handleCancelButton} className="btn btn-default">
                                    <span className="glyphicon glyphicon-remove"></span>
                                    Cancel</a>
                            </span>
                        </td>
                    </form>
                </tr>
            )
        } else {
            return (
                <tr>
                    <td>{this.props.letter}</td>
                    <td>{this.props.frequency}</td>
                    <td>
                        <span className="form-group">
                            <button className="btn btn-success" onClick={this.handleEditing}>
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
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//                                               DATADATE PAGE
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------

const DataDatePage = React.createClass({
    render: function() {
        return (
            <div>
                <Navbar/>
                <DataDateContent url="http://localhost:3000/api/datadate"/>
            </div>
        )
    }
})

const DataDateContent = React.createClass({
  getInitialState: function() {
    console.log('dd content');
      return {datadate: []}
  },
  loadDataDate: function() {
    console.log('load dd');
      $.ajax({
          url: this.props.url,
          dataType: 'json',
          cache: false,
          success: function(response) {
              this.setState({datadate: response})
          }.bind(this),
          error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
          }.bind(this)
      })
  },
  postDataDate: function(objectFromFormAdd) {
      var recentState = this.state.datadate
      $.ajax({
          url: this.props.url,
          dataType: 'json',
          method: 'post',
          data: objectFromFormAdd,
          success: function(response) {
              var newPost = recentState.concat([response])
              this.setState({datadate: newPost})
          }.bind(this),
          error: function(xhr, status, err) {
              this.setState({datadate: recentState})
              console.error(this.props.url, status, err.toString());
          }.bind(this)
      })
  },
  deleteDataDate: function(datadate_id) {
      console.log('datadate_id :', datadate_id);
      var del = confirm('Are you sure want to delete this datadate ?')
      if (del) {
          $.ajax({
              url: this.props.url,
              method: 'DELETE',
              dataType: 'json',
              data: {
                  datadateId: datadate_id
              },
              success: function(response) {
                  console.log('success');
                  this.loadDataDate()
              }.bind(this),
              error: function(xhr, status, err) {
                  console.log('failed');
                  console.error(this.props.url, status, err.toString());
              }.bind(this)
          })
      } else {
          console.log('confirm error');
          return;
      }
  },
  editDataDate: function(datadate_id, letter, frequency) {
      $.ajax({
          url: this.props.url,
          dataType: 'json',
          method: 'PUT',
          data: {
              datadateId: datadate_id,
              letter: letter,
              frequency: frequency
          },
          success: function(response) {
              this.loadDataDate()
          }.bind(this),
          error: function(xhr, status, err) {
              console.log('failed');
              console.error(this.props.url, status, err.toString());
          }.bind(this)
      })
  },
  render: function() {
      return (
          <div className="container">
              <div className="jumbotron">
                  <h1>Welcome to Data Date Page</h1>
              </div>
              <ButtonAddDate funcAdd={this.postDataDate}/>
              <TableDataDateBox ddstate={this.state.datadate} funcDelete={this.deleteDataDate} funcEdit={this.editDataDate}/>
          </div>
      )
  },
  componentDidMount: function() {
      this.loadDataDate()
  }

})
const TableDataDateBox = React.createClass({
    render: function() {
      console.log('table dd box');
        return (
            <div className="tableDataDateBox">
                <h1>CMS Table</h1>
                <TableDataDate ddstate={this.props.ddstate} funcDelete={this.props.funcDelete} funcEdit={this.props.funcEdit}/>
            </div>
        )
    }
})


const TableDataDate = React.createClass({
    // getInitialState: function() {
    //     return {searchedLetter: '', searchedFrequency: ''}
    // },
    // getSearchedLetter(e) {
    //     this.setState({searchedLetter: e.target.value})
    // },
    // getSearchedFrequency(e) {
    //     this.setState({searchedFrequency: e.target.value})
    // },
    render: function() {
      console.log('table dd');
        var tableContent = this.props.ddstate.map(function(data) {
          console.log('data each', data);
            return (<EachDataDate key={data.datadateId} letter={data.letter} frequency={data.frequency} datadateId={data.datadateId} funcDelete={this.props.funcDelete} funcEdit={this.props.funcEdit}/>)
        }.bind(this))
        return (
            <div>
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
            </div>
        )
    }
})
const EachDataDate = React.createClass({
    getInitialState: function() {
      console.log('each datadate');
        return {
            editing: false,
            letter: this.props.letter || '',
            frequency: this.props.frequency || ''
        }
    },
    handleDelete: function() {
         this.props.funcDelete(this.props.datadateId)
    },
    formEdit() {
        this.setState({editing: true})
    },
    handleCancelButton() {
        this.setState({editing: false, letter: this.props.letter, frequency: this.props.frequency})
    },
    handleLetterChange(e) {
        this.setState({letter: e.target.value})
    },
    handleFrequencyChange(e) {
        this.setState({frequency: e.target.value})
    },
    confirmEdit() {
        console.log('state :', this.state);
        var letter = this.state.letter.trim()
        var frequency = this.state.frequency.trim()
        var upLetter = letter.toUpperCase()
        var upFreq = frequency.toUpperCase()
        console.log('letter :', letter);
        console.log('freq :', frequency);
        if (!letter || !frequency) {
            return;
        } else {
            this.props.funcEdit(this.props.datadateId, upLetter, upFreq)
            this.setState({editing: false})
        }
    },

    render: function() {
      if (!this.state.editing) {
        return (
            <tr>
                <td>{moment(this.props.letter).format('YYYY/MM/DD')}</td>
                <td>{this.props.frequency}</td>
                <td>
                    <span className="form-group">
                        <button className="btn btn-success" onClick={this.formEdit.bind(this)}>
                            <span className="glyphicon glyphicon-edit"></span>
                            Update</button>
                        <button className="btn btn-danger inline-btn" onClick={this.handleDelete.bind(this)}>
                            <span className="glyphicon glyphicon-trash"></span>
                            Delete</button>
                    </span>
                </td>
            </tr>
        )
      } else {
        return (
            <tr>
                <form className="form-inline" onSubmit={this.confirmEdit.bind(this)}>
                    <td>
                        <div className="form-group">
                            <label>Edit Letter</label>
                            <input type="date" className="form-control let-freq" id="input-edit-letter-dd" placeholder="Enter Letter" value={this.state.letter} onChange={this.handleLetterChange.bind(this)}/>
                        </div>
                    </td>
                    <td>
                        <div className="form-group">
                            <label>Edit Frequency</label>
                            <input type="text" className="form-control let-freq" id="input-edit-frequency-dd" placeholder="Enter Frequency" value={this.state.frequency} onChange={this.handleFrequencyChange.bind(this)}/>
                        </div>
                    </td>
                    <td>
                        <button type="submit" className="btn btn-success btn-in">
                            <span className="glyphicon glyphicon-ok"></span>
                            Confirm Edit</button>
                        <span>
                            <a onClick={this.handleCancelButton} className="btn btn-default">
                                <span className="glyphicon glyphicon-remove"></span>
                                Cancel</a>
                        </span>
                    </td>
                </form>
            </tr>
        )
      }
    }
})

const ButtonAddDate = React.createClass({
    getInitialState: function() {
        return {isAdding: false}
    },
    render: function() {
        if (this.state.isAdding) {
            return (<FormAddDate hideForm={this.hideFormAdd} funcAdd={this.props.funcAdd}/>)
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

const FormAddDate = React.createClass({
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
            this.props.funcAdd({letter: upLetter, frequency: upFreq})
            this.setState({letter: '', frequency: ''})
        }
    },
    render: function() {
        return (
            <div>
                <form className="form-inline" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Letter</label>
                        <input type="date" className="form-control let-freq" id="input-add-letter" placeholder="Enter Date" value={this.state.letter} onChange={this.handleLetterChange}/>
                    </div>
                    <div className="form-group">
                        <label>Frequency</label>
                        <input type="text" className="form-control let-freq" id="input-add-frequency" placeholder="0.000000" value={this.state.frequency} onChange={this.handleFrequencyChange}/>
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


ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={HomePage}/>
        <Route path="/data" component={DataPage}/>
        <Route path="/datadate" component={DataDatePage}/>
    </Router>
), document.getElementById('main-navbar'))
