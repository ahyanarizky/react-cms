const Router = ReactRouter.Router
const Route = ReactRouter.Route
const Link = ReactRouter.Link
const hashHistory = ReactRouter.hashHistory

// ============================================================

// ============================================================
// ============================================================

// ============================================================
// ============================================================

// DATA DATE

// ============================================================
// ============================================================

// ============================================================
// ============================================================

// ============================================================
// ============================================================

// ============================================================

var MyDataDateBox = React.createClass({
  getInitialState: function(){
    return {data: []}
  },
  loadMyDataDates: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'JSON',
      cache: false,
      success: function(response){
        this.setState({
          data: response
        })
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
  },
  componentDidMount: function(){
    this.loadMyDataDates()
  },
  handleMyDataDateSubmit: function(mydatadate){
    var mydatadates = this.state.data
    mydatadate.id = mydatadates.length + 1
    var newMyDataDates = mydatadates.concat([mydatadate])
    this.setState({
      data: newMyDataDates
    })

    $.ajax({
      url: this.props.url,
      dataType: 'JSON',
      type: 'POST',
      data: mydatadate,
      success: function(response){
        this.setState({
          data: response
        })
      }.bind(this),
      error: function(xhr, status, err){
        this.setState({
          data: mydatadates
        })
        console.error(this.props.url, status, err.toString())
      }.bind(this)
    })
  },
  handleMyDataDateDelete: function(id){
    var mydatadates = this.state.data
    $.ajax({
      url: this.props.url,
      dataType: 'JSON',
      type: 'DELETE',
      data: {id: id},
      success: function(response){
        this.setState({
          data: response
        })
      }.bind(this),
      error: function(xhr, status, err){
        this.setState({
          data: mydatadates
        })
        console.error(this.props.url, status, err.toString())
      }.bind(this)
    })
  },
  render: function(){
    return(
      <div className="mydatadateBox">
        <div className="jumbotron">
        <div className="container text-center">
          <h1>DATA DATES</h1>
        </div>
      </div>
        <MyDataDateList data={this.state.data} handleMyDataDateDelete={this.handleMyDataDateDelete}/>
        <MyDataDateForm onMyDataDateSubmit={this.handleMyDataDateSubmit} />
      </div>
    )
  }
})

var MyDataDateList = React.createClass({
  render: function(){
    var h2 = <h2>MyDataDate List</h2>
    var mydatadateNodes = this.props.data.map((mydatadate) => {
      return(
        <MyDataDate key={mydatadate.id} id={mydatadate.id} letter={mydatadate.letter} frequency={mydatadate.frequency} handleMyDataDateDelete={this.props.handleMyDataDateDelete}/>
      )
    }.bind(this))
    return (<div>{mydatadateNodes}</div>)
  }
})

var MyDataDate = React.createClass({
  render(){
    return (
      <div className="mydatadate" id={this.props.id}>
        <div className="well">
          <h3>{this.props.letter}</h3>
          <p>{this.props.frequency}</p>
          <EditDataDateButton id={this.props.id} onMyDataDateEdit={this.props.handleMyDataDateEdit}/>
          &nbsp;
          <DeleteDataDateButton id={this.props.id} onMyDataDateDelete={this.props.handleMyDataDateDelete}/>
        </div>
      </div>
    )
  }
})

var EditDataDateButton = React.createClass({
  handleEdit(e){
    var id = this.props.id
      this.props.onMyDataDateEdit(id)
  },
  render(){
    return(
      <button className="btn btn-warning btn-sm" onClick={this.handleEdit}>Edit</button>
      )
  }
})

var DeleteDataDateButton = React.createClass({
  handleDelete(e){
    var id = this.props.id
    if(confirm("Are you sure you want to delete?") === true){
      this.props.onMyDataDateDelete(id)
    }
  },
  render(){
    return(
      <button className="btn btn-danger btn-sm" onClick={this.handleDelete}>Delete</button>
      )
  }
})

var MyDataDateForm = React.createClass({
  getInitialState(){
    return ({
      letter: '',
      frequency: ''
    })
  },
  handleLetterChange(e){
    this.setState({
      letter: e.target.value
    })
  },
  handleFrequencyChange(e){
    this.setState({
      frequency: e.target.value
    })
  },
  handleSubmit(e){
    e.preventDefault()
    var letter = this.state.letter.trim()
    var frequency = this.state.frequency.trim()
    if(!letter || !frequency){
      return
    }else{
      this.props.onMyDataDateSubmit({
        letter: letter,
        frequency: frequency
      })
      this.setState({
        letter: '',
        frequency: ''
      })
    }
  },
  render(){
    return(
      <div className="well">
        <form onSubmit={this.handleSubmit}>
        <input className="form-control" type="date" value={this.state.letter} onChange={this.handleLetterChange} />
        <br/>
        <input className="form-control" type="text" placeholder="Enter Frequency (Ex: 12.3)" onChange={this.handleFrequencyChange} value={this.state.frequency} />
        <br/>
        <input className="btn btn-md btn-primary" type="submit" value="Add Data Date" />
        </form>
      </div>
    )
  }
})

// ============================================================

// ============================================================
// ============================================================

// ============================================================
// ============================================================

// DATA

// ============================================================
// ============================================================

// ============================================================
// ============================================================

// ============================================================
// ============================================================

// ============================================================

