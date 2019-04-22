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
$('#saveButton').on('click', ()=>{saveToFile();saveToLocalStorage();});
$('#loadButton').on('click', render);
$('#todos').on('click','ul' , function(){
  $(this).toggleClass('stroked');
  console.log(todos);
  todos[this.id].done = !todos[this.id].done;
  console.log("olen siin");
});
$('#todos').on('click', '.deleteButton', removeEntry);
window.onload = function(){
  render();
};

function render(){
  $('#todos').html("");
  todos = [];
  $.get('database.txt', function(data){
    let content = JSON.parse(data).content;
    content.forEach(function(todo, todoIndex){
      todos.push(new Todo(todo.title, todo.description, todo.date, todo.done));
      console.log(todo);
      //$('#todos').append('<ul id="' + todoIndex + '" style="border:1px solid #000000;"><li>'+ todo.title+'</li><li>'+ todo.description+'</li><li>'+todo.date+'</li><button class="deleteButton">KUSTUTA</button><button class="doneButton">TEHTUD</button></ul>');
    if(todo.done == true){
      $('#todos').append('<ul id="' + todoIndex + '" style="border:1px solid #000000;" class="stroked"><li>'+ todo.title+'</li><li>'+ todo.description+'</li><li>'+todo.date+'</li><button class="deleteButton">KUSTUTA</button><button class="doneButton">TEHTUD</button></ul>');
    } else {
      $('#todos').append('<ul id="' + todoIndex + '" style="border:1px solid #000000;"><li>'+ todo.title+'</li><li>'+ todo.description+'</li><li>'+todo.date+'</li><button class="deleteButton">KUSTUTA</button><button class="doneButton">TEHTUD</button></ul>');
    }
    });
    });

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
  render();
  console.log(index);
  console.log(todos);
}


function addEntry(){
  const titleValue = $('#title').val();
  const dateValue = $('#date').val();
  const descriptionValue = $('#description').val();
  todos.push(new Todo(titleValue, descriptionValue, dateValue));
  //render(todos);
  console.log(todos);
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
}
