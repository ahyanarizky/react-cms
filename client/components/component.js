const Router = ReactRouter.Router
const Route = ReactRouter.Route
const Link = ReactRouter.Link
const browserHistory = ReactRouter.browserHistory

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
                </div>
            </nav>
        )
    }
})

const HomePanel = React.createClass({
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
                                    <a href="home.html" className="col-sm-12 btn btn-success">Admin Panel</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})


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
        if (!letter || ! frequency) return
        else {
            this.props.onDataSubmit({letter: letter, frequency: frequency})
            this.setState({letter: ''})
            this.setState({frequency: ''})
        }
    },

    render: function () {
        return (
            <div className="row" id="formCreate">
                <div className="col-sm-12">
                    <form onSubmit={this.handleSubmit} className="form-inline">
                        <div className="form-group">
                            <label>Letter</label>
                            <input value={this.state.letter} onChange={this.handleLetterChange} type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Frequency:</label>
                            <input value={this.state.frequency} onChange={this.handleFrequencyChange} type="number" className="form-control" />
                        </div>
                        <div className="form-group">
                            <button className="btn btn btn-default" name="buttonCreate">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
})


const Data = React.createClass({

    getInitialState: function () {
        return {
            data:[]
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
        return(
            <div>
                <Nav/>
                <div className="container">

                    <div className="row">
                        <div className="col-sm-12">
                            <button name="showFormCreate" className="btn btn-primary">+Add</button>
                        </div>
                    </div>

                    <DataForm onDataSubmit={this.handleDataSubmit}/>

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

                                    <DataList handleDeleteDataBox={this.handleDeleteDataBox} data={this.state.data}/>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
})



const DataList = React.createClass({
    render: function () {
        let dataNodes = this.props.data.map(function (data) {
            return(<ShowData onDataDeleteShowData={this.dataDeleteDataList} key={data.dataId} id={data.dataId} letter={data.letter} frequency={data.frequency}/>)
        }.bind(this))
        return(
            <tbody>{dataNodes}</tbody>
        )
    },

    dataDeleteDataList: function (id) {
        this.props.handleDeleteDataBox(id)
    },
})

const ShowData = React.createClass({
    render: function () {
        return(
            <tr>
                <td>{this.props.letter}</td>
                <td>{this.props.frequency}</td>
                <td>
                    <a className="btn btn-warning">Edit</a>
                    <a id={`${this.props.id}`} onClick={this.handleDelete} className="btn btn-danger">Delete</a>
                </td>
            </tr>

        )
    },

    handleDelete: function (e) {
        let id = e.target.id
        this.props.onDataDeleteShowData(id)
    }
})

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
                                    <h1>Welcome to Data Date</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})

ReactDOM.render(
    (
        <Router history={browserHistory}>
            <Route path="/" component={HomePanel}/>
            <Route path="/data" component={Data}/>
            <Route path="/dataDate" component={DataDate}/>
        </Router>
    ), document.getElementById('content')
)