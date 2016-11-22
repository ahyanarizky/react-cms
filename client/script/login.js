const Auth = {
  getToken: () => {
    return localStorage.getItem('token')
  },
  getUser: () => {
    let token = Auth.getToken()
    if (!token) return {}
    else {
      return jwt_decode(token)
    }
  }
}

$(document).ready(function(){
  // AUTH
  if (localStorage.getItem('token')) window.location = 'home.html'

  $('#btn_login').on('click', function(e){
    e.preventDefault()
    processLogin()
  })
})

function processLogin(){
  var data_login = {
    username: $('#username').val(),
    password: $('#password').val()
  }

  $.post({
    url: "http://localhost:3000/api/users/login",
    data: data_login,
    success: function(login_user){
      localStorage.setItem('token', login_user.token)

      if(Auth.getUser().username){
        window.location = 'home.html'
      }else{
        alert('input is wrong')
        localStorage.removeItem('token')
        window.location = 'login.html'
      }
    }
  })
}
