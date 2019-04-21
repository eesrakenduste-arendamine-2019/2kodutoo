let events = [];
let eventDiv;

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
}

function getEvents () {
    $("#showEventsTable tr:not(:first)").remove();
    let tableString = "";
    for (let i = 0; i < events.length; i++) {
        tableString += "<tr>";
        tableString += "<td>" + (i+1).toString() + "</td>";
        tableString += "<td>" + events[i].date + "</td>";
        tableString += "<td>" + events[i].name + "</td>";
        tableString += "<td>" + events[i].eventText + "</td>";
        if (events[i].done == true) {
            tableString += "<td>" + "<input type='checkbox' onclick='changeToUndone(" + (i).toString() + ")' checked>" + "</td>";
        } else {
            tableString += "<td>" + "<input type='checkbox' onclick='changeToDone(" + (i).toString() + ")'>" + "</td>";
        }
        tableString += '<td>' + "<button onclick='deleteRow(" + (i).toString() + ")'>Delete</button>" + "</td>";
        tableString += "</tr>";
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
