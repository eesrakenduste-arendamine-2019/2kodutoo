/*jshint esversion:6*/

let todos = [];

$(document).ready(function(){
    render();
});

class Todo{
  constructor(title, date){
    this.title = title;
    this.date = date;
    this.done = false;
    this.status = false;
  }
}

$('#btn').on('click', ()=>addEntry());
$('#saveButton').on('click', ()=>saveToFile());
$('#loadButton').on('click', ()=>render());

function render(){
  $('#list').html("");
  if(localStorage.getItem("ToDoList") != null && localStorage.getItem("ToDoList") != undefined){
    var content = JSON.parse(localStorage.getItem("ToDoList"));
    console.log(content);
    todos = content;
    printToDO(content);
  } else {
    $.get('database.txt', function(data){
      console.log(data);
      var content = JSON.parse(data).content;
      console.log(content);
      todos = content;
      printToDO(content);
    });
  }
  function printToDO(content){
    console.log(content);
    content.forEach(function(todo, todoIndex){
      $('#list').append(`<li class="ui-body-inherit ui-li-static" id="li-${todoIndex}">${todo.title}<br>${todo.date}
                  <input id="box-${todoIndex}"
                      class="checkboxes" type="checkbox">
                      <button id="delete${todoIndex+1}" class="btn deleteBtn" onclick="deleteB(${todoIndex});"><i class="fa fa-trash"></i></button></li>`);
  });
}
}

function addEntry(){
  const titleValue = $('#input').val();
  const dateValue = $('#date').val();
  todos.push(new Todo(titleValue, dateValue));
  localStorage.setItem('ToDoList', JSON.stringify(todos));
}

function saveToFile(){
  console.log("Test");
    $.post('server.php', {save: todos}).done(function(){
      alert("done");
    }).fail(function(){
      alert("failed");
    });
  }

  function deleteB(id){
    todos.splice(id, 1);
    console.log(todos);
    console.log("test");
    localStorage.setItem('ToDoList', JSON.stringify(todos));
    //saveToFile();
    render();
  }
