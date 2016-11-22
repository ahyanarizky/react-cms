$(document).ready(function () {
    if (!Auth.getToken()) window.location = '/login.html'
})