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
$('#saveButton').on('click', saveToFile);//()=>{saveToFile();saveToLocalStorage();});
$('#loadButton').on('click', render);
$('#todos').on('click', '.deleteButton', removeEntry);

function render(){
  $('#todos').html("");
  $.get('database.txt', function(data){
    let content = JSON.parse(data).content;

    content.forEach(function(todo, todoIndex){
      console.log(todoIndex);
      $('#todos').append('<ul id="' + todoIndex + '" ><li>'+ todo.title+'</li><li>'+ todo.description+'</li><li>'+todo.date+'</li><button class="deleteButton">KUSTUTA</button></ul>').css({
        "width":"20vw",
        "border":"3px solid black",
        "margin":"3px"
      });

    });
  });
}

function removeEntry(){
  console.log("kustutamise funk");
  let row = $(this).parent();
  let index = parseInt(row.prop('id'));
  let list = document.getElementById('todos');

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
function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}
/*function loadFromLocalStorage() {
    let content = localStorage.getItem('todos');
    if (items) {
        todos = arrayToTodoItems(JSON.parse(content));
        console.log(todos);
        render();
    }
}*/


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
