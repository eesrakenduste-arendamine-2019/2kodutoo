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

function render(){
  console.log("Laadimine");
  $('#todos').html("");
  $.get('database.txt', function(data){
    let content = JSON.parse(data).content;

    content.forEach(function(todo, todoIndex){
      console.log(todoIndex);
      $('#todos').append('<ul id="' + todoIndex + '" ><li>'+ todo.title+'</li><li>'+ todo.description+'</li><li>'+todo.date+'</li><button class="deleteButton">KUSTUTA</button></ul>');
    });
  });
}

function removeEntry(){
  console.log("kustutamise funk");
  let row = $(this).parent();
  let index = parseInt(row.prop('id'));
  console.log(index);
}

function addEntry(){
  const titleValue = $('#title').val();
  const dateValue = $('#date').val();
  const descriptionValue = $('#description').val();

  var table = document.getElementById("table");
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  cell1.innerHTML = titleValue;
  cell2.innerHTML = descriptionValue;
  cell3.innerHTML = dateValue;
  cell4.innerHTML = "nupp";
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
