const Router = ReactRouter.Router
const Route = ReactRouter.Route
const Link = ReactRouter.Link
const hashHistory = ReactRouter.hashHistory

const Nav = React.createClass({
    render: function () {
        return(
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <ul className="nav navbar-nav">
                        <li className="active"><Link to="/">Home</Link></li>
                        <li><Link to="/data">Data</Link></li>
                        <li><Link to="/dataDate">Date Date</Link></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/">Logout</Link></li>
                    </ul>
                    {this.props.children}
                </div>
            </nav>
        )
    }
})

ReactDOM.render(
    (
        <Router history={hashHistory}>
            <Route path="/" component={Nav}/>
        </Router>
    ), document.getElementById('content')
)