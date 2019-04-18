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
  $('#right').html("");
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
  //$.get('database.txt', function(data){
  function printToDO(content){
    console.log(content);
    content.forEach(function(todo, todoIndex){

      if(todo.status == false || todo.status == 'false'){
        $('#todos').append('<ul id="'+todoIndex+'"><li>'+todo.title+'</li><li>'+todo.description+'</li><li>'+todo.date+'</li> <button onclick="deleteB('+todoIndex+');" id=delete'+(todoIndex+1)+'>KUSTUTA</button></ul>');
      } else if (todo.status == 'true') {
        $('#right').append('<ul id="'+todoIndex+'"><li>'+todo.title+'</li><li>'+todo.description+'</li><li>'+todo.date+'</li> <button onclick="deleteB('+todoIndex+');" id=delete'+(todoIndex+1)+'>KUSTUTA</button></ul>');
      }
      if(todo.done == true || todo.status == 'true'){
        $("#"+todoIndex+"").css("background-color","lightgreen");
      } else {
        $("#"+todoIndex+"").css("background-color","red");
      }
        $("li").css("display","inline-block");
        $("li").css("padding","5px");
  //  });
  });
}
}

function deleteB(todoIndex){
  todos.splice(todoIndex, 1);
  console.log(todos);
  console.log("test");
  localStorage.setItem('ToDoList', JSON.stringify(todos));
  //saveToFile();
  render();
}

function addEntry(){
  const titleValue = $('#title').val();
  const descriptionValue = $('#description').val();
  const dateValue = $('#date').val();
  todos.push(new Todo(titleValue, descriptionValue, dateValue));
  localStorage.setItem('ToDoList', JSON.stringify(todos));
}

function saveToFile(){
  $.post('server.php', {save: todos}).done(function(){
    alert("done");
  }).fail(function(){
    alert("failed");
  });
}
