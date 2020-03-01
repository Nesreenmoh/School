var updated_id;
var teacher_name;
$(document).ready(function(){

    fetchAllTeachers();
    getAllCourses();

    $('#add').click(function(e){
        if($('#courseName').val() === '') {
            alert("Please enter course name!")
        }
        else
        {
            var teacher = $('#teacherName option:selected').val();
            addCourse(teacher);
        }
     e.preventDefalut();

    })

    $('#fetch').click(function(e) {
        getAllCourses();
        e.preventDefault();
    });

    $('#teacherName').change(function(){
        var teacherid= $('#teacherName').val();
        getCoursesByTeacherId(teacherid);
    })

    $('#coursesContainer').click(function (event) {

        if(event.target.className === 'fa fa-close')
        {
            var reply = confirm("Are you sure you want to delete?");
            if(reply){
                
                deleteCourse(event);
            }
           
        }
    
        if(event.target.className === 'fa fa-edit')
        {
           
           updated_id = event.target.parentNode.parentElement.parentElement.children[0].innerHTML;
           const course_name = event.target.parentNode.parentElement.parentElement.children[1].innerHTML;
           teacher_name = event.target.parentNode.parentElement.parentElement.children[2].innerHTML;
           $('#editname').val(course_name);
           $('.modal').show();
          
        //    console.log(teacher_id);
            
        }
        event.preventDefault();
    });
    
    $('#saveBtn').click(function(e) {
        $.get("api/teacher/" + teacher_name, function (teacher) {
            updateCourse(updated_id, teacher.id);
        });
         
        //  e.preventDefalut();
    })
   
    $('.close').click(function(e){
        $('.modal').hide();
    })
    $('#closebtn').click(function(e){
        $('.modal').hide();
    })
   
   
})


 function  updateCourse(updated_id, teacher_id){
    var course = {
        id: updated_id, 
        name: $('#editname').val(),
        teacher: {
            id: teacher_id,
        }
    }

    console.log(course);
    var jsonObject = JSON.stringify(course);
    $.ajax({
        url: "api/course/" + updated_id,
        type: "PUT",
        contentType: "application/json",
        data: jsonObject,
        success: function () {
            alert("A record is updated!")
            $('.modal').hide();
        },
        error: function () {
            alert("Invalid Input", 'error');
        }
    });
 }

function fetchAllTeachers() {
    $.get("api/teacher", function (teacher) {
        $('#teacherName').empty();
        $('#teacherName').append('<option></option>');
        for(var i=0; i<teacher.length; i++) {
        var option = document.createElement('option');
        option.text = `${teacher[i].name}`;
        option.value= `${teacher[i].id}`; 
        $('#teacherName').append(option);
        }
    });

}

function addCourse(teacher) {
   var course = {
       teacher :{
            id :  $('#teacherName').val(),
       },
       name : $('#courseName').val(),
   };
   
   var jsonObject = JSON.stringify(course);

   $.ajax({
    url: "api/course",
    type: "POST",
    contentType: "application/json",
    data: jsonObject,
    success: function () {
      alert("A course is added!");
      
    }, 
    error: function () {
        alert("Invalid Input", 'error');
    }

});

}
 function getCoursesByTeacherId(teacherid) {
    $.get("api/course/"+ teacherid +"/courses", function (courses) {
        $('#coursesContainer').empty();
        var teachername =  $('#teacherName option:selected').text();
        for(var i=0; i<courses.length; i++) {
        var row = document.createElement('tr');
        row.innerHTML = `
         <td>${courses[i].id}</td>
         <td>${courses[i].name}</td>
         <td>${teachername}</td>
         <td><a href="#" class="delete"> <i class="fa fa-close"></i> </a></td>
         <td><a href="#" class="update"> <i class="fa fa-edit"></i> </a></td>`;
        $('#coursesContainer').append(row);
        }
    });
 }

 function deleteCourse(event) {
    const course_id = event.target.parentNode.parentElement.parentElement.children[0].innerHTML;
    $.ajax({
        url: "/api/course/" + course_id,
        type: "DELETE",
        success: function () {
            event.target.parentNode.parentElement.parentElement.remove();
            alert ("A course is deleted!");
        },
        error: function () {
           alert("Invalid input!")
        }
    });
 }

 function getAllCourses() {

    $.get("api/course", function (courses) {
        $('#coursesContainer').empty();
        for(var i=0; i<courses.length; i++) {
            var row = document.createElement('tr');
            row.innerHTML = `
             <td>${courses[i].id}</td>
             <td>${courses[i].name}</td>
             <td>${courses[i].teacher.name}</td>
             <td><a href="#" class="delete"> <i class="fa fa-close"></i> </a></td>
             <td><a href="#" class="update"> <i class="fa fa-edit"></i> </a></td>`;
            $('#coursesContainer').append(row);
            }
    });
 }

 