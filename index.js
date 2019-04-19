/*jshint esversion:6*/
class Todo{
    constructor(title, description, date, importance){
        this.title = title;
        this.description = description;
        this.date = date;
        this.importance = importance;
        this.done = false;
    }
}
let todos = [];
let sortValue = "none";

$('#addButton').on("click", ()=> addEntry());
$('#done').on("click", () => switchTab('#done'));
$('#notDone').on("click", () => switchTab('#notDone'));

let content;


window.onload = function(){
    document.querySelector("#displayTasks").style.opacity = "0";
    render();
};

function switchTab(clickedTab) {
    if ($(clickedTab).hasClass('notSelected')) {
        $(clickedTab).removeClass('notSelected');
        
        if ($(clickedTab).is('#done')) {
            $('#notDone').addClass('notSelected');
            render();
        } else {
            $('#done').addClass('notSelected');
            render();
        }
    }
}
function changeStatus(taskID, act){
    $.post("server.php?function=swapStatus", {task_id:taskID, action:act}).done(function(){ setTimeout(render(), 200); });
}

function render() {
    sortValue = $('#sort').val();
    document.querySelector("#displayTasks").style.opacity = "0";
     $( "#displayTasks" ).animate({
        width: "104%",
        marginLeft: "-0.15in",
      }, 500 ); 
    $('#displayTasks').html("");
    $.get("server.php?function=data&sort="+ sortValue, function (data) {
        
        content = JSON.parse(data).content;
        $( "#displayTasks" ).animate({
            width: "100%",
            opacity: 1,
            marginLeft: "0in",
          }, 500 );
        content.forEach(function (todo) {
            //prepend on ette
            if ($('.notSelected').attr('id') == 'done') {
                if (todo.done == 0) {
                    $('#displayTasks').append('<div id="task'+todo.id+'" class="task"><h5>' + todo.title + '</h5><p class="taskDesc">' + todo.description + '</p><div class="taskDate">' + todo.date + '</div><img class="deleteTaskBtn" onclick="deleteTask(' + todo.id + ')" src=img/deleteIcon.svg><img class="taskDone" onclick="changeStatus(' + todo.id + ',1)" src=img/undone.svg></div>');
                }
            } else {
                if (todo.done == 1) {
                    $('#displayTasks').append('<div id="task'+todo.id+'" class="task"><h5>' + todo.title + '</h5><p class="taskDesc">' + todo.description + '</p><div class="taskDate">' + todo.date + '</div><img class="deleteTaskBtn" onclick="deleteTask(' + todo.id + ')" src=img/deleteIcon.svg><img class="taskDone" onclick="changeStatus(' + todo.id + ',0)" src=img/done.svg></div>');
                }
            }
            if(todo.importance == 1){ 
                $('#task'+todo.id+'').addClass("important bouncy"); 
                $('#task'+todo.id+'').append('<img class="importantPin" onclick="changeStatus(' + todo.id + ',3)" src=img/pin.svg></img>');
            }
            saveInLocalStorage();
        });
    });
}

function saveInLocalStorage(){
    window.localStorage.setItem('content', JSON.stringify(content));
}

function addEntry(){
    todos = [];
    const titleValue = $('#title').val();
    const descriptionValue = $('#description').val();
    const dateValue = $('#date').val();
    let importValue;
    if($("#importantCheck").is(':checked')){
        importValue = 1;
    } else {
        importValue = 0;
    }
    console.log(importValue);
    
    
    todos.push(new Todo(titleValue,descriptionValue,dateValue,importValue));
    saveToFile();
    //console.log(todos);    
    return false;
}

function saveToFile(){
    let messageR = 0;
    todos.forEach(function(todo){
        if(todo.title != "" && todo.description != "" && todo.date != ""){
            $.post("server.php?function=save", {title: todo.title, desc: todo.description, time: todo.date, importance: todo.importance}).done(function(){ setTimeout(render(), 200); });
        } else { messageR = 1;}});
        if(messageR == 0){
            $('#title').val("");
            $('#description').val("");
            $('#date').val("");
            $("#message").html("Salvestamine läks edukalt!");
        } else {
            $("#message").html("Palun täida kõik väljad ja kontrolli andmeid!");
        }
        
    }

 function deleteTask(taskID) {
     let conf = confirm('Kas oled kindel, et tahad ülesannet kustutada?');
     if (conf == true) {
         console.log(taskID);
         $.post("server.php?function=deleteTask", {
             delete_id: taskID
         }).done(function(){ setTimeout(render(), 200); });
     } else {
         return;
     }
 }

 