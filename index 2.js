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
      console.log(todo.status);
      $('#new_div').append(`<li class="ui-body-inherit ui-li-static" id="li-${todoIndex}">${todo.title}<br>${todo.date}
                  <input id="${todoIndex}" class="checkboxes" type="checkbox">
                  <button id="delete${todoIndex+1}" class="btn deleteBtn" onclick="deleteB(${todoIndex});"><i class="fa fa-trash"></i></button></li>`);
     if(todo.done == true){
       $('#li-'+todoIndex).css('color', 'green').css('text-decoration', 'line-through');
       $('#'+todoIndex).prop('checked', true);
     }
     if(new Date().getTime() >= new Date(todo.date).getTime() && todo.done == false)
            {
              $('#li-'+todoIndex).css('color', 'orange');
            }
  });
  $('#new_div').appendTo('#list').show(1000);
  $('input[type=checkbox]').click(function(id){
      if($(this).prop("checked") == true){
          $("#li-"+this.id).css('color', 'green').css('text-decoration', 'line-through');
          todos[this.id].done = true;
          localStorage.setItem('ToDoList', JSON.stringify(todos));
      }
      else if($(this).prop("checked") == false){
          $("#li-"+this.id).css('color', 'white').css('text-decoration', '');
          todos[this.id].done = false;
          localStorage.setItem('ToDoList', JSON.stringify(todos));
      }
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
    $.post('server 2.php', {save: todos}).done(function(){
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
