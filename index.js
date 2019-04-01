/*jshint esversion:6*/
let todos = [];

$(document).ready(function(){
    render();
});

class Todo{
  constructor(title, description, date){
    this.title = title;
    this.description = description;
    this.date = date;
    this.done = false;
    this.status = false;
  }
}


$('#addButton').on('click', ()=>addEntry());
$('#saveButton').on('click', ()=>saveToFile());
$('#loadButton').on('click', ()=>render());

function render(){
  $('#todos').html("");
  $.get('database.txt', function(data){
    let content = JSON.parse(data).content;
    todos = content;
    localStorage.setItem('ToDoList', JSON.stringify(todos));
    console.log(todos);
    content.forEach(function(todo, todoIndex){
      $('#todos').append('<ul><li>'+todo.title+'</li><li>'+todo.description+'</li><li>'+todo.date+'</li></ul>');
      if(!todo.status){
        ul.style.backgroundColor = "red";
      }
    });
  });
}

function addEntry(){
  const titleValue = $('#title').val();
  const descriptionValue = $('#description').val();
  const dateValue = $('#date').val();
  todos.push(new Todo(titleValue, descriptionValue, dateValue));

  console.log(todos);
}

function saveToFile(){
  $.post('server.php', {save: todos}).done(function(){
    alert("done");
  }).fail(function(){
    alert("failed");
  });
}
