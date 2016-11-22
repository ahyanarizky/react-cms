$(document).ready(function () {
    if (!Auth.getToken()) window.location = '/login.html'
    getWelcomeTitle()
})

function getWelcomeTitle() {
    let html = `<h1 id="welcomeTitle">Welcome, ${Auth.getUser().email}</h1>`
    $('#welcomeTitle').html(html)
}

$(document).on('click', 'a[name="buttonLogout"]', function () {
    Auth.deauthenticateUser()
    window.location = '/login.html'
})