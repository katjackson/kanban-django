
$(".edit_button").click(function() {
    $(".task_form").show("slow");
});


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


var $del_button = $(".delete_button")

$del_button.click(function() {
    console.log('clicked the delete button');

    console.log($del_button.val());
    var $id = $del_button.val();

    $.ajax({
        url: 'http://127.0.0.1:8000/api/tasks/' + $id + '/',
        type: 'DELETE',
        success: function() {
            console.log('wonder what that deleted.');
        }
});

return false;
});
