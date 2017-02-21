function injected_main() {

    $(document).click((e) => {
        let trackButton = $('[data-bind="jqButton: {disabled: !timeTrackEnabled()}, click: trackTime"]');
        let timeInput = $('#txtDuration');
        if (trackButton && timeInput) {
            $(trackButton).off("click", dataCatcher);
            $(timeInput).off("keyup", enterTrack);

            $('[data-bind="text: totalTimeSpentForCaseFormatted"]').css("background", "red");

            $(trackButton).click(dataCatcher);
            $(timeInput).keyup(enterTrack);
        }
    });
    const lastWordPattern = /(\w+)$/;
    const oblPattern = /^(OB).+/;
    function dataCatcher() {
        let trackingData = {};

        trackingData.caseID = $('#copyCaseCode').html();
        trackingData.step = $('#case-indicator-text').html();
        trackingData.caseType = $('#surgeryTypeName').html();
        trackingData.time = $('#txtDuration').val();//time
        trackingData.role = (lastWordPattern.exec(trackingData.step)[0] == "QC") ? "qe" : "ce";
        trackingData.isOBL = (oblPattern.exec(trackingData.caseID)) ? true : false;

        if (!trackingData.caseID) return;

        $.ajax({
            url: "https://localhost:8094/WriteHandler.ashx",
            method: "POST",
            data: trackingData,
            complete: function (data) { console.dir(data) },
            //error: function () { alert('error') }
        });

        $.ajax({
            url: "https://localhost:8094/SQLHandler.ashx",
            method: "POST",
            data: trackingData,
            complete: function (data) { console.dir(data) },
            error: function () { alert('error') }
        });
    }
    function enterTrack(e) {
        if (e.key == "Enter") {
            dataCatcher();
        }
    }
}