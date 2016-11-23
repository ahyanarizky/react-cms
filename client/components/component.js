const Router = ReactRouter.Router
const Route = ReactRouter.Route
const Link = ReactRouter.Link
const browserHistory = ReactRouter.browserHistory

/* ********************************************************* */
/* **************** NAVIGATION COMPONENTS******************* */
/* ********************************************************* */
const Nav = React.createClass({

    handleLogout: function () {
        Auth.deauthenticateUser()
        browserHistory.push('/')
    },

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
                        <li onClick={this.handleLogout}><Link>Logout</Link></li>
                    </ul>
                </div>
            </nav>
        )
    }
})
/* ********************************************************* */
/* **************** NAVIGATION COMPONENTS******************* */
/* ********************************************************* */


/* ********************************************************* */
/* *********************** INDEX *************************** */
/* ********************************************************* */
const Index = React.createClass({

    handleLogin: function (user) {
        $.ajax({
            url: `http://localhost:3000/api/user/login`,
            dataType: 'json',
            type: 'post',
            data: user,
            success: function (response) {
                this.setState({user: response})
                Auth.authenticateUser(response)
                // this.props.router.replace('/')
                browserHistory.push('/')
            }.bind(this),
            error: function (err) {
                alert('username or password is wrong')
                // this.props.router.replace('/')
                browserHistory.push('/')
            }
        })
    },

    render: function () {
        if (!Auth.getToken()) {
            return(
                <div>
                    <Login onLoginSubmit={this.handleLogin} />
                </div>
            )
        }
        else {
            return(
                <div>
                    <Nav/>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="jumbotron text-center">
                                    <h1 className="text-uppercase">welcome {Auth.getUser().username}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
})
/* ********************************************************* */
/* *********************** INDEX *************************** */
/* ********************************************************* */


/* ********************************************************* */
/* ********* SHOW FORM FOR INSERT DATA ********************* */
/* ********************************************************* */
let DataForm = React.createClass({
    getInitialState: function () {
        return {
            letter: '',
            frequency: ''
        }
    },

    handleLetterChange: function (e) {
        this.setState({letter: e.target.value})
    },

    handleFrequencyChange: function (e) {
        this.setState({frequency: e.target.value})
    },

    handleSubmit: function (e) {
        e.preventDefault()
        let letter = this.state.letter.trim()
        let frequency = this.state.frequency.trim()
        let dataId = this.props.dataUpdate.dataId
        if (letter && frequency && !dataId) {
            this.props.onDataSubmit({letter: letter, frequency: frequency})
            this.setState({letter: ''})
            this.setState({frequency: ''})
        }
        else if (letter && frequency && dataId) {
            this.props.onDataSubmitEdit({dataId: dataId, letter: letter, frequency: frequency})
            this.setState({letter: ''})
            this.setState({frequency: ''})
        }
        else {
            return
        }
    },

    render: function () {
        return (
            <div className="row" id="formCreate">
                <div className="col-sm-12">
                    <form onSubmit={this.handleSubmit} className="form-horizontal">
                        <div className="form-group">
                            <label className="control-label col-sm-2">Letter</label>
                            <div className="col-sm-10">
                                <input value={this.state.letter} onChange={this.handleLetterChange} type="text" className="form-control" placeholder={this.props.dataUpdate.letter} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2">Frequency:</label>
                            <div className="col-sm-10">
                                <input value={this.state.frequency} onChange={this.handleFrequencyChange} type="number" className="form-control" placeholder={this.props.dataUpdate.frequency} />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-sm-10 col-sm-offset-2">
                                <button className="btn btn btn-default" name="buttonCreate">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
})
/* ********************************************************* */
/* ********* SHOW FORM FOR INSERT DATA ********************* */
/* ********************************************************* */


/* ********************************************************* */
/* ********************** GET ALL DATA ********************* */
/* ********************************************************* */
const ShowData = React.createClass({
    render: function () {
        return(
            <tr>
                <td>{this.props.letter}</td>
                <td>{this.props.frequency}</td>
                <td>
                    <a onClick={this.handleGetUpdate} className="btn btn-warning">Edit</a>
                    <a id={`${this.props.id}`} onClick={this.handleDelete} className="btn btn-danger">Delete</a>
                </td>
            </tr>
        )
    },

    handleDelete: function (e) {
        let id = e.target.id
        this.props.onDataDeleteShowData(id)
    },

    handleGetUpdate: function () {
        this.props.getDataUpdateShowData(this.props.id)
    }
})

const DataList = React.createClass({
    render: function () {
        let dataNodes = this.props.data.map(function (data) {
            return(
                <ShowData getDataUpdateShowData={this.getDataId}
                          onDataDeleteShowData={this.dataDeleteDataList}
                          key={data.dataId} id={data.dataId} letter={data.letter} frequency={data.frequency}
                />)
        }.bind(this))
        return(
            <tbody>{dataNodes}</tbody>
        )
    },

    dataDeleteDataList: function (id) {
        this.props.handleDeleteDataBox(id)
    },
    getDataId: function (id) {
        this.props.handleGetDataBox(id)
    }
})


const Data = React.createClass({
    getInitialState: function () {
        return {
            data:[],
            dataEdit: {
                dataId: '',
                letter: '',
                frequency: ''
            }
        }
    },

    loadData: function () {
        $.ajax({
            url: `http://localhost:3000/api/data`,
            dataType: 'json',
            cache: false,
            success: function (response) {
                this.setState({data: response})
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString())
            }.bind(this)
        })
    },

    handleGetOneDataUpdateDataBox: function (id) {
        $.ajax({
            url: `http://localhost:3000/api/data/${id}`,
            dataType: 'json',
            cache: false,
            success: function (response) {
                // console.log(response)
                this.setState({
                    dataEdit: {
                        dataId: response.dataId,
                        letter: response.letter,
                        frequency: response.frequency
                    }
                })
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString())
            }.bind(this)
        })
    },

    componentDidMount: function () {
        this.loadData()
    },

    handleDataSubmit: function (data) {
        let datas = this.state.data
        data.dataId = Date.now()
        let newDatas = datas.concat([data])
        this.setState({data: newDatas})
        $.ajax({
            url: `http://localhost:3000/api/data`,
            dataType: 'json',
            type: 'post',
            data: data,
            success: function (response) {
                this.setState({data: newDatas})
            }.bind(this),
            error: function (xhr, status, err) {
                this.setState({data: datas})
                console.error(this.props.url, status, err.toString())
            }.bind(this)
        })
    },

    handleDataSubmitEdit: function (data) {
        let datas = this.state.data
        let newDatas = datas.map(function (e) {
            console.log(e.dataId)
            if (e.dataId == data.dataId) return data
            else return e
        })
        console.log(newDatas)
        this.setState({data: newDatas})
        $.ajax({
            url: `http://localhost:3000/api/data`,
            dataType: 'json',
            type: 'put',
            data: data,
            success: function (response) {
                this.setState({data: newDatas})
            }.bind(this),
            error: function (xhr, status, err) {
                this.setState({data: datas})
                console.error(this.props.url, status, err.toString())
            }.bind(this)
        })
    },

    handleDeleteDataBox: function (id) {
        let datas = this.state.data
        let newData = datas.filter(function (x) {
            if (x.dataId != id) return x
        })
        this.setState({data: newData})
        $.ajax({
            url: `http://localhost:3000/api/data`,
            type: 'DELETE',
            data: {
                id: id
            },
            success: function (data) {
                this.setState({data: newData})
            }.bind(this)
        })
    },

    render: function () {
        if (!Auth.getToken()) {
            return(
                <div>
                    <Login />
                </div>
            )
        }
        else {
            return(
                <div>
                    <Nav/>
                    <div className="container">

                        <DataForm dataUpdate={this.state.dataEdit} onDataSubmitEdit={this.handleDataSubmitEdit} onDataSubmit={this.handleDataSubmit}/>

                        <div className="row">
                            <div className="col-sm-12">
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                        <tr>
                                            <td>Letter</td>
                                            <td>Frequency</td>
                                            <td>Actions</td>
                                        </tr>
                                        </thead>

                                        <DataList handleGetDataBox={this.handleGetOneDataUpdateDataBox} handleDeleteDataBox={this.handleDeleteDataBox} data={this.state.data}/>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )
        }
    }
})
/* ********************************************************* */
/* ********************** GET ALL DATA ********************* */
/* ********************************************************* */


/* ********************************************************* */
/* ********************** DataDate ************************* */
/* ********************************************************* */
const DataDate = React.createClass({
    render: function () {
        return(
            <div>
                <Nav/>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="panel panel-primary">
                                <div className="panel-heading">
                                    Welcome to Dashboard Hactiv8
                                </div>
                                <div className="panel-body">
                                    <h1>Welcome {Auth.getUser().username}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})
/* ********************************************************* */
/* ********************** DataDate ************************* */
/* ********************************************************* */

const Login = React.createClass({

    getInitialState: function () {
        return {
            username: '',
            password: ''
        }
    },

    handleUsernameChange: function (e) {
        this.setState({username: e.target.value})
    },

    handlePasswordChange: function (e) {
        this.setState({password: e.target.value})
    },

    handleLogin: function (e) {
        e.preventDefault()
        let username = this.state.username.trim()
        let password = this.state.password.trim()
        if (username && password) {
            this.props.onLoginSubmit({username: username, password: password})
            this.setState({username: ''})
            this.setState({password: ''})
        }
        else {
            return
        }
    },

    render: function () {
        return(
            <div className="container">
                <form className="form-horizontal" onSubmit={this.handleLogin}>
                    <div className="form-group">
                        <label className="control-label col-sm-2">Username:</label>
                        <div className="col-sm-10">
                            <input type="text" value={this.state.username} onChange={this.handleUsernameChange} className="form-control" placeholder="Enter username" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2">Password:</label>
                        <div className="col-sm-10">
                            <input type="password" value={this.state.password} onChange={this.handlePasswordChange} className="form-control" placeholder="Enter password" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button name="buttonLogin" className="btn btn-success">Submit</button>
                            <Link to="/register"><button className="btn btn-primary pull-right">Register</button></Link>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
})

const Register = React.createClass({
    getInitialState: function () {
        return {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    },

    handleUsernameChange: function (e) {
        this.setState({username: e.target.value})
    },

    handlePasswordChange: function (e) {
        this.setState({password: e.target.value})
    },

    handleEmailChange: function (e) {
        this.setState({email: e.target.value})
    },

    handleConfirmPasswordChange: function (e) {
        this.setState({confirmPassword: e.target.value})
    },

    onRegisterSubmit: function (e) {
        e.preventDefault()
        let username = this.state.username.trim()
        let email = this.state.email.trim()
        let password = this.state.password.trim()
        let confirmPassword = this.state.confirmPassword.trim()
        if (username && email && password && confirmPassword) {
            this.handleRegister({username: username, email: email, password: password, confirmPassword: confirmPassword})
            this.setState({username: ''})
            this.setState({email: ''})
            this.setState({password: ''})
            this.setState({confirmPassword: ''})
        }
        else {
            return
        }
    },

    handleRegister: function (user) {
        $.ajax({
            url: `http://localhost:3000/api/user/register`,
            dataType: 'json',
            type: 'post',
            data: user,
            success: function (response) {
                this.setState({user: response})
                Auth.authenticateUser(response)
                // this.props.router.replace('/')
                browserHistory.push('/')
            }.bind(this)
        })
    },

    render: function () {
        return(
            <div className="container">

                <h1 className="text-center">Register</h1>

                <div className="row">
                    <div className="col-sm-8 col-sm-offset-2">
                        <form className="form-horizontal" onSubmit={this.onRegisterSubmit}>
                            <div className="form-group">
                                <label className="control-label col-sm-2">username:</label>
                                <div className="col-sm-10">
                                    <input value={this.state.username} onChange={this.handleUsernameChange} type="text" className="form-control" placeholder="Enter username" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-2">Email:</label>
                                <div className="col-sm-10">
                                    <input value={this.state.email} onChange={this.handleEmailChange} type="email" className="form-control" placeholder="Enter email" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-2">Password:</label>
                                <div className="col-sm-10">
                                    <input value={this.state.password} onChange={this.handlePasswordChange} type="password" className="form-control" placeholder="Enter password" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-2">Confirm Password:</label>
                                <div className="col-sm-10">
                                    <input value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange} type="password" className="form-control" placeholder="Enter confirm password" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-10">
                                    <button className="btn btn-default">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
})

ReactDOM.render(
    (
        <Router history={browserHistory}>
            <Route path="/" component={Index}/>
            <Route path="/data" component={Data}/>
            <Route path="/dataDate" component={DataDate}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
        </Router>
    ), document.getElementById('content')
)