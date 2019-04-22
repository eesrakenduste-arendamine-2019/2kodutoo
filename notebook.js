/*jshint esversion:6*/

class Todo{
    constructor(task, date){
        this.task = task;
        this.date = date;
        this.done = false;

    }
}


$('#todos').on('click', '#deleteLink', deleteTask);
//let todos = JSON.parse(localStorage.getItem('todos')) || [];
let todos = [];

$('#addButton').on('click', ()=>addEntry());
$('#saveButton').on('click', ()=>saveToFile());
$('#loadButton').on('click', ()=>showTodosFromFile());

function showTodos() {
    $('#todos').html("");
    todos = getTodoObject();

    if (todos != "" && todos != null) {
        for (let i = 0; i < todos.length; i++) {
        $("#todos").append('<li class="ui-body-inherit ui-li-static">'+ todos[i].task +'<br>'+ todos[i].date +' <a href="#" id="deleteLink" data-task="'+todos[i].task+'" data-date="'+ todos[i].date +'">Kustuta</a></div></li>');
        }
    }

}

function showTodosFromFile(){
    $('#todos').html("");
    $.get('data' + sessId + '.txt', function(data){
        let content = JSON.parse(data).content;
        console.log(content);

        content.forEach(function(todo, todoIndex){
            console.log(todoIndex);
            $("#todos").append('<li class="ui-body-inherit ui-li-static">'+ todos[i].task +'<br>'+ todos[i].date +' <a href="#" id="deleteLink" data-task="'+todos[i].task+'" data-date="'+ todos[i].date +'">Kustuta</a></div></li>');


        });
    });
}

function deleteTask(){
    localStorage.setItem('currentTask', $(this).data('task'));
    localStorage.setItem('currentDate', $(this).data('date'));
    console.log($(this).data('date'));

    let currentTask = localStorage.getItem('currentTask');
    let currentDate = localStorage.getItem('currentDate');
    console.log(todos);
    console.log(currentTask);
    console.log(currentDate);
    for(let i = 0; i < todos.length; i++){
      if(todos[i].task == currentTask && todos[i].date == currentDate){
        todos.splice(i, 1);
        console.log("test");
      }
      localStorage.setItem('todos', JSON.stringify(todos));
    }

    alert("Ülesanne kustutatud!");

    window.location.href = "main.php";

    saveToFile();

    return false;
  }

function todosFromFileToLocalstorage(){
    $.get('data' + sessId + '.txt', function(data){
        let content = data;
        localStorage.todos = content;
    });

    return false;
}

function getTodoObject() {
    let currentTodos = localStorage.getItem('todos');

    if (currentTodos != null) {
        todos = JSON.parse(currentTodos);
    } else {
        todos = [];
    }

    return todos;
}

function addEntry(){
    const taskValue = $('#task').val();
    const dateValue = $('#date').val();

    todos.push(new Todo(taskValue, dateValue));
    console.log(todos);

    localStorage.setItem('todos', JSON.stringify(todos));

    showTodos();
    //window.location.href = "main.php";

    return false;
}

function saveToFile(){
    $.post('server.php', {save: todos}).done(function(){
        console.log("Done!");
    }).fail(function(){
        console.log("HAA-HAA!");
    });
}

function done(){

}


//laetakse sisse kui leht tõmbab lahti
//todosFromFileToLocalstorage();
showTodos();
//saveToFile();
//showTodosFromFile();
