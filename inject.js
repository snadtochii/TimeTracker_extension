function injected_main() {
    //var observer = new MutationObserver(function (mutations) {
    //    mutations.forEach(function (mutation) {
    //        if (!mutation.addedNodes) return
    //        //setClick();
    //        for (var i = 0; i < mutation.addedNodes.length; i++) {
    //            // do things to your newly added nodes here
    //            var node = mutation.addedNodes[i]
    //            //$(node).css("background", "red")
    //            console.log(node);
    //            if ($(node).data("bind") == "with: trackedTimeInfo") { //continue;!!!!!!!!!!!!
    //                $(node).css("background", "gray");
    //                setClick();
    //                //$(node).click(setClick);
    //                break;
    //            }

    //        }
    //    })
    //})

    //observer.observe(document, {
    //    childList: true
    //  , subtree: true
    //  , attributes: true
    //  , characterData: true
    //  ,  subtree: true
    //});




    //var setClickInterval = setInterval(function () {
    //    let trackButton = $('[data-bind="jqButton: {disabled: !timeTrackEnabled()}, click: trackTime"]');
    //    if (trackButton) {

    //        //var events = $(trackButton).data('events');
    //        //console.dir(events);

    //        //if (events) {
    //        //    $.each(events, function (event, obj) {
    //        //        console.dir(event);

    //        //    });
    //        //}

    //        //$('[data-bind="text: totalTimeSpentForCaseFormatted"]').css("background", "red");
    //        $(trackButton).css("background", "green");

    //        //needed data
    //        //track-button
    //        $(trackButton).click(dataCatcher);
    //        clearInterval(setClickInterval);
    //    }
    //}, 100);

    $(document).click(() => {
        let trackButton = $('[data-bind="jqButton: {disabled: !timeTrackEnabled()}, click: trackTime"]');
        if (trackButton) {
            $(trackButton).off("click", dataCatcher);

            //$(trackButton).css("background", "red");
            $('[data-bind="text: totalTimeSpentForCaseFormatted"]').css("background", "red");

            $(trackButton).click(dataCatcher);
        }
    });
    const lastWordPat =/(\w+)$/;

    function dataCatcher() {
        let trackingData = {};

        trackingData.caseID = $('#copyCaseCode').html();
        trackingData.step = $('#case-indicator-text').html();
        trackingData.caseType = $('#surgeryTypeName').html();
        trackingData.time = $('#txtDuration').val();//time
        trackingData.role = (lastWordPat.exec(trackingData.step)[0] == "QC") ? "qe" : "ce";//последнее слово
        $.ajax({
            url: "https://localhost:8093/WriteHandler.ashx",
            method: "POST",
            data: trackingData,
            complete: function (data) { console.dir(data) },
            error: function () { alert('error') }
        });
    }
}