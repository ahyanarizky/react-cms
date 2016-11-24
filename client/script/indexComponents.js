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
    var test = this.state.data.concat({
      letter: letter,
      frequency: frequency
    }).reverse()
    // console.log(test.reverse());
    this.setState({
      data : test
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
  render: function(){
    return(
      <div className="container">
        <DataFormAdd onDataSubmit={this.handleDataSubmit}/>
        <DataList data={this.state.data} />
      </div>
    )
  }
})

const Data = React.createClass({
  render(){
    return(
      <tr>
        <td>
          {this.props.letter}
        </td>
        <td>
          {this.props.frequency}
        </td>
        <td>
          <button type="button" className="btn btn-warning" >Edit</button>
          <button type="button" className="btn btn-danger" >Delete</button>
        </td>
      </tr>
    )
  }
})

const DataList = React.createClass({
  render(){
    // console.log(this.props.data);
    var all_Data = this.props.data.map((data) => {
      return (
        <Data key={data._id || Date.now()} dataId={data._id} letter={data.letter} frequency={data.frequency} />
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

function processLogout(nextState, replace){
  localStorage.removeItem('token')
  replace({
    pathname: '/login',
    // state: { nextPathname: nextState.location.pathname }
  })
}

ReactDOM.render(
  (
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Route path="/login" component={!getUser() ? Login : Dashboard} />
        <Route path="/register" component={!getUser() ? Register : Dashboard} />
        <Route path="/dashboard" component={Dashboard} onEnter={authDashboard} />
        <Route path="/data" component={DataBox} onEnter={authDashboard} />
        <Route path="/logout" onEnter={processLogout} />
      </Route>
    </Router>
  ), document.getElementById('content')
)

/*
<div className="col-sm-4">
<label htmlFor="search_letter">Letter :</label>
<input type="text" className="form-control" id="search_letter" placeholder="A" />
</div>
<div className="col-sm-4">
<label htmlFor="search_frequency">Frequency :</label>
<input type="text" className="form-control" id="search_frequency" placeholder="0.00000" />
</div>

<table className="table table-striped" id="table">
<thead>
<tr>
<th className="col-sm-4">Letter</th>
<th className="col-sm-4">Frequency</th>
<th className="col-sm-4">Action</th>
</tr>
</thead>
<tbody id="body_table"></tbody>
</table>
*/
