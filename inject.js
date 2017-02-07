function injected_main() {
    let trackingData = {};
    $("button, a").click(function () {
        setTimeout(setClick, 2000);
    });
    setClick();
    function setClick() {
        var setClickInterval = setInterval(function () {
            let trackButton = $('[data-bind="jqButton: {disabled: !timeTrackEnabled()}, click: trackTime"]');
            if ($(trackButton)) {

                $('[data-bind="text: totalTimeSpentForCaseFormatted"]').css("background", "red");
                //needed data
                //track-button
                $(trackButton).click(dataCatcher);
                clearInterval(setClickInterval);
            }
        }, 500);//timer needs to be re-configured
    }
    function dataCatcher() {

        trackingData.caseID = $('#copyCaseCode').html();
        trackingData.step = $('#case-indicator-text').html();
        trackingData.caseType  = $('#surgeryTypeName').html();
        trackingData.time = $('#txtDuration').val();//time
        //if (tracking) {

        //}
        $.ajax({
            url: "https://localhost:8093/WriteHandler.ashx",
            method: "POST",
            data: trackingData,
            complete: function (data) { console.dir(data) },
            error: function () { alert('error') }
        });
    }
}