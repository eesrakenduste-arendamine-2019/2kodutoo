/*jshint esversion:6*/
class Todo{
  constructor(title, description, date){
    this.title = title;
    this.description = description;
    this.date = date;
    this.done = false;
  }
}
class ToDo2{
  constructor() {
    this.entries = JSON.parse(window.localStorage.getItem('entries')) || [];   /*JSON.parse(window.localStorage.getItem('entries') et see ei kirjutaks entriese üle*/
    document.querySelector('#addButton').addEventListener('click', ()=>this.addEntry());
    this.render(this.entries); //kutsub välja
  }
}

let todos = [];
$('#addButton').on('click', addEntry);
$('#saveButton').on('click', ()=>{saveToFile();saveToLocalStorage();});
$('#loadButton').on('click', render);
$('#doneButton').on('click', markAsDone);

$('#todos').on('click', '.deleteButton', removeEntry);

function render(){
  $('#todos').html("");
  $.get('database.txt', function(data){
    let content = JSON.parse(data).content;

    content.forEach(function(todo, todoIndex){
      //console.log(todoIndex);
      $('#todos').append('<ul id="' + todoIndex + '" style="border:1px solid #000000;"><li>'+ todo.title+'</li><li>'+ todo.description+'</li><li>'+todo.date+'</li><button class="deleteButton">KUSTUTA</button><button class="doneButton">TEHTUD</button></ul>')/*.css({
        "width":"20vw",
        "border":"3px solid black",
        "margin":"3px"
      })*/;
    });
    });

}
function markAsDone(){
  li.style.textDecoration = "line-through";
  li.style.backgroundColor = "lightgreen";
  todos.push(new Todo(titleValue, descriptionValue, dateValue));
}

function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}


function removeEntry(){
  console.log("kustutamise funk");
  let row = $(this).parent();
  let index = parseInt(row.prop('id'));
  let list = document.getElementById('todos');

  list.splice(index, 1);
  render();
  console.log(index);
}

function addEntry(){
  const titleValue = $('#title').val();
  const dateValue = $('#date').val();
  const descriptionValue = $('#description').val();

  todos.push(new Todo(titleValue, descriptionValue, dateValue));
  console.log(todos);
}


function saveToFile(){
  console.log(todos);
  $.post('server.php', {save: todos}).done(function(){
    console.log('done');
  }).fail(function(){
    console.log('fail');
  }).always(function(){
    console.log('always');
  });
}
