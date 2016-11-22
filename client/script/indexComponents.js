const Router = ReactRouter.Router
const Route = ReactRouter.Route
const Link = ReactRouter.Link
const browserHistory = ReactRouter.browserHistory
/*
  <!-- navbar -->
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">cms-api</a>
        </div>
        <ul class="nav navbar-nav">
          <li><a href="login.html">Login</a></li>
          <li><a href="register.html">Register</a></li>
        </ul>
      </div>
    </nav>
  <!-- navbar -->
  <div class="container">
    <h1>Welcome to cms-api, please login or register</h1>
  </div>
*/
const Navbar = React.createClass({
  render: function(){
    return(
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">cms-api</Link>
          </div>
          <ul className="nav navbar-nav">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </div>
        {this.props.children}
      </nav>
    )
  }
})

const Home = React.createClass({
  render: function(){
    return(
      <div>
        <Navbar />
        <div className="container">
          <h1>Welcome to cms-api, please login or register</h1>
        </div>
      </div>
    )
  }
})

const Login = React.createClass({
  render: function(){
    return(
      <div>
        <Navbar />
          <div className="container">
            <form id="form_login">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" />
              </div>
              <div className="form-group">
                <button type="button" id="btn_login" className="btn btn-lg btn-success">Login</button>
              </div>
            </form>
          </div>
      </div>
    )
  }
})

const Register = React.createClass({
  render: function(){
    return(
      <div>
        <Navbar />
          <div className="container">
            <form id="form_register">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" />
              </div>
              <div className="form-group">
                <label htmlFor="confirm_password">Confirm Password</label>
                <input type="password" className="form-control" id="confirm_password" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" className="form-control" id="email" />
              </div>
              <div className="form-group">
                <button type="button" id="btn_register" className="btn btn-lg btn-success">Register</button>
              </div>
            </form>
          </div>
      </div>
    )
  }
})

ReactDOM.render(
  (
    <Router history={browserHistory}>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Router>
  ), document.getElementById('content')
)
