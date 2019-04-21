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
  //$.get('database.txt', function(data){
  function printToDO(content){
    console.log(content);
    content.forEach(function(todo, todoIndex){
      $('#list').append(`<li id="li-${todoIndex}">${todo.title}
                  <input id="delete${todoIndex+1}"
                      class="checkboxes" type="checkbox">
                      <button id="delete${todoIndex+1}" class="btn deleteBtn" onclick="deleteB(${todoIndex});"><i class="fa fa-trash"></i></button></li>`);
                      /*
      if(todo.status == false || todo.status == 'false'){
        $('#list').append('<ul id="'+todoIndex+'"><li>'+todo.title+'</li><li>'+todo.description+'</li><li>'+todo.date+'</li> <button onclick="deleteB('+todoIndex+');" id=delete'+(todoIndex+1)+'>KUSTUTA</button></ul>');
      } else if (todo.status == 'true') {
        $('#list').append('<ul id="'+todoIndex+'"><li>'+todo.title+'</li><li>'+todo.description+'</li><li>'+todo.date+'</li> <button onclick="deleteB('+todoIndex+');" id=delete'+(todoIndex+1)+'>KUSTUTA</button></ul>');
      }
      if(todo.done == true || todo.status == 'true'){
        $("#"+todoIndex+"").css("background-color","lightgreen");
      } else {
        $("#"+todoIndex+"").css("background-color","red");
      }
        $("li").css("display","inline-block");
        $("li").css("padding","5px");*/
  //  });
  });
}
}

/*window.onload = function() {
    var form = document.getElementById("form");
    var input = document.getElementById("input");
    var btn = document.getElementById("btn");
    var list = document.getElementById("list");
    var id = 1;


    btn.addEventListener("click", addToDoItem);

    list.addEventListener("click", boxChecked);


    function addToDoItem(){
        if(input.value === ""){
            alert("Sisesta sisu!");
        }else{
            if(list.style.borderTop === ""){
                list.style.borderTop ==="2px solid white";
            }
            var text = input.value;
            var item = `<li id="li-${id}">${text}
                        <input id="box-${id}"
                            class="checkboxes" type="checkbox">
                            <button class="btn deleteBtn"><i class="fa fa-trash"></i></button></li>`;
            list.insertAdjacentHTML('beforeend', item);
            id++;
            form.reset();
        }
    }

    function boxChecked(event){
        const element = event.target;
        if(element.type === "checkbox"){
            element.parentNode.style.textDecoration = "line-through";
        }else{
            element.parentNode.style.textDecoration = "none";
        }
    }


}*/

//$('#saveButton').on('click', ()=>saveToFile());

function addEntry(){
  const titleValue = $('#input').val();
  const dateValue = $('#date').val();
  todos.push(new Todo(titleValue, dateValue));
  localStorage.setItem('ToDoList', JSON.stringify(todos));
}

function saveToFile(){
  console.log("Test");
    $.post('server.php', {save: todos}).done(function(){
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
