$(function () {
    //
    //set default date today
    //
    let defDate = new Date();
    let y = defDate.getFullYear();
    let m = (defDate.getMonth() + 1 < 10) ? "0" + (defDate.getMonth() + 1) : defDate.getMonth() + 1;
    let d = (defDate.getDate() < 10) ? "0" + defDate.getDate() : defDate.getDate();
    let defDateStr = y + "-" + m + "-" + d;
    $('#date').val(defDateStr);
    $('#date').change(() => {
        $('.tabs').removeClass("active");
        $('#time-synthes').html("&nbsp;");
        $('#time-OBL').html("&nbsp;");

    })
    //
    //geting time from server
    //class="active"
    let data = {};
    let timeMinutes = {}
    let timeHours = {};
    const minutesInHour = 60;
    $('.tabs').click(function () {
        $('.tabs').removeClass("active");
        $(this).addClass("active");

        data = getDate();
        data.role = $(this).data("role");
        console.dir(data);

        $.ajax({
            url: "https://localhost:8094/ReadHandler.ashx",
            method: "POST",
            data: data,
            complete: complete,
            beforeSend: before
        });
    });
    $('.dropdown-menu li').click(function () {
        if ($(this).data("time-format") == $('#dropdownMenu2').data("time-format")) return;
        $('#dropdownMenu2').data("time-format", $(this).data("time-format"));
        $('#dropdownMenu2').html($(this).html());

        $('#time-synthes').html($('#time-synthes').html() == timeMinutes.timeSynthes ? timeHours.timeSynthes : timeMinutes.timeSynthes);
        $('#time-OBL').html($('#time-OBL').html() == timeMinutes.timeObl ? timeHours.timeObl : timeMinutes.timeObl);
    })

    function getDate() {
        let dateString = $('#date').val();
        let dateSplited = dateString.split("-");
        let date = { y: +dateSplited[0], m: +dateSplited[1], d: +dateSplited[2] }
        return date;
    }

    function complete(res) {
        $('#output').removeClass("opacity");
        $('#loader').hide();

        timeMinutes = JSON.parse(res.responseText);
        timeHours = timeToHours(timeMinutes);
        console.dir(timeMinutes);

        let timeToOutSynthes = timeMinutes.timeSynthes;
        let timeToOutObl = timeMinutes.timeObl;

        if ($('#dropdownMenu2').data("time-format") === "hh") {
            timeToOutSynthes = timeHours.timeSynthes;
            timeToOutObl = timeHours.timeObl;
        }

        $('#time-synthes').html(timeToOutSynthes);
        $('#time-OBL').html(timeToOutObl);
    }
    function before() {
        $('#output').addClass("opacity");
        $('#loader').show();
    }

    function timeToHours(time) {
        return {
            timeSynthes: (time.timeSynthes / minutesInHour).toFixed(1) !== "0.0" ? (time.timeSynthes / minutesInHour).toFixed(1) : 0,
            timeObl: (time.timeObl / minutesInHour).toFixed(1) !== "0.0"? (time.timeObl / minutesInHour).toFixed(1) : 0
        }
    }
    
    $('#db').click(() => {
        $.post("Handler.ashx", function () {
            alert("done");
        });
    })


});