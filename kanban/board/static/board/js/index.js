var $tasks = $('#tasks')

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


$.ajax({
    url: 'http://127.0.0.1:8000/api/tasks/',
    type: 'GET',
    success: function(tasks) {
        tasks.results.forEach(function (task) {
            console.log(task);
            var $li = $('<li>');
            $li.text(task.title)
            $li.appendTo($tasks);
        })
    }
});


var $new_task = $('#new_task_form');
$new_task.title = $new_task.find('input[name="title"]');
$new_task.status = $new_task.find('select[name="status"]');
$new_task.priority = $new_task.find('select[name="priority"]');
$new_task.description = $new_task.find('textarea[name="description"]');
$new_task.owner = $new_task.find('select[name="owner"]');


$new_task.submit(function() {
    console.log('things are happening');
    var $form_data = $new_task.serialize();

    $.ajax({
        url: 'http://127.0.0.1:8000/api/tasks/',
        method: "POST",
        data: {
            title: $new_task.title.val(),
            status: $new_task.status.val(),
            priority: $new_task.priority.val(),
            description: $new_task.description.val(),
            owner: 'http://127.0.0.1:8000/api/users/' + $new_task.owner.val() + '/',
        }
,
        success: function() {
            console.log('i think it worked!');
        }
    });

    return false;
});
