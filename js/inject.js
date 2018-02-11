function injected_main(x) {
    if (x.user === undefined) {
        alert('You are not logged in. Your time will not be tracked in time tracker. If you dont want to use tracking, you can disable tracker in chrome://extensions/');
        return;
    }

    $(document).click((e) => {
        let trackButton = $('#divTimeSpent button')[0];
        let timeInput = $('#txtDuration');

        if (trackButton && timeInput) {
            $(trackButton).off("click", dataCatcher);
            $(timeInput).off("keyup", enterTrack);

            $.ajax({
                type: 'GET',
                url: 'https://10.20.24.57:3000/users/cases/write',
                success: () => {
                    $('#txtDuration').css("border-color", "#B2FF59");
                },
                error: () => {
                    $.ajax({
                        type: 'GET',
                        url: 'https://10.20.24.57:3002/users/cases/write',
                        success: () => {
                            $('#txtDuration').css("border-color", "#B2FF59");
                        },
                        error: () => {
                            $('#txtDuration').css("border-color", "#FF6E40");
                        }
                    });
                }
            });
            $(trackButton).click(dataCatcher);
            $(timeInput).keyup(enterTrack);
        }
    });
    const lastWordPattern = /(\w+)$/;
    const oblPattern = /^(OB).+/;

    function dataCatcher() {
        let trackingData = {};

        trackingData.username = x.user.username;
        trackingData.caseID = $('#copyCaseCode').html();
        trackingData.step = $('.steps>li:first-child>[data-bind="text: name"]').html();
        trackingData.caseType = $('#surgeryTypeName').html();
        trackingData.time = $('#txtDuration').val();//time
        trackingData.role = (lastWordPattern.exec(trackingData.step)[0] == "QC") ? "qe" : "ce";
        trackingData.isOBL = (oblPattern.exec(trackingData.caseID)) ? true : false;
        trackingData.brand = $('[data-bind="text: brand"]').html();

        if (!trackingData.caseID || !trackingData.time) return;

        console.dir(trackingData);

        $.ajax({
            type: 'POST',
            data: JSON.stringify(trackingData),
            contentType: 'application/json',
            url: 'https://10.20.24.57:3000/users/cases/write',
            success: (data) => {
                console.log('success');
                console.dir(data);
            },
            error: (data) => {
                $.ajax({
                    type: 'POST',
                    data: JSON.stringify(trackingData),
                    contentType: 'application/json',
                    url: 'https://10.20.24.57:3002/users/cases/write',
                    success: (data) => {
                        console.log('success');
                        console.dir(data);
                    },
                    error: (data) => {
                        alert('Time was not tracked. There are some issues on the server side.')
                        console.log(data);
                    }
                });
            }
        });
    }
    function enterTrack(e) {
        if (e.key == "Enter") {
            dataCatcher();
        }
    }
}