var updated_id;
var course_id;
var teacher_name;
var courseDataTable;
$(document).ready(function() {
  // fetching the teacher names from the database to the select controller

  // define a datatable variable
  courseDataTable = $('#coursesContainer').DataTable({
    ajax: {
      url: 'api/course',
      dataSrc: ''
    },
    columns: [
      { data: 'id' },
      { data: 'name' },
      { data: 'teacher.name' },
      {
        data: null,
        render: function(data, type, row) {
          return '<td><a href="#"><i class="fas fa-close" courseid="' + data.id + '"></i></a></td>';
        }
      },
      {
        data: null,
        render: function(data, type, row) {
          return '<td> <a href="#"> <i class="fas fa-edit" courseid="' + data.id + '"></i></a></td>';
        }
      }
    ]
  });

  // fetch all courses and teachers
  fetchAllTeachers();
  getAllCourses();

  // add event when you click on add course button
  $('#add').click(function(e) {
    if ($('#courseName').val() === '') {
      showAlert('Please enter course name!', 'error');
    } else {
      addCourse();
    }
  });

  $('#coursesContainer').on('click', '.fas.fa-close', function() {
    course_id = $(this).attr('courseid');
    console.log(course_id);
    $('#confirm').show();
  });

  $('#coursesContainer').on('click', '.fas.fa-edit', function(event) {
    course_id = $(this).attr('courseid');
    const course_name = event.target.parentNode.parentElement.parentElement.children[1].innerHTML;
    teacher_name = event.target.parentNode.parentElement.parentElement.children[2].innerHTML;
    $('#editname').val(course_name);
    $('#update').show();
  });

  $('#fetch').click(function(e) {
    getAllCourses();
  });

  $('#teacherName').change(function() {
    getCoursesByTeacherId();
  });

  $('#saveBtn').click(function(e) {
    $.get('api/teacher/' + teacher_name, function(teacher) {
      updateCourse(course_id, teacher.id);
    });
  });

  $('.close').click(function(e) {
    $('.modal').hide();
  });
  $('#closebtn').click(function(e) {
    $('.modal').hide();
  });

  $('#filterCourses').keyup(function() {
    searchCourses();
  });

  $('#close').click(function(e) {
    $('#confirm').hide();
  });

  $('.closebtn').click(function() {
    $('#confirm').hide();
  });
  $('#yesBtn').click(function() {
    deleteCourse(course_id);
    $('#confirm').hide();
  });

  $('#closebtn2').click(function(e) {
    $('#error').hide();
  });
});

// update course function
function updateCourse(updated_id, teacher_id) {
  var course = {
    id: updated_id,
    name: $('#editname').val(),
    teacher: {
      id: teacher_id
    }
  };

  console.log(course);
  var jsonObject = JSON.stringify(course);
  $.ajax({
    url: 'api/course/' + updated_id,
    type: 'PUT',
    contentType: 'application/json',
    data: jsonObject,
    success: function() {
      showAlert('A record is updated!', 'success');
      getAllCourses();
      $('#update').hide();
    },
    error: function() {
      showAlert('Invalid Input', 'error');
    }
  });
}

function fetchAllTeachers() {
  $.get('api/teacher', function(teacher) {
    $('#teacherName').empty();
    $('#teacherName').append('<option></option>');
    for (var i = 0; i < teacher.length; i++) {
      var option = document.createElement('option');
      option.text = `${teacher[i].name}`;
      option.value = `${teacher[i].id}`;
      $('#teacherName').append(option);
    }
  });
}
// add course function
function addCourse() {
  var course = {
    teacher: {
      id: $('#teacherName').val()
    },
    name: $('#courseName').val()
  };
  console.log(course);
  var jsonObject = JSON.stringify(course);

  $.ajax({
    url: 'api/course',
    type: 'POST',
    contentType: 'application/json',
    data: jsonObject,
    success: function() {
      getAllCourses();
      showAlert('A course is added!', 'success');
      clearFields();
    },
    error: function() {
      showAlert('Invalid Input', 'error');
    }
  });
}

// clear fields

function clearFields() {
  $('#courseName').val('');
}

function getCoursesByTeacherId() {
  var teacherid = $('#teacherName').val();
  $.get('api/course/' + teacherid + '/courses', function(courses) {
    courseDataTable.clear().draw();
    // var teachername = $('#teacherName option:selected').text();
    for (var i = 0; i < courses.length; i++) {
      const row = courses[i];
      courseDataTable.row
        .add(
          $(
            '<tr id="row' +
              row.id +
              '"><td> ' +
              row.id +
              '</td>' +
              '<td>' +
              row.name +
              '</td>' +
              '<td>' +
              row.teacher.name +
              '</td>' +
              '<td><a href="#"><i class="fas fa-close" courseid="' +
              row.id +
              '"></i></a></td><td></td></tr>'
          )
        )
        .draw();
    }
  });
}

function getAllCourses() {
  courseDataTable.ajax.reload();
  //   $.get('api/course', function(courses) {
  //     $('#coursesContainer').empty();
  //     for (var i = 0; i < courses.length; i++) {
  //       var row = document.createElement('tr');
  //       row.innerHTML = `
  //              <td>${courses[i].id}</td>
  //              <td>${courses[i].name}</td>
  //              <td>${courses[i].teacher.name}</td>
  //              <td><a href="#" class="delete"> <i class="fa fa-close"></i> </a></td>
  //              <td><a href="#" class="update"> <i class="fa fa-edit"></i> </a></td>`;
  //       $('#coursesContainer').append(row);
  //
  //   });
}

function deleteCourse(course_id) {
  $.ajax({
    url: '/api/course/' + course_id,
    type: 'DELETE',
    success: function() {
      showAlert('A course is deleted!', 'success');
      getAllCourses();
    },
    error: function() {
      showAlert('Invalid input!', 'error');
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

// function searchCourses() {
//   // Declare variables
//   var input, filter, table, tr, td, i, txtValue;
//   input = document.getElementById('filterCourses');
//   filter = input.value.toUpperCase();
//   table = document.getElementById('coursesContainer');
//   tr = table.getElementsByTagName('tr');

//   // Loop through all table rows, and hide those who don't match the search query
//   for (i = 0; i < tr.length; i++) {
//     tds = tr[i].getElementsByTagName('td');
//     var flag = false;
//     for (var j = 0; j < tds.length; j++) {
//       var td = tds[j];
//       if (td.innerText.toUpperCase().indexOf(filter) > -1) {
//         flag = true;
//       }
//     }
//     if (flag) {
//       tr[i].style.display = '';
//     } else {
//       tr[i].style.display = 'none';
//     }
//   }
// }
