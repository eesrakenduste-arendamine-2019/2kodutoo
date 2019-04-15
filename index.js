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
$('#addButton').on('click', addEntry);
$('#saveButton').on('click', saveToFile);
$('#loadButton').on('click', render);
$('#todos').on('click', '.deleteButton', removeEntry);
window.onload = function(){
  render();
};

function render(){
  todos = [];
  $('#todos').html("");
  $.get('database.txt', function(data){
    let content = JSON.parse(data).content;

    content.forEach(function(todo, todoIndex){
      //console.log(todoIndex);
      $('#todos').append('<ul id="' + todoIndex + '" style="border:1px solid #000000;"><li>'+ todo.title+'</li><li>'+ todo.description+'</li><li>'+todo.date+'</li><button class="deleteButton">KUSTUTA</button></ul>')/*.css({
        "width":"20vw",
        "border":"3px solid black",
        "margin":"3px"
      })*/;

      todos.push(new Todo(todo.title, todo.description, todo.date));
    });
  });
  //saveToFile();
}

function removeEntry(){
  console.log("kustutamise funk");
  let row = $(this).parent();
  let index = parseInt(row.prop('id'));
  //let list = document.getElementById('todos');

  todos.splice(index, 1);
  saveToFile();
  render();
  console.log(index);
  console.log(todos);
}

function addEntry(){
  const titleValue = $('#title').val();
  const dateValue = $('#date').val();
  const descriptionValue = $('#description').val();

  todos.push(new Todo(titleValue, descriptionValue, dateValue));
  console.log(todos);
  saveToFile();
}

function markAsDone(){
  li.style.textDecoration = "line-through";
  li.style.backgroundColor = "lightgreen";
  todos.push(new Todo(titleValue, descriptionValue, dateValue));
}

function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function saveToFile(){
  console.log(todos);
  $.post('server.php', {save: todos}).done(function(){
    console.log('done');
  }).fail(function(){
    console.log('fail');
  })/*.always(function(){
    console.log('always');
  })*/;
}
