$(function () {

    $('.carousel').carousel({
        interval: false
    });
    let data = {};
    let timeMinutes = {}
    let timeHours = {};
    const minutesInHour = 60;
    //
    //set default date today
    //
    GetSetDate.setDate();

    $('#date').change(() => {
        $('.tabs').removeClass("active");
        $('#time-synthes').html("&nbsp;");
        $('#time-OBL').html("&nbsp;");
        $('#time-sum').html("&nbsp;")
    });

    $('#dropdownMenu2').data("time-format") === "mm"
        ? $('#dropdownMenu2').find(":first-child").html("Minutes")
        : $('#dropdownMenu2').find(":first-child").html("Hours");


    //
    //geting time from server
    //
    $('.tabs').click(function () {
        $('.tabs').removeClass("active");
        $(this).addClass("active");

        data = GetSetDate.getDate();
        data.role = $(this).data("role");
        console.dir(data);

        timeReq();
    });
    $('.dropdown-menu li').click(function () {
        if ($(this).data("time-format") == $('#dropdownMenu2').data("time-format")) return;
        $('#dropdownMenu2').data("time-format", $(this).data("time-format"));
        $('#dropdownMenu2').find(":first-child").html($(this).find(":first-child").html());

        $('#time-synthes').html($('#time-synthes').html() == timeMinutes.timeSynthes ? timeHours.timeSynthes : timeMinutes.timeSynthes);
        $('#time-OBL').html($('#time-OBL').html() == timeMinutes.timeObl ? timeHours.timeObl : timeMinutes.timeObl);
        $('#time-sum').html(+$('#time-synthes').html() + +$('#time-OBL').html());
    })

    $('#left').click(() => {
        let currentDate = new Date($('#date').val());
        let reqDate = currentDate.setDate(currentDate.getDate() - 1);
        data.y = GetSetDate.setDate(reqDate).y;
        data.m = GetSetDate.setDate(reqDate).m;
        data.d = GetSetDate.setDate(reqDate).d;

        if(!data.role) return;
        
        console.dir(data);
        timeReq();
    });
    $('#right').click(() => {
        let currentDate = new Date($('#date').val());
        let reqDate = currentDate.setDate(currentDate.getDate() + 1);
        data.y = GetSetDate.setDate(reqDate).y;
        data.m = GetSetDate.setDate(reqDate).m;
        data.d = GetSetDate.setDate(reqDate).d;

        if(!data.role) return;

        console.dir(data);
        timeReq();
    });

    function timeReq() {
        $.ajax({
            url: "https://localhost:8094/ReadHandler.ashx",
            method: "POST",
            data: data,
            complete: complete,
            beforeSend: before
        });
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
        (+timeToOutSynthes + +timeToOutObl) 
            && $('#time-sum').html((+timeToOutSynthes + +timeToOutObl).toFixed(1))
            || $('#time-sum').html(0);
    }
    function before() {
        $('#output').addClass("opacity");
        $('#loader').show();
    }

    function timeToHours(time) {
        return {
            timeSynthes: (time.timeSynthes / minutesInHour).toFixed(1) !== "0.0" ? (time.timeSynthes / minutesInHour).toFixed(1) : 0,
            timeObl: (time.timeObl / minutesInHour).toFixed(1) !== "0.0" ? (time.timeObl / minutesInHour).toFixed(1) : 0
        }
    }
});