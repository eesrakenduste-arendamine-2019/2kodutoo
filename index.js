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
$('#loadButton').on('click', ()=>render());

function render(){
  $('#todos').html("");
  $.get('database.txt', function(data){
    let content = JSON.parse(data).content;

    content.forEach(function(todo, todoIndex){
      console.log(todoIndex);
      $('#todos').append('<ul><li>'+ todo.task +'</li><li>'+ todo.date +'</li></ul>');
    });
  });
}

function addEntry(){
  const taskValue = $('#task').val();
  const dateValue = $('#date').val();

  todos.push(new Todo(taskValue, dateValue));

  console.log(todos);
}
  function saveToFile(){
    $.post('server.php', {save: todos}).done(function(){
      alert('done');
    }).fail(function(){
      alert('fail');
    }).always(function(){
      console.log('works');
    });
  }
