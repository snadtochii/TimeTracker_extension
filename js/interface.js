$(function () {
    chrome.storage.local.get(/* String or Array */["user"], function (items) {
        console.log(items);
        // console.log(x);
        if (items.user) {
            $('#auth').css('display', 'none');
            $('#working-space').css('display', 'block');
            $('#name').html(items.user.name);

            $('.carousel').carousel({
                interval: false
            });
            let data = { username: items.user.username, date: {} };
            let timeMinutes = {}
            let timeHours = {};
            const minutesInHour = 60;
            //
            //set default date today
            //
            GetSetDate.setDate();

            $('#date').change(() => {
                let currentDate = new Date($('#date').val());
                let reqDate = currentDate.setDate(currentDate.getDate() - 1);

                prepareData(reqDate);

                if (!data.role) return;

                console.dir(data);
                timeReq();
            });

            $('#dropdownMenu2').data("time-format") === "mm"
                ? $('#dropdownMenu2').find(":first-child").html("Minutes")
                : $('#dropdownMenu2').find(":first-child").html("Hours");

            //
            //get time from server
            //
            $('.tabs').click(function () {
                $('.tabs').removeClass("active");
                $(this).addClass("active");

                data.date = GetSetDate.getDate();
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

                prepareData(reqDate);

                if (!data.role) return;

                console.dir(data);
                timeReq();
            });
            $('#right').click(() => {
                let currentDate = new Date($('#date').val());
                let reqDate = currentDate.setDate(currentDate.getDate() + 1);
                prepareData(reqDate);

                if (!data.role) return;

                console.dir(data);
                timeReq();
            });

            $('#logout').click(() => {
                chrome.storage.local.clear(() => { });
                location.reload();
            })

            function prepareData(reqDate) {
                data.date.y = GetSetDate.setDate(reqDate).y;
                data.date.m = GetSetDate.setDate(reqDate).m;
                data.date.d = GetSetDate.setDate(reqDate).d;
            }

            function timeReq() {
                $.ajax({
                    type: 'POST',
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    url: 'https://10.20.24.57:3000/users/cases/read',
                    success: complete,
                    error: (data) => {
                        $('#error-logged').html('Server is not responding');
                        $('#error-alert-logged').fadeIn();
                        $('#error-alert-logged').delay(3000).fadeOut();
                        console.log(data);
                    }
                });
            }

            function complete(res) {
                $('#output').removeClass("opacity");
                $('#loader').hide();

                if (res.success) {
                    timeMinutes = res.caseTime;
                    timeHours = timeToHours(timeMinutes);
                    console.dir(timeMinutes);
                    console.dir(timeHours);

                    let timeToOutSynthes = ($('#dropdownMenu2').data("time-format") === "hh") ? timeHours.timeSynthes : timeMinutes.timeSynthes;
                    let timeToOutObl = ($('#dropdownMenu2').data("time-format") === "hh") ? timeHours.timeObl : timeMinutes.timeObl;
                    console.dir(timeHours.timeSynthes);
                    console.dir(timeMinutes.timeSynthes);

                    $('#time-synthes').html(timeToOutSynthes);
                    $('#time-OBL').html(timeToOutObl);
                    $('#time-sum').html(+((+$('#time-synthes').html() + +$('#time-OBL').html()).toFixed(1)));
                    // (+timeToOutSynthes + +timeToOutObl)
                    //     && $('#time-sum').html((+timeToOutSynthes + +timeToOutObl).toFixed(1))
                    //     || $('#time-sum').html(0);
                }
            }
            function before() {
                $('#output').addClass("opacity");
                $('#loader').show();
            }

            function timeToHours(time) {
                return {
                    timeSynthes: time.timeSynthes !== 0 ? (time.timeSynthes / minutesInHour).toFixed(1) : 0,
                    timeObl: time.timeObl !== 0 ? (time.timeObl / minutesInHour).toFixed(1) : 0
                }
            }
        }
    })

});