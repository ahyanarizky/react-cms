const Router = ReactRouter.Router
const Route = ReactRouter.Route
const Link = ReactRouter.Link
const hashHistory = ReactRouter.hashHistory
const withRouter = ReactRouter.withRouter

function getUser(){
  var token = localStorage.getItem('token')
  if (!token) return
  else {
    return(
      jwt_decode(token)
    )
  }
}

const Navigation = React.createClass({
  render(){
    return(
      !getUser() ?
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">cms-api</Link>
        </div>
        <ul className="nav navbar-nav">
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </div>
      :
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/dashboard">cms-api</Link>
        </div>
        <ul className="nav navbar-nav">
          <li><Link to="/data">Data</Link></li>
          <li><Link to="/dataDate">Data Date</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </div>
    )
  }
})

const App = React.createClass({
  render: function(){
    return(
      <div>
        <nav className="navbar navbar-default">
          <Navigation />
        </nav>
        {(hashHistory.getCurrentLocation().pathname === '/')
          ?
            (!getUser() ? <Home />  : <Dashboard />)
          : this.props.children}
      </div>
    )
  }
})

// ---------------------------------
// index
// ---------------------------------

const Home = React.createClass({
  render: function(){
    return(
      <div>
        <div className="container">
          <h1>Welcome to cms-api, please login or register</h1>
        </div>
      </div>
    )
  }
})

const Login = React.createClass({
  getInitialState(){
    return({
      error: false,
      username: '',
      password: ''
    })
  },
  handleUsername(e){
    this.setState({
      username: e.target.value
    })
  },
  handlePassword(e){
    this.setState({
      password: e.target.value
    })
  },
  handleSubmitLogin(e){
    e.preventDefault()
    var data_login = {
      username: this.state.username.trim(),
      password: this.state.password.trim()
    }

    if(!data_login.username || !data_login.password){
      return
    }else{
      $.post({
        url: "http://localhost:3000/api/users/login",
        data: data_login,
        success: function(login_user){
          localStorage.setItem('token', login_user.token)
          // this.setState({
          //   token: login_user.token
          // })
          if(getUser().username){
            this.props.router.replace('/dashboard')
          }else{
            alert('input is wrong')
            this.setState({
              username: '',
              password: '',
              error: true,
              token: ''
            })
            this.props.router.replace('/login')
          }
        }.bind(this)
      })

      this.setState({
        username: '',
        password: ''
      })
    }
  },
  render: function(){
    return(
      <div>
          <div className="container" onSubmit={this.handleSubmitLogin}>
            <form id="form_login">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username" onChange={this.handleUsername} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" onChange={this.handlePassword} />
              </div>
              <div className="form-group">
                <button type="submit" id="btn_login" className="btn btn-lg btn-success">Login</button>
              </div>
              {this.state.error && (
                <p>Input is wrong</p>
              )}
            </form>
          </div>
      </div>
    )
  }
})

const Register = React.createClass({
  getInitialState(){
    return({
      username: '',
      password: '',
      email: ''
    })
  },
  handleUsername(e){
    this.setState({
      username: e.target.value
    })
  },
  handlePassword(e){
    this.setState({
      password: e.target.value
    })
  },
  handleEmail(e){
    this.setState({
      email: e.target.value
    })
  },
  handleSubmitRegister(e){
    e.preventDefault()
    var data_regis = {
      username: this.state.username.trim(),
      password: this.state.password.trim(),
      email: this.state.email.trim()
    }

    if(!data_regis.username || !data_regis.password || !data_regis.email){
      return
    }else{
      $.post({
        url: "http://localhost:3000/api/users/login",
        data: data_regis,
        success: function(new_user){
          localStorage.setItem('token', new_user.token)

          if(getUser().username){
            this.props.router.replace('/dashboard')
          }
        }.bind(this)
      })

      this.setState({
        username: '',
        password: ''
      })
    }
  },
  render: function(){
    return(
      <div>
          <div className="container">
            <form id="form_register" onSubmit={this.handleSubmitRegister}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username" onChange={this.handleUsername} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" onChange={this.handlePassword} />
              </div>
              <div className="form-group">
                <label htmlFor="confirm_password">Confirm Password</label>
                <input type="password" className="form-control" id="confirm_password" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" className="form-control" id="email" onChange={this.handleEmail} />
              </div>
              <div className="form-group">
                <button type="submit" id="btn_register" className="btn btn-lg btn-success">Register</button>
              </div>
            </form>
          </div>
      </div>
    )
  }
})

