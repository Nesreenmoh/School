var updated_id;
$(document).ready(function(){

    getTeachers();

    $('#add').click(function(){
        if($('#teacherName').val() === '') {
            alert("Please enter teacher name!")
        }
        else
        {

            addTeacher();
        }

    })

    $('#fetch').click(function(e) {

        getTeachers();
        e.preventDefault();
    });

    $('#teacherContainer').click(function (event) {

        if(event.target.className === 'fa fa-close')
        {
           var reply = confirm("Are you sure you want to delete?");
           if(reply){
            deleteTeachers(event);
           }
        }

        if(event.target.className === 'fa fa-edit')
        {
            updated_id = event.target.parentNode.parentElement.parentElement.children[0].innerHTML;
            const teacher_name = event.target.parentNode.parentElement.parentElement.children[1].innerHTML;
            $('#teacherName').val(teacher_name);
            $('#add').hide();
            $('#save').show();
            // updateTeachers(teacher_id);
        }
        event.preventDefault();
    });
    $('#save').click(function(event){

        updateTeachers(updated_id);
        event.preventDefault();
    })
   
})


function  updateTeachers(updated_id) {

    var teacher = {
        id: updated_id, 
        name: $('#teacherName').val(),
    }

    var jsonObject = JSON.stringify(teacher);
    $.ajax({
        url: "api/teacher/" + updated_id,
        type: "PUT",
        contentType: "application/json",
        data: jsonObject,
        success: function () {
            alert("A record is updated!")
        },
        error: function () {
            alert("Invalid Input", 'error');
        }
    });

}

function getTeachers() {

    $.get("api/teacher", function (teacher) {
        $('#teacherContainer').empty();
        console.log(teacher);
        for(var i=0; i<teacher.length; i++) {
            const list = document.getElementById('teacherContainer');
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${teacher[i].id}</td>
            <td>${teacher[i].name}</td>
            <td> <a href="#" class="delete"> <i class="fa fa-close"></i> </a></td> 
            <td> <a href="#" class="update"> <i class="fa fa-edit"></i> </a></td>`;
            list.appendChild(row);
            }

    });
}
function addTeacher() {

   var teacher = {
        name: $('#teacherName').val(),
    };

    var jsonObject = JSON.stringify(teacher);
    $.ajax({
        url: "api/teacher",
        type: "POST",
        contentType: "application/json",
        data: jsonObject,
        success: function () {
          alert("A record is added");
          getTeachers();
        }, 
        error: function () {
            alert("Invalid Input", 'error');
        }

    });


}

function deleteTeachers(event)
    {
        const teacher_id = event.target.parentNode.parentElement.parentElement.children[0].innerHTML;
        $.ajax({
            url: "/api/teacher/" + teacher_id,
            type: "DELETE",
            success: function () {
                event.target.parentNode.parentElement.parentElement.remove();
                alert ("Teacher is deleted!");
            },
            error: function () {
            
               alert("Invalid input or you cannot delete a teacher who has some courses !")
            }
        });
   }