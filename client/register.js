const SERVER_URL_USER = 'http://localhost:3000/api/user'
const CONTENT_TYPE = 'application/x-www-form-urlencoded'

$(document).on('click', 'button[name="buttonRegister"]', function (e) {
    e.preventDefault()
    let username = $('input[name="username"]').val()
    let email = $('input[name="email"]').val()
    let password = $('input[name="password"]').val()
    let confirmPassword = $('input[name="confirmPassword"]').val()

    console.log('masuk')
    if (password === confirmPassword) {
        userRegister(username, password, email)
    }
    else {
        alert('password and confirm password not match')
    }

})

function userRegister(username, password, email) {
    $.ajax({
        url: `${SERVER_URL_USER}/register`,
        method: 'post',
        contentType: `${CONTENT_TYPE}`,
        data: {
            username: username,
            password: password,
            email: email,
        },
        success: function (data) {
            console.log(data)
            Auth.authenticateUser(data)
            window.location = '/'
        },
        error: function (data) {
            alert('Wrong username or password')
        }
    })
}
