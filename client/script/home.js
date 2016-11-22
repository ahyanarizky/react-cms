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
  if (!localStorage.getItem('token')) window.location = 'index.html'

  //process logout
  $('#logout').on('click', function(e){
    e.preventDefault()
    processLogout()
  })

  // welcome
  $('#home').text(`Welcome, ${Auth.getUser().username} | ${Auth.getUser().email}`)
})

function processLogout(){
  localStorage.removeItem('token')
  window.location = 'index.html'
}
