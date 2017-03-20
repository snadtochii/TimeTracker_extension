$(function () {
    $('#auth-form').submit((e) => {
        e.preventDefault();

        const user = {
            username: $('#username').val(),
            password: $('#password').val()
        }
        $.ajax({
            type: 'POST',
            data: JSON.stringify(user),
            contentType: 'application/json',
            url: 'https://10.20.24.60:3000/users/authenticate',
            success: (data) => {
                if (data.success) {
                    storeUserData(data.token, data.user);
                    location.reload();
                    // $('#auth').css('display', 'none');
                    // $('#working-space').css('display', 'block');
                } else {
                    $('#error').html(data.msg);
                    $('#error-alert').fadeIn();
                    $('#error-alert').delay(3000).fadeOut();
                }
                console.log(data);
            },
            error: (data) => {
                $('#error').html('Server is not responding');
                $('#error-alert').fadeIn();
                $('#error-alert').delay(3000).fadeOut();
                console.log(data);
            }
        });
    });
    function storeUserData(token, user) {
        chrome.storage.local.set({ "user": user }, () => { });
        chrome.storage.local.set({ "token": token }, () => { });

    }
})