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
var $api = '/api/';
var $userID = $('input[name="user"]').val()

var appendTask = function (task) {
    var $li = $('<li>');
    $li.text(task.title);
    $li[0].value = task.id;

    $('<br>').appendTo($li);

    var $form = $('<form class="hidden_form">');
        var $legend = $('<legend>');
        $legend.text('Edit this task');
        $legend.appendTo($form);

        $("<p>")
            .append(
                $('<label for="id_title">').text("Title:"),
                $('<input value="' + task.title + '" id="id_title" maxlength="150" name="title" type="text">')
            )
            .appendTo($form);

        $("<p>")
            .append(
                $('<label for="id_status">').text("Status:"),
                $('<select id="id_status" name="status">')
                    .append(
                        $('<option value="1">').text("Backlog"),
                        $('<option value="2">').text("Ready"),
                        $('<option value="3">').text("In Progress"),
                        $('<option value="4">').text("Complete")
                    )
            )
            .appendTo($form);

        $("<p>")
            .append(
                $('<label for="id_priority">').text("Priority:"),
                $('<select id="id_priority" name="priority">')
                    .append(
                        $('<option value="1">').text("High"),
                        $('<option value="2">').text("Moderate"),
                        $('<option value="3">').text("Low")
                    )
            )
            .appendTo($form);

            $("<p>")
                .append(
                    $('<label for="id_description">').text("Description:"),
                    $('<textarea cols="40" id="id_description" maxlength="1250" name="description" rows="10">').text(task.description)
                )
                .appendTo($form);

            $('<input type="submit" value="Save">').appendTo($form);
    $form.appendTo($li);

    $form.find("#id_status > option[value='" + task.status + "']").attr("selected", "selected");
    $form.find("#id_priority > option[value='" + task.priority + "']").attr("selected", "selected");
    $form.find("#id_owner > option[value='" + task.owner + "']").attr("selected", "selected");


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

var submitEditForm = function($edit_form, id) {
    // var $edit_form = $('#hidden_form');
    $edit_form.title = $edit_form.find('input[name="title"]');
    $edit_form.status = $edit_form.find('select[name="status"]');
    $edit_form.priority = $edit_form.find('select[name="priority"]');
    $edit_form.description = $edit_form.find('textarea[name="description"]');

    console.log('things are happening');

    var $edit_form_data = {
        title: $edit_form.title.val(),
        status: $edit_form.status.val(),
        priority: $edit_form.priority.val(),
        description: $edit_form.description.val(),
        owner: $api + 'users/' + $userID + '/',
    };

    $.ajax({
        url: $api + 'tasks/' + id + '/',
        method: "PUT",
        data: $edit_form_data,
        success: function() {
            // appendTask($edit_form_data);
            // buttonInit();
            console.log('i think it worked!');
        }
    });

    return false;
};


var editInit = function () {
    $(".edit").on("click", function () {
        console.log("i clicked edit");
        var $li = event.target.closest('li');
        console.log($li.value, $li);

        $form = $(' li[value=' + $li.value + '] > form ');
        $form.show();
        $form.submit(function(event) {
            event.preventDefault();
            submitEditForm($form, $li.value);
            $form.hide();
        })
    });
};

var buttonInit = function () {
    deleteInit();
    editInit();
};

function print_list() {
    $.ajax({
        url: $api + 'tasks/?owner=' + $userID,
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
        owner: $api + 'users/' + $userID + '/',
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
