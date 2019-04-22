/*jshint esversion:6*/
class Todo{
  constructor(title, description, date, done = false, important = false){
    this.title = title;
    this.description = description;
    this.date = date;
    this.done = done;
    this.important = important;
  }
}
let todos = [];
$('#addButton').on('click', addEntry);
$('#saveButton').on('click', ()=>{saveToFile();saveToLocalStorage();});
$('#loadButton').on('click', loadFromFile);
$('#todos').on('click','ul' , function(){
  console.log(todos);
  todos[this.id].done = !todos[this.id].done;
  render();
});
$('#todos').on('click', '.deleteButton', removeEntry);

window.onload = function(){
  loadFromFile();
};


function render(){
  $('#todos').html("");
  todos.forEach(function(todo, todoIndex){
    console.log(todo);
    let className = '';
    if (todo.done){
      className = 'class="stroked"';
    } else if (todo.important) {
      className = 'class="important"';
    }
    $('#todos').append('<ul id="' + todoIndex + '" style="border:1px solid #000000;" '
     + className + ' ><li>'+"Pealkiri: "+ todo.title+'</li><li>'+"Sisu:"+ todo.description+'</li><li>'
     +"kuupäev: "+todo.date+'</li><button class="deleteButton">KUSTUTA</button><button class="doneButton" >TEHTUD</button></ul>');
  });
  console.log("render funkstioon tehtud");

}

function saveToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}


function removeEntry(){
  console.log("kustutamise funk");
  let row = $(this).parent();
  let index = parseInt(row.prop('id'));
  //let list = document.getElementById('todos');

  todos.splice(index, 1);
  saveToFile();
  //setTimeout(render(),1000);
  /*console.log(index);
  console.log(todos);*/
}


function addEntry(){
  const titleValue = $('#title').val();
  const dateValue = $('#date').val();
  const descriptionValue = $('#description').val();
  var important = false;

  if($('#important').is(':checked')){
    important = true;
  }
  todos.push(new Todo(titleValue, descriptionValue, dateValue, false, important));
  console.log(todos);
  render();
}


function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}


function loadFromFile() {
  todos = [];
  $.get('database.txt', function(data){
    let content = JSON.parse(data).content;
    content.forEach(function(todo, todoIndex){
      todos.push(new Todo(todo.title, todo.description, todo.date, todo.done, todo.important));
      render();
    });
  });
}

function saveToFile(){
  console.log(todos);
  $.post('server.php', {save: JSON.stringify(todos)}).done(function(){
    console.log('done');
  }).fail(function(){
    console.log('fail');
  }).always(function(){
    console.log('always');
  });
  setTimeout(render(),1000);
}
