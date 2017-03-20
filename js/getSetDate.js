let GetSetDate = function () {
    function _setDate(date) {
        let defDate;
        if (!arguments[0]) {
            defDate = new Date();
        }
        else {
            defDate = new Date(date);
        }
        let _y = defDate.getFullYear();
        let _m = (defDate.getMonth() + 1 < 10) ? "0" + (defDate.getMonth() + 1) : defDate.getMonth() + 1;
        let _d = (defDate.getDate() < 10) ? "0" + defDate.getDate() : defDate.getDate();
        let defDateStr = _y + "-" + _m + "-" + _d;
        $('#date').val(defDateStr);
        return { 
            y: _y,
            m: _m, 
            d: _d
        };
    }
    function _getDate() {
        let dateString = $('#date').val();
        let dateSplited = dateString.split("-");
        return { y: +dateSplited[0], m: +dateSplited[1], d: +dateSplited[2] };
    }
    return {
        setDate: _setDate,
        getDate: _getDate
    }
}();

