$(function () {
    $('#auth-form').submit((e) => {
        e.preventDefault();

        const user = {
            email: $('#email').val()
        }
        $.ajax({
            type: 'GET',
            data: user,
            contentType: 'application/json',
            url: 'https://localhost:3000/api/v0/users',
            success: (data) => {
                if (data) {
                    storeUserData(data.token, data.user);
                    location.reload();
                    $('#auth').css('display', 'none');
                    $('#working-space').css('display', 'block');
                } else {
                    $('#error').html(data.msg);
                    $('#error-alert').fadeIn();
                    $('#error-alert').delay(3000).fadeOut();
                }
                console.log(data);
            },
            error: (error) => {
                $('#error').html(error.responseJSON.err);
                $('#error-alert').fadeIn();
                $('#error-alert').delay(3000).fadeOut();
                console.log(error.responseJSON.err);
            }
        });
    });
    function storeUserData(token, user) {
        chrome.storage.local.set({ "user": user }, () => { });
        chrome.storage.local.set({ "token": token }, () => { });

    }
})


