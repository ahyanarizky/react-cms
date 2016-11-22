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

  $('#btn_add').on('click', function(e){
    e.preventDefault()
    processAddDataDate()
  })

  showAllDataDate()

  //process updated data
  $('#btn_update').on('click', function(e){
    e.preventDefault()
    processUpdate()
  })

  // Search
  // date
  $('#search_date').on('keyup', function(){
    var date = $('#search_date').val()
    var frequency = $('#search_frequency').val()
    console.log(frequency);
    if(date.length > 0 ){
      $.ajax({
        url: 'http://localhost:3000/api/data_dates?date='+date,
        success: function(get_data){
          var data_HTML = ``
          var date = ''
          for (var i = 0; i < get_data.length; i++) {
            var date = get_data[i].date.substring(0, 10)
            data_HTML += `
              <tr id="${get_data[i]._id}">
                <td>
                  ${date}
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
    }else if(date.length > 0 && frequency.length > 0){
      alert()
    }else{
      $('#body_table').remove()
      $('#table').append(`
        <tbody id="body_table"></tbody>
        `)
      showAllDataDate()
    }

  })

  // frequency
  $('#search_frequency').on('keyup', function(){
    var date = $('#search_date').val()
    var frequency = $('#search_frequency').val()
    if(frequency.length > 0){
      $.ajax({
        url: 'http://localhost:3000/api/data_dates?frequency='+frequency,
        success: function(get_data){
          var data_HTML = ``
          var date =''
          for (var i = 0; i < get_data.length; i++) {
            var date = get_data[i].date.substring(0, 10)
            data_HTML += `
              <tr id="${get_data[i]._id}">
                <td>
                  ${date}
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
      showAllDataDate()
    }
  })

})

function submitDeleteButton(id){
  var r = confirm("Are you sure want to delete?");
  if (r == true) {
    $.ajax({
      url: 'http://localhost:3000/api/data_dates/'+id,
      method: "DELETE",
      success: function(deleted_data){
        $(`#${deleted_data._id}`).remove()
      }
    })
  }
}

function processUpdate(){
  var new_edited = {
    date: $('#date').val(),
    frequency: $('#frequency').val()
  }
  console.log(new_edited);
  var id = $('#id').val()
  $.ajax({
    url: 'http://localhost:3000/api/data_dates/'+id,
    method: 'PUT',
    data: new_edited,
    success: function(new_data_date){
      var date = new_data_date.date.substring(0, 10)
      var data_HTML = `
        <tr id="${new_data_date._id}">
          <td>
            ${date}
          </td>
          <td>
            ${new_data_date.frequency}
          </td>
          <td>
            <button type="button" class="btn btn-warning" onclick="submitEditButton('${new_data_date._id}')">Edit</button>
            <button type="button" class="btn btn-danger" onclick="submitDeleteButton('${new_data_date._id}')">Delete</button>
          </td>
        </tr>
      `
      $(`#${new_data_date._id}`).replaceWith(data_HTML)

      $('#letter').val('')
      $('#frequency').val('')

      hideAddForm()
      $('#show_form_add').show()
    }
  })
}

function submitEditButton(id){
  $.ajax({
    url: 'http://localhost:3000/api/data_dates/'+id,
    method: 'PUT',
    success: function(updated_data_date){
      console.log(updated_data_date);
      var date = updated_data_date.date.substring(0, 10)
      showAddForm()
      $('#date').val(date)
      $('#frequency').val(updated_data_date.frequency)
      $('#btn_update').show()
      $('#btn_add').hide()
      $('#id').val(updated_data_date._id)
    }
  })
}

function showAllDataDate(){
  $.ajax({
    url: 'http://localhost:3000/api/data_dates',
    success: function(all_data_date){
      // console.log(all_data);
      var date = ''
      var data_HTML = ``
      for (var i = 0; i < all_data_date.length; i++) {
        date = all_data_date[i].date.substring(0, 10)
        data_HTML += `
        <tr id="${all_data_date[i]._id}">
          <td>
            ${date}
          </td>
          <td>
            ${all_data_date[i].frequency}
          </td>
          <td>
            <button type="button" class="btn btn-warning" onclick="submitEditButton('${all_data_date[i]._id}')">Edit</button>
            <button type="button" class="btn btn-danger" onclick="submitDeleteButton('${all_data_date[i]._id}')">Delete</button>
          </td>
        </tr>
        `
      }

      $('#body_table').append(data_HTML)
    }
  })
}

function processAddDataDate(){
  var new_data = {
    date: $('#date').val(),
    frequency: $('#frequency').val()
  }

  $.post({
    url: 'http://localhost:3000/api/data_dates',
    data: new_data,
    success: function(new_data_date){
      console.log(new_data_date);
      var date = new_data_date.date.substring(0, 10)
      var data_HTML = `
        <tr id="${new_data_date._id}">
          <td>
            ${date}
          </td>
          <td>
            ${new_data_date.frequency}
          </td>
          <td>
            <button type="button" class="btn btn-warning" onclick="submitEditButton('${new_data_date._id}')">Edit</button>
            <button type="button" class="btn btn-danger" onclick="submitDeleteButton('${new_data_date._id}')">Delete</button>
          </td>
        </tr>
      `
      $('#body_table').prepend(data_HTML)

      $('#date').val('')
      $('#frequency').val('')

      hideAddForm()
      $('#show_form_add').show()
    }
  })
}

function processLogout(){
  localStorage.removeItem('token')
  window.location = 'index.html'
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
