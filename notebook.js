/*jshint esversion:6*/

class Todo{
    constructor(task, date){
        this.task = task;
        this.date = date;
        this.done = false;
    }
}



let todos = [];

$('#addButton').on('click', ()=>addEntry());
$('#saveButton').on('click', ()=>saveToFile());
$('#loadButton').on('click', ()=>showTodos());
$('#delButton').on('click', ()=>del());

function showTodos() {
    $('#todos').html("");
    todos = getTodoObject();

    if (todos != "" && todos != null) {
        for (let i = 0; i < todos.length; i++) {
            $("#todos").append('<li>' + todos[i].task + '<br>' + todos[i].date + '</li>');
        }
    }
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

    window.location.href = "main.php";

    return false;
}

function saveToFile(){
    $.post('server.php', {save: todos}).done(function(){
        alert("Done!");
    }).fail(function(){
        alert("HAA-HAA!");
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
showTodos();
