/*jshint esversion:6*/
function Todo(task, desc, dueDate) {
    this.task = task;
    this.desc = desc;
    this.dueDate = dueDate;
    this.done = false;
}

todos = [];

window.onload = init;

function init() {

    submitButton = document.getElementById("submit");
    DateButton = document.getElementById("sortByDate");
    NameButton = document.getElementById("sortByName");
    DateButton.onclick = sortByDate;
    NameButton.onclick = sortByName;
    submitButton.onclick = getFormData;

    $('#todoList').on('click', '#deleteButton', deleteTask);
    $('#todoList').on('click', '#doneButton', doneTask);
    $('#todoList').on('click', '#undoneButton', undoneTask);
    getTodoData();
}

function deleteTask(){ //Task-i kustutamis funktsioon
   for(let i = 0; i< todos.length; i++){
     if($(this).data('task') == todos[i].task && $(this).data('date') == todos[i].dueDate){
       todos.splice(i, 1);

     }
     localStorage.setItem('todos', JSON.stringify(todos));
   }
   saveTodoData();
   onClick="window.location.reload(true)";
   window.location.href = "todo.html";
}

function doneTask(){
   for(let i = 0; i< todos.length; i++){
     if($(this).data('task') == todos[i].task && $(this).data('date') == todos[i].dueDate){
       todos[i].done = true;
        if(todos[i].done == true){
          this.style.textDecoration = "line-through";
          this.style.backgroundColor = "green";

        } else {
          this.style.textDecoration = "none";
          this.doneButton.style.backgroundColor = "transparent";
        }
     }
     localStorage.setItem('todos', JSON.stringify(todos));
   }
   saveTodoData();
   //window.location.href = "todo.html";
}

function undoneTask(){
  for(let i = 0; i< todos.length; i++){
    if($(this).data('task') == todos[i].task && $(this).data('date') == todos[i].dueDate){
      todos[i].done = false;
    }
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  saveTodoData();
  window.location.href = "todo.html";
}


function sortByDate() { //Sorteeri kuupäeva järgi
  todos.sort(function(a,b){
    return new Date(b.dueDate) - new Date(a.dueDate);
});
    addTodosToPage();
}

function sortByName() { //Sorteeri nimi järgi
  todos.sort(compare);
  addTodosToPage();
}

function compare(a,b) {
  if (a.task < b.task)
    return -1;
  if (a.task > b.task)
    return 1;
  return 0;
}

function getTodoData() { //võtab andmed todo.json-i failist
    var request = new XMLHttpRequest();
    request.open("GET", "todo.json");
    request.onreadystatechange = function() {
        if (this.readyState == this.DONE && this.status == 200) {
            if (this.responseText) {
                parseTodoItems(this.responseText);
                addTodosToPage();
            }
            else {
                console.log("Error: Data is empty");
            }
        }
    };
    request.send();
}

function parseTodoItems(todoJSON) { //parsing
    if (todoJSON == null || todoJSON.trim() == "") {
        return;
    }
    todoArray = JSON.parse(todoJSON);
    if (todoArray.length == 0) {
        console.log("Error: the to-do list array is empty!");
        return;
    }
    for (var i = 0; i < todoArray.length; i++) {
        todoItem = todoArray[i];
        todos.push(todoItem);
    }
    localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodosToPage() { //paneb Task-i HTML-i sisse
    ul = document.getElementById("todoList");
    $("ul").html("");
    for (var i = 0; i < todos.length; i++) {
        todoItem = todos[i];
        li = document.createElement("li");
        li.innerHTML =
            "<hr><b>task: </b>" + todoItem.task + "<br><b> description: </b>" + todoItem.desc + "<br><b> by: </b>" + todoItem.dueDate + '<br><button id="deleteButton" data-task="'+todos[i].task + '" data-date="' + todos[i].dueDate + '" >Delete</button>' + '&nbsp;<button id = "doneButton" data-task="'+todos[i].task + '" data-date="' + todos[i].dueDate + '" >Mark as done</button>'+ '&nbsp;<button id = "undoneButton" data-task="'+todos[i].task + '" data-date="' + todos[i].dueDate + '" >Mark as undone</button>';
        ul.appendChild(li);
	}
}

function getFormData() { //Andmete võtmine form-ist
    task = document.getElementById("task").value;
    if (checkInputText(task, "Please enter a task")) return;

    desc = document.getElementById("desc").value;
    if (checkInputText(desc, "Please enter a description for the task")) return;

    date = document.getElementById("dueDate").value;
    if (checkInputText(date, "Please enter a due date")) return;

    console.log("New task: " + task + ", description: " + desc + ", by: " + date);

    todoItem = new Todo(task, desc, date);
    todos.push(todoItem);
    addTodosToPage();
    saveTodoData();
}

function checkInputText(value, msg) {
    if (value == null || value == "") {
        alert(msg);
        return true;
    }
    return false;
}



function saveTodoData() { //Andmete laadimine todo.json-i faili sisse
    todoJSON = JSON.stringify(todos);
    request = new XMLHttpRequest();
    URL = "save.php?data=" + encodeURI(todoJSON);
    request.open("GET", URL);
    request.setRequestHeader("Content-Type",
                             "text/plain;charset=UTF-8");
    request.send();
}