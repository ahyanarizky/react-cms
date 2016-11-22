const SERVER_URL_USER = 'http://localhost:3000/api/user'
const CONTENT_TYPE = 'application/x-www-form-urlencoded'

$(document).on('click', 'button[name="buttonLogin"]', function (e) {
    e.preventDefault()
    let username = $('input[name="username"]').val()
    let password = $('input[name="password"]').val()
    userLogin(username, password)
})

function userLogin(username, password) {
    $.ajax({
        url: `${SERVER_URL_USER}/login`,
        method: 'post',
        contentType: `${CONTENT_TYPE}`,
        data: {
            username: username,
            password: password
        },
        success: function (data) {
            Auth.authenticateUser(data)
            window.location = '/'
        },
        error: function (data) {
            alert('Wrong username or password')
        }
    })
}
