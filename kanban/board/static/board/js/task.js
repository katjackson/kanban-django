var $taskForm = $('#task_form')
var $api_url = document.getElementById("task_form").action

var $title = $('input[name="title"]');
var $status = $('select[name="status"]');
var $priority = $('select[name="priority"]');
var $description = $('textarea[name="description"]');
var $owner = $('select[name="owner"]');


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



$taskForm.submit(function() {
    console.log('things are happening');

    $.ajax({
        url: $api_url,
        method: "PUT",
        data: {
            title: $title.val(),
            status: $status.val(),
            priority: $priority.val(),
            description: $description.val(),
            owner: $owner.val(),
        },
        success: function() {
            console.log('i think it worked!');
        }
    });

    return false;
});
