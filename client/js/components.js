const Router = ReactRouter.Router
const Route = ReactRouter.Route
const Link = ReactRouter.Link
const hashHistory = ReactRouter.hashHistory

// ================================================
// DATAS
// ================================================
var CommentBox = React.createClass({
  getInitialState: function(){
    return {data: []}
  },
  loadComments: function(){
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
    this.loadComments()
  },
  handleCommentSubmit: function(comment){
    var comments = this.state.data
    comment.id = comments.length + 1
    var newComments = comments.concat([comment])
    this.setState({
      data: newComments
    })

    $.ajax({
      url: this.props.url,
      dataType: 'JSON',
      type: 'POST',
      data: comment,
      success: function(response){
        this.setState({
          data: response
        })
      }.bind(this),
      error: function(xhr, status, err){
        this.setState({
          data: comments
        })
        console.error(this.props.url, status, err.toString())
      }.bind(this)
    })
  },
  handleCommentDelete: function(id){
    var comments = this.state.data
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
          data: comments
        })
        console.error(this.props.url, status, err.toString())
      }.bind(this)
    })
  },
  render: function(){
    return(
      <div className="commentBox">
        <div className="jumbotron">
        <div className="container text-center">
          <h1>DATAS</h1>
        </div>
      </div>
        <CommentList data={this.state.data} handleCommentDelete={this.handleCommentDelete}/>
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    )
  }
})

var CommentList = React.createClass({
  onCommentDelete(){
    // ISIII
    // DIIIII
    // SINIIII
  },
  render: function(){
    var h2 = <h2>Comment List</h2>
    var commentNodes = this.props.data.map((comment) => {
      return(
        <Comment key={comment.id} id={comment.id} author={comment.author} text={comment.text} handleCommentDelete={this.props.handleCommentDelete}/>
      )
    }.bind(this))
    return (<div>{commentNodes}</div>)
  }
})

var Comment = React.createClass({
  render(){
    return (
      <div className="comment" id={this.props.id}>
        <div className="well">
          <h3>{this.props.author}</h3>
          <p>{this.props.text}</p>
          <DeleteButton id={this.props.id} onCommentDelete={this.props.handleCommentDelete}/>
        </div>
      </div>
    )
  }
})

var DeleteButton = React.createClass({
  handleDelete(e){
    var id = this.props.id
    if(confirm("Are you sure you want to delete?") === true){
      this.props.onCommentDelete(id)
    }
  },
  render(){
    return(
      <button className="btn btn-danger btn-sm" onClick={this.handleDelete}>Delete Comment</button>
      )
  }
})

var CommentForm = React.createClass({
  getInitialState(){
    return ({
      author: '',
      text: ''
    })
  },
  handleAuthorChange(e){
    this.setState({
      author: e.target.value
    })
  },
  handleTextChange(e){
    this.setState({
      text: e.target.value
    })
  },
  handleSubmit(e){
    e.preventDefault()
    var author = this.state.author.trim()
    var text = this.state.text.trim()
    if(!author || !text){
      return
    }else{
      this.props.onCommentSubmit({
        author: author,
        text: text
      })
      this.setState({
        author: '',
        text: ''
      })
    }
  },
  render(){
    return(
      <div className="well">
        <form onSubmit={this.handleSubmit}>
        <input className="form-control" type="text" placeholder="Enter Letter" value={this.state.author} onChange={this.handleAuthorChange} />
        <br/>
        <input className="form-control" type="text" placeholder="Enter Frequency" onChange={this.handleTextChange} value={this.state.text} />
        <br/>
        <input className="btn btn-md btn-primary" type="submit" value="Add Data" />
      </form>
      </div>
    )
  }
})

// ==================================================

const Nav = React.createClass({
  render: function(){
    return(
      <div>
      <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container">
              <div className="navbar-header">
                <a className="navbar-brand" href="#">CMS API</a>
              </div>
              <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/datas">Datas</Link></li>
                  <li><Link to="/datadates">Datadatas</Link></li>
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
        <br/>
        <br/>
        <br/>
        <h2>This is your homepage</h2>
      </div>
      )
  }
})

const Data = React.createClass({
  render: function(){
    return(
      <div>
        <Nav />
        <br/>
        <br/>
        <br/>
        <CommentBox url="http://localhost:3000/api/comments"/>
      </div>
      )
  }
})

const Datadate = React.createClass({
  render: function(){
    return(
      <div>
      <Nav />
        <br/>
        <br/>
        <br/>
        <h2>Component Datadate</h2>
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

// ==========================================