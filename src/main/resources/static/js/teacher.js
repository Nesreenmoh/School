var teacher_id;
var teacherDataTable;

$(document).ready(function() {
  // defining a datatable table -- should be one time
  teacherDataTable = $('#teacherContainer').DataTable({
    ajax: {
      url: 'api/teacher',
      dataSrc: ''
    },
    columns: [
      { data: 'id' },
      { data: 'name' },
      {
        data: null,
        render: function(data, type, row) {
          return '<td><a href="#"><i class="fas fa-close" teacherid="' + data.id + '"></i></a></td>';
        }
      },
      {
        data: null,
        render: function(data, type, row) {
          return '<td> <a href="#"> <i class="fas fa-edit" teacherid="' + data.id + '"></i></a></td>';
        }
      }
    ]
  });

  // add an event on the add teacher button
  $('#add').click(function(e) {
    if ($('#teacherName').val() === '') {
      showAlert('No teacher name or the name is short too!', 'error');
    } else {
      addTeacher();
    }
    e.preventDefault();
  });

  // add an event on fetch teachers button
  $('#fetch').click(function(e) {
    getTeachers();
    e.preventDefault();
  });

  // an event when we click on the delete icon
  $('#teacherContainer').on('click', '.fas.fa-close', function() {
    teacher_id = $(this).attr('teacherid');
    $('#confirm').show();
  });

  // an event when we click on the edit icon
  $('#teacherContainer').on('click', '.fas.fa-edit', function() {
    teacher_id = $(this).attr('teacherid');
    const teacher_name = event.target.parentNode.parentElement.parentElement.children[1].innerHTML;
    $('#teacherEditName').val(teacher_name);
    $('#updateModal').show();
  });

  // addding an event on the button of close Edit Modal
  $('#closeEditbtn').click(function() {
    $('#updateModal').hide();
  });

  // adding an event on the small button close of update modal
  $('.closeEdit').click(function() {
    $('#updateModal').hide();
  });

  // add an event on the update button of the update Modal
  $('#update').click(function() {
    updateTeachers(teacher_id);
    $('#updateModal').hide();
  });

  // add an event on the yes button of the alert delete Modal
  $('#yesBtn').click(function() {
    deleteTeachers(teacher_id);
    $('#confirm').hide();
  });

  // adding an event on the small button close of confirm delete alert modal
  $('#close').click(function() {
    $('#confirm').hide();
  });
  // adding an event on the close button of confirm delete modal
  $('#closebtn').click(function() {
    $('#error').hide();
  });
});

// Add teacher function
function addTeacher() {
  var teacher = {
    name: $('#teacherName').val()
  };
  var jsonObject = JSON.stringify(teacher);
  $.ajax({
    url: 'api/teacher',
    type: 'POST',
    contentType: 'application/json',
    data: jsonObject,
    success: function() {
      showAlert('A Teacher has been Added!', 'success');
      getTeachers();
    },
    error: function() {
      showAlert('');
      alert('Invalid Input', 'error');
    }
  });
}

// get teacher function
function getTeachers() {
  teacherDataTable.ajax.reload();
}

// update teacher function
function updateTeachers() {
  var teacher = {
    id: teacher_id,
    name: $('#teacherEditName').val()
  };

  var jsonObject = JSON.stringify(teacher);
  $.ajax({
    url: 'api/teacher/' + teacher_id,
    type: 'PUT',
    contentType: 'application/json',
    data: jsonObject,
    success: function() {
      showAlert('A record is updated!', 'success');
      getTeachers();
    },
    error: function() {
      alert('Invalid Input', 'error');
    }
  });
}

// delete teacher function
function deleteTeachers(teacher_id) {
  $.ajax({
    url: 'api/teacher/' + teacher_id,
    type: 'DELETE',
    success: function() {
      showAlert('A Teacher has  been deleted!', 'success');
      getTeachers();
    },
    error: function() {
      showAlert('Invalid input or you cannot delete a teacher who has some courses !', 'error');
    }
  });
}

// show alert function
function showAlert(msg, myclass) {
  if (myclass === 'error') {
    $('.modal-title').html('');
    $('.modal-title').html('Error');
    $('#error').show();
    $('#message').text('');
    $('#message').append(msg);
  } else {
    $('.modal-title').html('');
    $('.modal-title').html('Success');
    $('#error').show();
    $('#message').text('');
    $('#message').append(msg);
  }
}
