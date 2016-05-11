$(document.forms).on('submit', function () {
    var form = $(this);
    var url = form.attr('id') === 'signin' ? '/login' : '/registration';

    $('.error', form).removeClass('alert alert-danger').html('');
    $(':submit', form).button('loading');
    //$()

    $.ajax({
        url: url,
        method: 'POST',
        data: form.serialize(),
        complete: function () {
            $(':submit', form).button('reset');
        },
        statusCode: {
            200: function () {
                form.html('Вы вошли на сайт').addClass('alert-success');
                //window.location.href = "/chat";
            },
            403: function (jqXHR) {
                var error = JSON.parse(jqXHR.responseText);
                $('.error', form).html(error.message);
            },
            404: function () {
                $('.error', form).addClass('alert alert-danger').html('Page not found');
            }
        }
    });

    return false
});