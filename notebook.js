/*jshint esversion:6*/

class Todo{
    constructor(task, date){
        this.task = task;
        this.date = date;
        this.done = false;
    }
}



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
            $("#todos").append('<li>' + todos[i].task + ' | ' + todos[i].date + '</li>');
        }
    }

}

function showTodosFromFile(){
    $('#todos').html("");
    $.get('data' + sessId + '.txt', function(data){
        let content = JSON.parse(data).content;

        content.forEach(function(todo, todoIndex){
            console.log(todoIndex);
            $("#todos").append('<li>' + todo.task + ' | ' + todo.date + '</li>');

        });
    });
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

function del(){
  $.post('server.php', {delete: todos}).done(function(){
      alert("Done!");
  }).fail(function(){
      alert("HAA-HAA!");
  });
}

//laetakse sisse kui leht tõmbab lahti
//todosFromFileToLocalstorage();
showTodos();
//saveToFile();
//showTodosFromFile();