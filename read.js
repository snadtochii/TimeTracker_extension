$(function () {
    let data = {};

    $('.get-time').click(function () {

        data = getDate();
        data.role = $(this).data("role");

        console.dir(data);
        $.post("https://localhost:8093/ReadHandler.ashx", data, (rez) => {
            $('#par').html(rez + "min");
        });
    });

    function getDate() {
        let dateString = $('#date').val();
        let dateSplited = dateString.split("-");
        let date = { y: +dateSplited[0], m: +dateSplited[1], d: +dateSplited[2] }
        return date;
    }
});