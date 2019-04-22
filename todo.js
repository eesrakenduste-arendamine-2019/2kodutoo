let events = [];
let eventDiv;
let onlyUnDone = false;
let onlySpecDay = false;
let sortDate;

class Entry{
    constructor(date, name, eventText){
        this.date = date;
        this.name = name;
        this.eventText = eventText;
        this.done = false;
    }
}

function addNewEvent () {
    let date = $("#date").val();
    let name = $("#eventName").val();
    let eventT = $("#event").val();
    if (date != "" && name != "" && eventT != "") {
        events.push(new Entry(date, name, eventT));
        getEvents();
        saveLocal();
        showCalender();
    }
	let animButton = $("#addButton");
    animButton.animate({width: '300px', height: '55px'}, 100);
    animButton.animate({width: '100px', height: '50px'}, 200);
}

function getEvents () {
    $("#showEventsTable tr:not(:first)").remove();
    let tableString = "";
    for (let i = 0; i < events.length; i++) {
        if (onlySpecDay) {
            if (events[i].date == sortDate) {
                if (events[i].done && !onlyUnDone) {
                    tableString += "<tr>";
                    tableString += "<td>" + events[i].date + "</td>";
                    tableString += "<td>" + events[i].name + "</td>";
                    tableString += "<td>" + events[i].eventText + "</td>";
                    tableString += "<td>" + "<input type='checkbox' onclick='changeToUndone(" + (i).toString() + ")' checked>" + "</td>";
                    tableString += '<td>' + '<button id="del" onclick="deleteRow(' + (i).toString() + ')">Delete</button>' + '</td>';
                    tableString += "</tr>";
                } else if (!events[i].done) {
                    tableString += "<tr>";
                    tableString += "<td>" + events[i].date + "</td>";
                    tableString += "<td>" + events[i].name + "</td>";
                    tableString += "<td>" + events[i].eventText + "</td>";
                    tableString += "<td>" + "<input type='checkbox' onclick='changeToDone(" + (i).toString() + ")'>" + "</td>";
                    tableString += '<td>' + "<button onclick='deleteRow(" + (i).toString() + ")'>Delete</button>" + "</td>";
                    tableString += "</tr>";
                }
            }
        } else {
            if (events[i].done && !onlyUnDone) {
                tableString += "<tr>";
                tableString += "<td>" + events[i].date + "</td>";
                tableString += "<td>" + events[i].name + "</td>";
                tableString += "<td>" + events[i].eventText + "</td>";
                tableString += "<td>" + "<input type='checkbox' onclick='changeToUndone(" + (i).toString() + ")' checked>" + "</td>";
                tableString += '<td>' + "<button onclick='deleteRow(" + (i).toString() + ")'>Delete</button>" + "</td>";
                tableString += "</tr>";
            } else if (!events[i].done) {
                tableString += "<tr>";
                tableString += "<td>" + events[i].date + "</td>";
                tableString += "<td>" + events[i].name + "</td>";
                tableString += "<td>" + events[i].eventText + "</td>";
                tableString += "<td>" + "<input type='checkbox' onclick='changeToDone(" + (i).toString() + ")'>" + "</td>";
                tableString += '<td>' + "<button onclick='deleteRow(" + (i).toString() + ")'>Delete</button>" + "</td>";
                tableString += "</tr>";
            }
        }
    }
    eventDiv.append($(tableString));
}

function deleteRow (row) {
    events.splice(row, 1);
    getEvents();
    showCalender();
    saveLocal();
}

function changeToDone (row) {
    events[row].done = true;
    saveLocal();
}

function changeToUndone (row) {
    events[row].done = false;
    saveLocal();
}

function loadLocal () {
    let localValue = localStorage.getItem('events');
    if  (localValue) {
        events = JSON.parse(localStorage.getItem("events"));
    }
}

function saveLocal (){
    //localStorage.clear();
    localStorage.setItem('events', JSON.stringify(events));
}

function sortAlphabetically () {
    events.sort(function(a, b){
        if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
        if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
        return 0;
    })
}

function sortByDate () {
    events.sort(function(a, b){
        if(a.date < b.date) { return -1; }
        if(a.date > b.date) { return 1; }
        return 0;
    })
}

function showOnlyByDate (day, month, year) {
    let addNull = "";
    let addNull2 = "";
    onlySpecDay = true;
    if (day.toString().length == 1) {
        addNull = "0";
    }
    if (month.toString().length == 1) {
        addNull2 = "0";
    }
    sortDate = year.toString() + "-" + addNull2 + month.toString() + "-" + addNull + day.toString();
    getEvents();
    console.log(year.toString() + "-" + addNull2 + month.toString() + "-" + addNull + day.toString());
}

function changeSorting () {
    if ($("#sort").val() == "name") {
        onlyUnDone = false;
        onlySpecDay = false;
        sortAlphabetically();
        getEvents();
    } else if ($("#sort").val() == "date") {
        onlySpecDay = false;
        onlyUnDone = false;
        sortByDate();
        getEvents();
    } else if ($("#sort").val() == "todo") {
        onlyUnDone = true;
        getEvents();
    }
}