// ---------------------------------
// dashboard
// ---------------------------------

const Dashboard = React.createClass({
  render: function(){
    return(
      <div>
        <div className="container">
          <h1>Dashboard</h1>
          <p>Welcome {getUser().username} | {getUser().email}</p>
        </div>
      </div>
    )
  }
})

// ---------------------------------
// data
// ---------------------------------

const DataBox = React.createClass({
  getInitialState(){
    return({
      data: []
    })
  },
  load_all_data(){
    $.ajax({
      url: 'http://localhost:3000/api/datas/',
      success: function(all_data){
        // console.log(all_data);
        this.setState({
          data: all_data
        })
      }.bind(this)
    })
  },
  componentDidMount(){
    this.load_all_data()
  },
  handleDataSubmit(letter, frequency){
    // console.log(this.state.data);
    var add = this.state.data.concat({
      letter: letter,
      frequency: frequency
    }).reverse()
    // console.log(test.reverse());
    this.setState({
      data : add
    })

    $.post({
      url: 'http://localhost:3000/api/datas',
      data: {
        letter: letter,
        frequency: frequency
      },
      success: function(data){
        // console.log(data);
        this.load_all_data()
        // this.setState({
        //   data: data
        // })
      }.bind(this)
    })
  },
  handleSaveData(id, letter, frequency){
    var edit = this.state.data.map(data => data._id === id ? Object.assign({}, data, {letter: letter, frequency: frequency}) : data )
    // console.log(this.state.data);

    this.setState({
      data: edit
    })
    // console.log(this.state.data);
    $.ajax({
      url: 'http://localhost:3000/api/datas/'+id,
      method: 'PUT',
      data: {
        letter: letter,
        frequency: frequency
      },
      success: function(new_data){
        console.log(new_data);
        // this.load_all_data()
      }.bind(this)
    })
  },
  handleDeleteData(id){
    var deleteData = this.state.data.filter(data => data._id !== id)

    this.setState({
      data : deleteData
    })

    $.ajax({
      url: 'http://localhost:3000/api/datas/'+id,
      method: 'DELETE',
      success: function(deleted_data){
        console.log(deleted_data);
        // this.load_all_data()
      }.bind(this)
    })
  },
  render: function(){
    return(
      <div className="container">
        <DataFormAdd onDataSubmit={this.handleDataSubmit}/>
        <DataList data={this.state.data} onSaveData={this.handleSaveData} onDeleteData={this.handleDeleteData} />
      </div>
    )
  }
})

const DataList = React.createClass({
  handleSaveData(id, letter, frequency){
    this.props.onSaveData(id, letter, frequency)
  },
  handleDeleteData(id){
    this.props.onDeleteData(id)
  },render(){
    // console.log(this.props.data);
    var all_Data = this.props.data.map((data) => {
      return (
        <Data key={data._id || Date.now()} dataId={data._id} letter={data.letter} frequency={data.frequency} onSaveData={this.handleSaveData} onDeleteData={this.handleDeleteData} />
      )
    })
    // console.log(all_Data);
    return(
      <table className="table table-striped" id="table">
        <thead>
          <tr>
            <th className="col-sm-4">Letter</th>
            <th className="col-sm-4">Frequency</th>
            <th className="col-sm-4">Action</th>
          </tr>
        </thead>
        <tbody id="body_table">
          {all_Data}
        </tbody>
      </table>
    )
  }
})

