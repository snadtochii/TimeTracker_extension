$(function(){
    $('#button').click(() => {
        let date = Date(2017, 2, 5);

        let data = { y: 2017, m: 2, d: 5 }
        //console.dir(date);
        $.post("https://localhost:8093/ReadHandler.ashx", data, (rez) => { $('#par').html(rez); })
        //https://localhost:44325/
    });
})