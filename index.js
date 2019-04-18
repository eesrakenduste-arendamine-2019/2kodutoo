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

$('#addButton').on("click", ()=> addEntry());
$('#done').on("click", () => switchTab('#done'));
$('#notDone').on("click", () => switchTab('#notDone'));

let content;


window.onload = function(){
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

function changeStatus(taskID){
    $.post("server.php?function=swapStatus", {task_id:taskID});
    setTimeout(render(), 3000);
}


function render() {
    $('#displayTasks').html("");
    $.get("server.php?function=data", function (data) {
        content = JSON.parse(data).content;
        //console.log(content);
        content.forEach(function (todo) {
            //prepend on ette
            if ($('.notSelected').attr('id') == 'done') {
                if (todo.done == 0) {
                    $('#displayTasks').append('<div id="task'+todo.id+'" class="task"><h5>' + todo.title + '</h5><p class="taskDesc">' + todo.description + '</p><div class="taskDate">' + todo.date + '</div><img class="deleteTaskBtn" onclick="deleteTask(' + todo.id + ')" src=deleteIcon.svg><button id="taskDone" onclick="changeStatus(' + todo.id + ')">TEHTUD</button></div>');
                }
            } else {
                if (todo.done == 1) {
                    $('#displayTasks').append('<div id="task'+todo.id+'" class="task"><h5>' + todo.title + '</h5><p class="taskDesc">' + todo.description + '</p><div class="taskDate">' + todo.date + '</div><img class="deleteTaskBtn" onclick="deleteTask(' + todo.id + ')" src=deleteIcon.svg><button id="taskDone" onclick="changeStatus(' + todo.id + ')">TEGEMATA</button></div>');
                }
            }
            if(todo.importance == 1){ $('#task'+todo.id+'').addClass("important"); } else {$('#t'+todo.id+'').removeClass("important"); }
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
    const importValue = 1;
    
    todos.push(new Todo(titleValue,descriptionValue,dateValue,importValue));
    saveToFile();
    console.log(todos);    
    window.location.href = "index.html";
    return false;
}

function saveToFile(){
    let messageR = 0;
    todos.forEach(function(todo){
        if(todo.title != "" && todo.description != "" && todo.date != "" && todo.importance != ""){
            $.post("server.php?function=save", {title: todo.title, desc: todo.description, time: todo.date, importance: todo.importance}).done(function(){
                console.log("done");
            }).fail(function(){
                console.log("fail");
            });
        } else { messageR = 1;}});
        if(messageR == 0){
            $('#title').val("");
            $('#description').val("");
            $('#date').val("");
            $("#message").html("Salvestamine läks edukalt!");
        } else {
            $("#message").html("Palun täida kõik väljad ja kontrolli andmeid!");
        }
        
        setTimeout(render(), 3000);
        
    }

 function deleteTask(taskID) {
     let conf = confirm('Kas oled kindel, et tahad ülesannet kustutada?');
     if (conf == true) {
         console.log(taskID);
         $.post("server.php?function=deleteTask", {
             delete_id: taskID
         });
         window.location.href = "index.html";
     } else {
         return;
     }
 }