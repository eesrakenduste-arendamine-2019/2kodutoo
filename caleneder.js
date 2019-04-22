let table;
let date = new Date();

$( document ).ready(function() {
    table = $("#tableTest").find('table');
    eventDiv = $("#showEventsTable").find('table');
    loadLocal();
    getEvents();
    let month = "";
    let monthString = (date.getMonth()+1).toString();
    if (monthString.length == 1) {
        month = "0" + monthString;
    } else {
        month = monthString;
    }
    $("#submitC").val(date.getFullYear().toString() + "-" + month);
    showCalender();
});

function createCalender (daysInMonth, firstWeekDay, year, month) {
    let dayCount = 1;
    let tableString = "";

    $("#tableTest tr:not(:first)").remove();
    //$("#tableTest tr").remove();

    for (let i = 0; i < 5; i++) {
        tableString += "<tr>";
        for (let j = 0; j < 7; j++) {
            if (dayCount <= daysInMonth && (j+1 >= firstWeekDay || i > 0)) {
                let found = false;
                for (let k = 0; k < events.length; k++) {
                    let d = events[k].date.split('-');
                    if (d[2].substring(0, 1) == "0") {
                        d[2] = d[2].substring(1, 2);
                    }
                    if (d[0] == year && d[1] == month && d[2] == dayCount.toString()) {
                        tableString += "<td style='color: red;'>" + dayCount.toString() + "</td>";
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    tableString += "<td>" + dayCount.toString() + "</td>";
                }
                dayCount ++;
            } else {
                tableString += "<td></td>";
            }
        }
        tableString += "</tr>";
    }
    table.append($(tableString));
}

function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

function getMonthFirstDay (month, year) {
    return new Date(year, month, 1).getDay();
}

function showCalender () {
    let date = document.getElementById("submitC").value;
    let d = date.split('-');
    console.log(parseInt(d[0]));
    createCalender(daysInMonth(parseInt(d[1]), parseInt(d[0])), getMonthFirstDay(parseInt(d[1])-1, parseInt(d[0])), d[0], d[1]);
}
