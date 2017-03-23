function injected_main(x) {
if(x.user === undefined){
    alert('You are not logged in. Your time will not be tracked in time tracker. If you dont want to use tracking, you can disable tracker in chrome://extensions/');
    return;
}
    console.log(x.user.username);
    $(document).click((e) => {
        let trackButton = $('[data-bind="jqButton: {disabled: !timeTrackEnabled()}, click: trackTime"]');
        let timeInput = $('#txtDuration');
        if (trackButton && timeInput) {
            $(trackButton).off("click", dataCatcher);
            $(timeInput).off("keyup", enterTrack);

            //$('[data-bind="text: totalTimeSpentForCaseFormatted"]').css("background", "red");

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
        trackingData.step = $('#case-indicator-text').html();
        trackingData.caseType = $('#surgeryTypeName').html();
        trackingData.time = $('#txtDuration').val();//time
        trackingData.role = (lastWordPattern.exec(trackingData.step)[0] == "QC") ? "qe" : "ce";
        trackingData.isOBL = (oblPattern.exec(trackingData.caseID)) ? true : false;
        console.log(trackingData);
        if (!trackingData.caseID) return;
        console.dir(trackingData);
        $.ajax({
            type: 'POST',
            data: JSON.stringify(trackingData),
            contentType: 'application/json',
            url: 'https://10.20.24.60:3000/users/cases/write',
            success: function (data) {
                console.log('success');
                console.dir((data));
            },
            error: (data) => {
                alert('Time was not tracked. There are some issues on the server side.')
                console.log(data);
            }
        });
    }
    function enterTrack(e) {
        if (e.key == "Enter") {
            dataCatcher();
        }
    }
}