var MyDataBox = React.createClass({
  getInitialState: function(){
    return {data: []}
  },
  loadMyDatas: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'JSON',
      cache: false,
      success: function(response){
        this.setState({
          data: response
        })
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
  },
  componentDidMount: function(){
    this.loadMyDatas()
  },
  handleMyDataSubmit: function(mydata){
    var mydatas = this.state.data
    mydata.id = mydatas.length + 1
    var newMyDatas = mydatas.concat([mydata])
    this.setState({
      data: newMyDatas
    })

    $.ajax({
      url: this.props.url,
      dataType: 'JSON',
      type: 'POST',
      data: mydata,
      success: function(response){
        this.setState({
          data: response
        })
      }.bind(this),
      error: function(xhr, status, err){
        this.setState({
          data: mydatas
        })
        console.error(this.props.url, status, err.toString())
      }.bind(this)
    })
  },
  handleMyDataDelete: function(id){
    var mydatas = this.state.data
    $.ajax({
      url: this.props.url,
      dataType: 'JSON',
      type: 'DELETE',
      data: {id: id},
      success: function(response){
        this.setState({
          data: response
        })
      }.bind(this),
      error: function(xhr, status, err){
        this.setState({
          data: mydatas
        })
        console.error(this.props.url, status, err.toString())
      }.bind(this)
    })
  },
  render: function(){
    return(
      <div className="mydataBox">
        <div className="jumbotron">
        <div className="container text-center">
          <h1>DATAS</h1>
        </div>
      </div>
        <MyDataList data={this.state.data} handleMyDataDelete={this.handleMyDataDelete}/>
        <MyDataForm onMyDataSubmit={this.handleMyDataSubmit} />
      </div>
    )
  }
})

var MyDataList = React.createClass({
  render: function(){
    var h2 = <h2>MyData List</h2>
    var mydataNodes = this.props.data.map((mydata) => {
      return(
        <MyData key={mydata.id} id={mydata.id} letter={mydata.letter} frequency={mydata.frequency} handleMyDataDelete={this.props.handleMyDataDelete}/>
      )
    }.bind(this))
    return (<div>{mydataNodes}</div>)
  }
})

var MyData = React.createClass({
  render(){
    return (
      <div className="mydata" id={this.props.id}>
        <div className="well">
          <h3>{this.props.letter}</h3>
          <p>{this.props.frequency}</p>
          <EditDataButton id={this.props.id} onMyDataEdit={this.props.handleMyDataEdit}/>
          &nbsp;
          <DeleteDataButton id={this.props.id} onMyDataDelete={this.props.handleMyDataDelete}/>
        </div>
      </div>
    )
  }
})

var EditDataButton = React.createClass({
  handleEdit(e){
    var id = this.props.id
      this.props.onMyDataEdit(id)
  },
  render(){
    return(
      <button className="btn btn-warning btn-sm" onClick={this.handleEdit}>Edit</button>
      )
  }
})

var DeleteDataButton = React.createClass({
  handleDelete(e){
    var id = this.props.id
    if(confirm("Are you sure you want to delete?") === true){
      this.props.onMyDataDelete(id)
    }
  },
  render(){
    return(
      <button className="btn btn-danger btn-sm" onClick={this.handleDelete}>Delete</button>
      )
  }
})

var MyDataForm = React.createClass({
  getInitialState(){
    return ({
      letter: '',
      frequency: ''
    })
  },
  handleLetterChange(e){
    this.setState({
      letter: e.target.value
    })
  },
  handleFrequencyChange(e){
    this.setState({
      frequency: e.target.value
    })
  },
  handleSubmit(e){
    e.preventDefault()
    var letter = this.state.letter.trim()
    var frequency = this.state.frequency.trim()
    if(!letter || !frequency){
      return
    }else{
      this.props.onMyDataSubmit({
        letter: letter,
        frequency: frequency
      })
      this.setState({
        letter: '',
        frequency: ''
      })
    }
  },
  render(){
    return(
      <div className="well">
        <form onSubmit={this.handleSubmit}>
        <input className="form-control" type="text" placeholder="Enter Letter (Ex: E)" value={this.state.letter} onChange={this.handleLetterChange} />
        <br/>
        <input className="form-control" type="text" placeholder="Enter Frequency (Ex: 11.7)" onChange={this.handleFrequencyChange} value={this.state.frequency} />
        <br/>
        <input className="btn btn-md btn-primary" type="submit" value="Add Data" />
      </form>
      </div>
    )
  }
})

// ============================================================

// ============================================================
// ============================================================

// ============================================================
// ============================================================

// ROUTES

// ============================================================
// ============================================================

// ============================================================
// ============================================================

// ============================================================
// ============================================================

// ============================================================

const Nav = React.createClass({
  render: function(){
    return(
      <div>
      <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container">
              <div className="navbar-header">
                <Link to="/"><a className="navbar-brand" href="#">CMS API</a></Link>
              </div>
              <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                  <li><Link to="/datas">Datas</Link></li>
                  <li><Link to="/datadates">Datadates</Link></li>
                </ul>
              </div>
            </div>
          </nav>
      {this.props.children}
      </div>
      )
  }
})

const Home = React.createClass({
  render: function(){
    return(
      <div>
        <Nav />
        <h2 className="text-center">Welcome to CMS-API!</h2>
      </div>
      )
  }
})

const Data = React.createClass({
  render: function(){
    return(
      <div>
        <Nav />
        <MyDataBox url="http://localhost:3000/api/mydatas"/>
      </div>
      )
  }
})

const Datadate = React.createClass({
  render: function(){
    return(
      <div>
      <Nav />
        <MyDataDateBox url="http://localhost:3000/api/mydatadates"/>
      </div>
      )
  }
})

ReactDOM.render(
  (
  <Router history={hashHistory}>
    <Route path="/" component={Home} />
    <Route path="/datas" component={Data} />
    <Route path="/datadates" component={Datadate} />
  </Router>
  ), document.getElementById('content')
)