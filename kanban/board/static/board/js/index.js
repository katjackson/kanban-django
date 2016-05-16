// CSRF stuff //
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie('csrftoken');


function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

// my page stuff //
var $tasks = $('#tasks')
var $api = 'http://127.0.0.1:8000/api/';

var appendTask = function (task) {
    var $li = $('<li>');
    $li.text(task.title);
    $li[0].value = task.id

    var $button = $('<button class="edit">');
    $button.text('Edit');
    $button.appendTo($li);

    var $button = $('<button class="delete">');
    $button.text('Delete');
    $button.appendTo($li);

    $li.appendTo($tasks);
};

var deleteInit = function () {
    $(".delete").on("click", function () {
        var $li = event.target.closest('li');
        console.log($li.value);

        $.ajax({
            url: $api + 'tasks/' + $li.value + '/',
            type: 'DELETE',
            success: function(tasks) {
                console.log('deleted');
                var $delLi = $tasks.find('li[value=' + $li.value + ']');
                $delLi.remove();
            }
        });
    });
};

var editInit = function () {
    $(".edit").on("click", function () {
        console.log("i clicked edit");
        var $li = event.target.closest('li')
        console.log($li.value);

        
    });
};

var buttonInit = function () {
    deleteInit();
    editInit();
};

function print_list() {
    $.ajax({
        url: $api + 'tasks/',
        type: 'GET',
        success: function(tasks) {
            tasks.results.forEach(appendTask);
            buttonInit();
        }
    });
};

print_list();

var $new_task = $('#new_task_form');
$new_task.title = $new_task.find('input[name="title"]');
$new_task.status = $new_task.find('select[name="status"]');
$new_task.priority = $new_task.find('select[name="priority"]');
$new_task.description = $new_task.find('textarea[name="description"]');
$new_task.owner = $new_task.find('select[name="owner"]');


$new_task.submit(function() {
    console.log('things are happening');

    var $new_task_data = {
        title: $new_task.title.val(),
        status: $new_task.status.val(),
        priority: $new_task.priority.val(),
        description: $new_task.description.val(),
        owner: 'http://127.0.0.1:8000/api/users/' + $new_task.owner.val() + '/',
    };

    $.ajax({
        url: $api + 'tasks/',
        method: "POST",
        data: $new_task_data,
        success: function() {
            appendTask($new_task_data);
            buttonInit();
            console.log('i think it worked!');
            $new_task[0].reset();
        }
    });

    return false;
});
