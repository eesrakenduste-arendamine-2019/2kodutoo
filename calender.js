let table;
let date = new Date();
let currentMonth;
let currentYear;
let mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

$( document ).ready(function() {
    table = $("#tableTest").find('table');
    eventDiv = $("#showEventsTable").find('table');
    loadLocal();
    sortByDate();
    getEvents();
    let month = "";
    currentMonth = date.getMonth();
    currentYear = date.getFullYear();
    let monthString = (date.getMonth()+1).toString();
    if (monthString.length == 1) {
        month = "0" + monthString;
    } else {
        month = monthString;
    }
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
                    if (parseInt(d[0]) == year && parseInt(d[1]) == month && parseInt(d[2]) == dayCount) {
                        tableString += "<td onclick='showOnlyByDate(" + dayCount.toString() + ", " + month.toString() + ", " + year.toString() + ");' style='color: red;'><a href='#' style='color: red;'>" + dayCount.toString() + "</a></td>";
                        console.log("fff");
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
    createCalender(daysInMonth(currentMonth+1, currentYear), getMonthFirstDay(currentMonth, currentYear), currentYear, currentMonth+1);
    $("#monthName").text(mL[currentMonth] + " " + currentYear.toString());
}

function nextMonth() {
    if (currentMonth == 11) {
        currentMonth = 0;
        currentYear ++;
    } else {
        currentMonth ++;
    }
    showCalender();
}

function previousMonth() {
    if (currentMonth == 0) {
        currentMonth = 11;
        currentYear --;
    } else {
        currentMonth --;
    }
    showCalender();
}
