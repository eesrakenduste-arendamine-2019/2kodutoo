/*jshint esversion:6*/
class Todo{
    constructor(title, description, date){
        this.title = title;
        this.description = description;
        this.date = date;
        this.done = false;
    }
}
let todos = [];
let test = [];

$('#todos').on('tap', '#deleteTaskBtn', deleteTask);

$('#addButton').on("click", ()=> addEntry());
$('#loadButton').on("click", ()=> render());
let content;

/*function render(){
    $('#todos').html("");
    $.get("database.txt", function(data){
        content = JSON.parse(data).content;

        content.forEach(function(todo, todoIndex){
            //prepend on ette
            $('#todos').append('<ul><li>'+todoIndex+'</li><li>'+todo.title+'</li><li>'+todo.description+'</li><li>'+todo.date+'</li><div class="delete-task-button">×</div></ul>');
            saveInLocalStorage();
         });

    });
}*/

window.onload = function(){
    render();
};



function render(){
    $('#displayTasks').html("");
    $.ajax({
        url: "loaddata.php",
        type: 'GET',
        success: function(res) {
            content = JSON.parse(res).content;
            //console.log(content);
            content.forEach(function(todo){
                //prepend on ette
                $('#displayTasks').append('<div class="task"><h5>'+todo.title+'</h5><p class="taskDesc">'+todo.description+'</p><div class="taskDate">'+todo.date+'</div><img class="deleteTaskBtn" src=deleteIcon.svg></div>');
                saveInLocalStorage();
             });
        }
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

    todos.push(new Todo(titleValue,descriptionValue,dateValue));
    saveToFile();
    console.log(todos);    
}

function deleteTask() {
    localStorage.setItem('#title', $(this).data('#title'));
    localStorage.setItem('#description', $(this).data('#description'));
    localStorage.setItem('#date', $(this).data('#date'));

    let currentTitle = localStorage.getItem('#title');
    let currentDescription = localStorage.getItem('#descripton');
    let currentDate = localStorage.getItem('#date');

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].title == currentTitle && todos[i].date == currentDate && todos[i].description == currentDescription) {
            todos.splice(i, 1);
        }
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    alert("Ülesanne kustutatud!");

    window.location.href = "index.html";
    return false;
}

function saveToFile(){
    let messageR = 0;
    todos.forEach(function(todo){
        if(todo.title != "" && todo.description != "" && todo.date != ""){
        $.post("server.php", {title: todo.title, desc:todo.description, time: todo.date}).done(function(){
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
/*     $.ajax({
        url: "server.php",
        cache: false,
        type: 'GET',
        success: function(res) {
            console.log(res);
            if(res == "korras"){
                $('#title').val("");
                $('#description').val("");
                $('#date').val("");
                $("#message").html("Salvestamine läks edukalt!");
            } else {
                $("#message").html("Palun täida kõik väljad ja kontrolli andmeid!");
                
            }
        } 
    });*/
    render();
    
    /*$.post("server.php", {save: todos}).done(function(){
        //$.post("server.php", {save: todos});
        console.log("done");
    }).fail(function(){
        console.log("fail");
    }).always(function(){
        console.log("always");
        
    });*/
}