const Data = React.createClass({
  getInitialState(){
    return({
        isEdit: false,
        letter: this.props.letter || '',
        frequency: this.props.frequency || ''
    })
  },
  onEditClick(){
    this.setState({
      isEdit: true
    })
  },
  onCancelClick(e){
    e.preventDefault()
    this.setState({
      isEdit: false
    })
  },
  handleChangeLetter(e){
    this.setState({
      letter: e.target.value
    })
  },
  handleChangeFreq(e){
    this.setState({
      frequency: e.target.value
    })
  },
  onEditSave(e){
    e.preventDefault()
    var letter = this.state.letter.trim()
    var frequency = this.state.frequency.trim()

    if(!letter || !frequency){
      return
    }else{
      this.props.onSaveData(this.props.dataId, letter, frequency)
      this.setState({
        letter: '',
        frequency: '',
        isEdit: false
      })
    }
  },
  onDeleteClick(e){
    e.preventDefault()
    if(confirm("Are you sure want to delete?")){
      this.props.onDeleteData(this.props.dataId)
    }
  },
  render(){
    if(this.state.isEdit){
      return(
        <tr>
            <td className="form-group">
              <input type="text" onChange={this.handleChangeLetter} value={this.state.letter} className="form-control" />
            </td>
             <td className="form-group">
               <input type="text" onChange={this.handleChangeFreq} value={this.state.frequency} className="form-control" />
             </td>
            <td>
              <button type="button" onClick={this.onEditSave} className="btn btn-warning" >Save</button>
              <button type="button" onClick={this.onCancelClick} className="btn btn-danger" >Cancel</button>
            </td>
        </tr>
      )
    }else{
      return(
        <tr>
          <td>
            {this.props.letter}
          </td>
          <td>
            {this.props.frequency}
          </td>
          <td>
            <button type="button" onClick={this.onEditClick} className="btn btn-warning" >Edit</button>
            <button type="button" onClick={this.onDeleteClick} className="btn btn-danger" >Delete</button>
          </td>
        </tr>
      )
    }
  }
})

const DataFormAdd = React.createClass({
  getInitialState(){
    return({
      letter: '',
      frequency: '',
      isFormOpen: false
    })
  },
  onFormOpen(){
    this.setState({
      isFormOpen: true
    })
  },
  onFormClose(){
    this.setState({
      isFormOpen: false
    })
  },
  handleChangeLetter(e){
    this.setState({
      letter: e.target.value
    })
  },
  handleChangeFreq(e){
    this.setState({
      frequency: e.target.value
    })
  },
  handleDataSubmit(e){
    e.preventDefault()
    var letter = this.state.letter.trim()
    var frequency = this.state.frequency.trim()

    if(!letter || !frequency){
      return
    }else{
      this.props.onDataSubmit(letter, frequency)

      this.setState({
        text: '',
        frequency: '',
        isFormOpen: false
      })
    }
  },
  render(){
    if(this.state.isFormOpen){
      return(
        <div>
          <button type="button" onClick={this.onFormClose} className="btn btn-default">Hide</button>
          <form onSubmit={this.handleDataSubmit} className="form-inline">
            <div className="form-group">
              <label htmlFor="letter">Letter :</label>
              <input type="text" onChange={this.handleChangeLetter} className="form-control" />
            </div>
             <div className="form-group">
               <label htmlFor="frequency">Frequency :</label>
               <input type="text" onChange={this.handleChangeFreq} className="form-control" />
             </div>
             <input type="hidden" id="id" />
             <button type="submit" className="btn btn-success" id="btn_add">Add</button>
           </form>
        </div>
      )
    }else{
      return(
        <div>
          <button type="button" onClick={this.onFormOpen} className="btn btn-default">Add</button>
        </div>
      )
    }
  }
})

function authDashboard(nextState, replace){
  if(!localStorage.getItem('token')){
    replace({
      pathname: '/login',
      // state: { nextPathname: nextState.location.pathname }
    })
  }
}

function authIndex(nextState, replace){
  if(localStorage.getItem('token')){
    replace({
      pathname: '/dashboard',
      // state: { nextPathname: nextState.location.pathname }
    })
  }
}

function processLogout(nextState, replace){
  localStorage.removeItem('token')
  replace({
    pathname: '/',
    // state: { nextPathname: nextState.location.pathname }
  })
}

ReactDOM.render(
  (
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Route path="/login" component={Login} onEnter={authIndex} />
        <Route path="/register" component={Register} onEnter={authIndex} />
        <Route path="/dashboard" component={Dashboard} onEnter={authDashboard} />
        <Route path="/data" component={DataBox} onEnter={authDashboard} />
        <Route path="/logout" onEnter={processLogout} />
      </Route>
    </Router>
  ), document.getElementById('content')
)
