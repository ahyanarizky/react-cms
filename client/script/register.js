$(document).ready(function(){
  // AUTH
  if (localStorage.getItem('token')) window.location = 'home.html'
  
  //process register
  $('#btn_register').on('click', function(e){
   e.preventDefault()
   processRegister()
  })
})

function processRegister(){
  var data = {
    username: $('#username').val(),
    password: $('#password').val(),
    email: $('#email').val()
  }

  $.post({
    url: 'http://localhost:3000/api/users',
    data: data,
    success: function(new_user){
      // console.log(new_user);
      localStorage.setItem('token', new_user.token)
      window.location = 'home.html'

      $('#username').val('')
      $('#password').val('')
      $('#email').val('')
    }
  })
}
