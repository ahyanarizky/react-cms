const SERVER_URL_DATA = 'http://localhost:3000/api/dataDate'
const CONTENT_TYPE = 'application/x-www-form-urlencoded'

$(document).ready(function () {
    getAllDatas()
})

$(document).on('click', 'a[name="buttonLogout"]', function () {
    Auth.deauthenticateUser()
    window.location = '/login.html'
})

function getAllDatas() {
    $.ajax({
        url: `${SERVER_URL_DATA}`,
        method: 'get',
        success: function (data) {
            showAllDatas(data)
        }
    })
}

function showAllDatas(data) {
    let rowData = []
    for (let i = 0; i < data.length; i++) {
        let date = new Date(data[i].letter)
        let year = date.getFullYear()
        let monthTemp = (date.getMonth()+1)
        let dateTemp = date.getDate()

        if (String(monthTemp).length === 1){
            monthTemp = `0${monthTemp}`
        }
        if (String(dateTemp).length === 1){
            dateTemp = `0${dateTemp}`
        }

        let formattedDate = `${year}-${monthTemp}-${dateTemp}`


        rowData.push(`
        <tr id="data${data[i]._id}">
            <td>${formattedDate}</td>
            <td>${data[i].frequency}</td>
            <td>
                <a class="btn btn-success" name="updateData" data-id="${data[i]._id}">Update</a>
                <a class="btn btn-danger" name="deleteData" data-id="${data[i]._id}">Delete</a>
            </td>
        </tr>
`)
    }

    $('#rowOfDatas').html(rowData.join(""))
}

$(document).on('click', 'a[name="deleteData"]', function () {
    let dataId = this.getAttribute('data-id')
    deleteData(dataId)
})

function deleteData(dataId) {
    let tempId = dataId
    $.ajax({
        url: `${SERVER_URL_DATA}/${dataId}`,
        method: 'delete',
        success: function () {
            updateViewAfterDelete(tempId)
        }
    })
}

function updateViewAfterDelete(dataId) {
    $(`#data${dataId}`).remove()
}

$(document).on('click', 'button[name="showFormCreate"]', function () {
    $('#formCreate').removeClass('hidden')
})

$(document).on('click', 'button[name="buttonCreate"]', function (e) {
    e.preventDefault()
    let letter = $('input[name="letter"]').val()
    let frequency = $('input[name="frequency"]').val()
    createData(letter, frequency)
})

function createData(letter, frequency) {
    $.ajax({
        url: `${SERVER_URL_DATA}`,
        method: 'post',
        contentType: `${CONTENT_TYPE}`,
        data: {
            letter: letter,
            frequency: frequency
        },
        success: function (data) {
            updateViewAfterInsert(data)
        }
    })
}

function updateViewAfterInsert(data) {

    let date = new Date(data.letter)
    let year = date.getFullYear()
    let monthTemp = (date.getMonth()+1)
    let dateTemp = date.getDate()

    if (String(monthTemp).length === 1){
        monthTemp = `0${monthTemp}`
    }
    if (String(dateTemp).length === 1){
        dateTemp = `0${dateTemp}`
    }

    let formattedDate = `${year}-${monthTemp}-${dateTemp}`

    let html = `
        <tr id="data${data._id}">
            <td>${formattedDate}</td>
            <td>${data.frequency}</td>
            <td>
                <a class="btn btn-success" name="updateData" data-id="${data._id}">Update</a>
                <a class="btn btn-danger" name="deleteData" data-id="${data._id}">Delete</a>
            </td>
        </tr>
`
    $('input[name="letter"]').val('')
    $('input[name="frequency"]').val('')
    $('#formCreate').addClass('hidden')
    $('#rowOfDatas').append(html)
}

$(document).on('click', 'a[name="updateData"]', function () {
    let tempId = this.getAttribute('data-id')
    $('#formEdit').removeClass('hidden')
    getDataId(tempId)
})

function getDataId(dataId) {
    $.ajax({
        url: `${SERVER_URL_DATA}/id/${dataId}`,
        method: "get",
        contentType: 'application/x-www-form-urlencoded',
        success: function (data) {
            // console.log(data.letter.slice(9,14))
            getFormUpdate(data)
        }
    })
}

function getFormUpdate(data) {
    let date = new Date(data.letter)
    let year = date.getFullYear()
    let monthTemp = (date.getMonth()+1)
    let dateTemp = date.getDate()

    if (String(monthTemp).length === 1){
        monthTemp = `0${monthTemp}`
    }
    if (String(dateTemp).length === 1){
        dateTemp = `0${dateTemp}`
    }

    let formattedDate = `${year}-${monthTemp}-${dateTemp}`
    let letter = `input[name=letterEdit]`
    let frequency = `input[name=frequencyEdit]`
    $(letter).val(formattedDate)
    $(frequency).val(data.frequency)

    let temp = $("input[name='id']").val()
    if ( typeof temp != "undefined") {
        $("input[name='id']").replaceWith(`<input type='hidden' class='form-control' name='id' value='${data._id}'>`)
    }
    else {
        $("#getId").append(`<input type='hidden' class='form-control' name='id' value='${data._id}'>`)
    }
}

$(document).on('click', 'button[name="buttonEdit"]', function (e) {
    e.preventDefault()
    updateData()
})

function updateData() {
    let id = $("input[name='id']").val()
    let letter = $("input[name='letterEdit']").val()
    let frequency = $("input[name='frequencyEdit']").val()

    $.ajax({
        url: `${SERVER_URL_DATA}/${id}`,
        method: "put",
        contentType: 'application/x-www-form-urlencoded',
        data: {
            _id: id,
            letter: letter,
            frequency: frequency
        },
        success: function (data) {
            updateViewAfterUpdate(data)
        }
    })
}

function updateViewAfterUpdate(data) {

    let date = new Date(data.letter)
    let year = date.getFullYear()
    let monthTemp = (date.getMonth()+1)
    let dateTemp = date.getDate()

    if (String(monthTemp).length === 1){
        monthTemp = `0${monthTemp}`
    }
    if (String(dateTemp).length === 1){
        dateTemp = `0${dateTemp}`
    }

    let formattedDate = `${year}-${monthTemp}-${dateTemp}`

    let html = `
        <tr id="data${data._id}">
            <td>${formattedDate}</td>
            <td>${data.frequency}</td>
            <td>
                <a class="btn btn-success" name="updateData" data-id="${data._id}">Update</a>
                <a class="btn btn-danger" name="deleteData" data-id="${data._id}">Delete</a>
            </td>
        </tr>
`

    $(`#data${data._id}`).replaceWith(html)
    $('#formEdit').addClass('hidden')
    $("input[name='letter']").val("")
    $("input[name='frequency']").val("")
}

$("input[name='letterSearch']").change(function(){
    let letter = $("input[name='letterSearch']").val()
    searchByLetter(letter)

    if (!letter) {
        getAllDatas()
    }

})

function searchByLetter(letter) {
    $.ajax({
        url: `${SERVER_URL_DATA}/letter/${letter}`,
        method: "get",
        contentType: 'application/x-www-form-urlencoded',
        success: function (data) {
            showAllDatas(data)
        }
    })
}

$("input[name='frequencySearch']").keyup(function(){
    let freq = $("input[name='frequencySearch']").val()
    searchByFreq(freq)

    if (!freq) {
        getAllDatas()
    }

})

function searchByFreq(freq) {
    $.ajax({
        url: `${SERVER_URL_DATA}/frequency/${freq}`,
        method: "get",
        contentType: 'application/x-www-form-urlencoded',
        success: function (data) {
            showAllDatas(data)
        }
    })
}