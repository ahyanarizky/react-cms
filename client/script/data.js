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

  hideAddForm()

  $('#show_form_add').on('click', function(e){
    e.preventDefault()
    showAddForm()
  })

  $('#show_form_hide').on('click', function(e){
    e.preventDefault()
    hideAddForm()
    $('#show_form_add').show()
  })

  //show all data
  showAllData()

  //process new data
  $('#btn_add').on('click', function(e){
    e.preventDefault()
    processNewData()
  })

  //process updated data
  $('#btn_update').on('click', function(e){
    e.preventDefault()
    processUpdate()
  })

  // search
  // letter
  $('#search_letter').on('keyup', function(){
    console.log($('#search_letter').val().length);
    var letter = $('#search_letter').val()
    if(letter.length > 0 ){
      $.ajax({
        url: 'http://localhost:3000/api/datas?letter='+letter,
        success: function(get_data){
          console.log('baru',get_data);
          var data_HTML = ``
          for (var i = 0; i < get_data.length; i++) {
            data_HTML += `
              <tr id="${get_data[i]._id}">
                <td>
                  ${get_data[i].letter}
                </td>
                <td>
                  ${get_data[i].frequency}
                </td>
                <td>
                  <button type="button" class="btn btn-warning" onclick="submitEditButton('${get_data[i]._id}')">Edit</button>
                  <button type="button" class="btn btn-danger" onclick="submitDeleteButton('${get_data[i]._id}')">Delete</button>
                </td>
              </tr>
            `
          }
          $('#body_table').remove()
          $('#table').append(`
          <tbody id="body_table"></tbody>
          `)
          $('#body_table').append(data_HTML)
        }
      })
    }else{
      $('#body_table').remove()
      $('#table').append(`
        <tbody id="body_table"></tbody>
        `)
      showAllData()
    }
  })

  // frequency
  $('#search_frequency').on('keyup', function(){
    console.log($('#search_frequency').val().length);
    var frequency = $('#search_frequency').val()
    if(frequency.length > 0 ){
      $.ajax({
        url: 'http://localhost:3000/api/datas?frequency='+frequency,
        success: function(get_data){
          console.log('baru',get_data);
          var data_HTML = ``
          for (var i = 0; i < get_data.length; i++) {
            data_HTML += `
              <tr id="${get_data[i]._id}">
                <td>
                  ${get_data[i].letter}
                </td>
                <td>
                  ${get_data[i].frequency}
                </td>
                <td>
                  <button type="button" class="btn btn-warning" onclick="submitEditButton('${get_data[i]._id}')">Edit</button>
                  <button type="button" class="btn btn-danger" onclick="submitDeleteButton('${get_data[i]._id}')">Delete</button>
                </td>
              </tr>
            `
          }
          $('#body_table').remove()
          $('#table').append(`
          <tbody id="body_table"></tbody>
          `)
          $('#body_table').append(data_HTML)
        }
      })
    }else{
      $('#body_table').remove()
      $('#table').append(`
        <tbody id="body_table"></tbody>
        `)
      showAllData()
    }
  })


})

function processUpdate(){
  var new_edited = {
    letter: $('#letter').val(),
    frequency: $('#frequency').val()
  }
  var id = $('#id').val()
  $.ajax({
    url: 'http://localhost:3000/api/datas/'+id,
    method: 'PUT',
    data: new_edited,
    success: function(new_data){
      console.log(new_data);
      var data_HTML = `
        <tr id="${new_data._id}">
          <td>
            ${new_data.letter}
          </td>
          <td>
            ${new_data.frequency}
          </td>
          <td>
            <button type="button" class="btn btn-warning" onclick="submitEditButton('${new_data._id}')">Edit</button>
            <button type="button" class="btn btn-danger" onclick="submitDeleteButton('${new_data._id}')">Delete</button>
          </td>
        </tr>
      `
      $(`#${new_data._id}`).replaceWith(data_HTML)

      $('#letter').val('')
      $('#frequency').val('')

      hideAddForm()
      $('#show_form_add').show()
    }
  })
}

function submitEditButton(id){
  $.ajax({
    url: 'http://localhost:3000/api/datas/'+id,
    method: 'PUT',
    success: function(updated_data){
      console.log(updated_data);
      showAddForm()
      $('#letter').val(updated_data.letter)
      $('#frequency').val(updated_data.frequency)
      $('#btn_update').show()
      $('#btn_add').hide()
      $('#id').val(updated_data._id)
    }
  })
}

function submitDeleteButton(id){
  var r = confirm("Are you sure want to delete?");
  if (r == true) {
    $.ajax({
      url: 'http://localhost:3000/api/datas/'+id,
      method: "DELETE",
      success: function(deleted_data){
        $(`#${deleted_data._id}`).remove()
      }
    })
  }
}

function processNewData(){
  var new_data = {
    letter: $('#letter').val(),
    frequency: $('#frequency').val()
  }
  $.post({
    url: 'http://localhost:3000/api/datas',
    data: new_data,
    success: function(new_data){
      console.log(new_data);
      var data_HTML = `
        <tr id="${new_data._id}">
          <td>
            ${new_data.letter}
          </td>
          <td>
            ${new_data.frequency}
          </td>
          <td>
            <button type="button" class="btn btn-warning" onclick="submitEditButton('${new_data._id}')">Edit</button>
            <button type="button" class="btn btn-danger" onclick="submitDeleteButton('${new_data._id}')">Delete</button>
          </td>
        </tr>
      `
      $('#body_table').prepend(data_HTML)

      $('#letter').val('')
      $('#frequency').val('')

      hideAddForm()
      $('#show_form_add').show()
    }
  })
}

function showAllData(){
  $.ajax({
    url: 'http://localhost:3000/api/datas',
    success: function(all_data){
      // console.log(all_data);
      var data_HTML = ``
      for (var i = 0; i < all_data.length; i++) {
        data_HTML += `
        <tr id="${all_data[i]._id}">
          <td>
            ${all_data[i].letter}
          </td>
          <td>
            ${all_data[i].frequency}
          </td>
          <td>
            <button type="button" class="btn btn-warning" onclick="submitEditButton('${all_data[i]._id}')">Edit</button>
            <button type="button" class="btn btn-danger" onclick="submitDeleteButton('${all_data[i]._id}')">Delete</button>
          </td>
        </tr>
        `
      }

      $('#body_table').append(data_HTML)
    }
  })
}

function showAddForm(){
  $('#show_form_hide').show()
  $('#form_new_data').show()
  $('#btn_update').hide()
  $('#btn_add').show()
  $('#show_form_add').hide()
}

function hideAddForm(){
  $('#show_form_hide').hide()
  $('#form_new_data').hide()
  $('#btn_update').hide()
}

function processLogout(){
  localStorage.removeItem('token')
  window.location = 'index.html'
}
