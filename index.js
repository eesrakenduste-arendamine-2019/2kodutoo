/*jshint esversion:6*/
let addButton;
let loadButton;

window.onload = function(){
  init();
};
function init(){
  pealkiri = document.getElementById('150');

  addButton = document.getElementById('150');
  loadButton = document.getElementById('150');

  loadButton.addEventListener('click', loadFromLocalStorage);
}

function loadFromLocalStorage(){
  const localValue = JSON.stringify(localStorage);
  if(localValue){
    let div = document.createElement('div');
    div.innerHTML = localValue;
    console.log(localValue);

    document.body.appendChild(div);
  } else{
    console.log("ERROR 404");
  }
}


function myFunction(divObj ) {
   //divObj.style.background="";
	//var x = document.getElementsByClassName("ui-body-inherit ui-li-static");
    if (divObj.style.background === 'white') {
        divObj.style.background = '#90EE90';
    } else {
        divObj.style.background = 'white';
    }
	localStorage.setItem("color", divObj.style.background);

  }

$(document).one('pageinit', function(){
  let todos;
  showTodos();

  $('#submitAdd').on('tap', addTask);
  $('#todos').on('tap', '#editLink', setCurrent);
  $('#submitEdit').on('tap', editTask);
  $('#todos').on('tap', '#deleteLink', deleteTask);



  $('.date').each(function(){
    $(this).datepicker();
  });


  function deleteTask(){
    localStorage.setItem('currentTask', $(this).data('task'));
    localStorage.setItem('currentDate', $(this).data('date'));

    let currentTask = localStorage.getItem('currentTask');
    let currentDate = localStorage.getItem('currentDate');

    todos = getTodoObject();

    for(let i = 0;i<todos.length;i++){
      if(todos[i].task == currentTask && todos[i].date == currentDate){
        todos.splice(i, 1);
      }
      localStorage.setItem('todos',JSON.stringify(todos));
    }

    alert("Ülesanne kustatud");
    window.location.href="index.html";
  }

function setCurrent(){
  localStorage.setItem('currentTask', $(this).data('task'));
  localStorage.setItem('currentDate', $(this).data('date'));

  $('#editTask').val(localStorage.getItem('currentTask'));
  $('#editDate').val(localStorage.getItem('currentDate'));
}

function editTask(){
  let currentTask = localStorage.getItem('currentTask');
  let currentDate = localStorage.getItem('currentDate');

  todos = getTodoObject();

  for(let i = 0;i<todos.length;i++){
    if(todos[i].task == currentTask && todos[i].date == currentDate){
      todos.splice(i, 1);
    }
    localStorage.setItem('todos',JSON.stringify(todos));
  }

  let task = $('#editTask').val();
  let date = $('#editDate').val();

  let update_todo = {
    task: task,
    date: date
  };
  todos.push(update_todo);
  alert("Ülesanne muudetud");
  localStorage.setItem('todos',JSON.stringify(todos));

  window.location.href="index.html";
  return false;
}

function addTask(){
  let task = $('#addTask').val();
  let date = $('#addDate').val();

  let todo = {
    task: task,
    date: date
  };

  todos = getTodoObject();
  todos.push(todo);

  localStorage.setItem('todos', JSON.stringify(todos));

  window.location.href="index.html";

  return false;
}
function getTodoObject(){
  let currentTodos = localStorage.getItem('todos');

  if(currentTodos != null){
    todos = JSON.parse(currentTodos);
  } else{
    todos = [];
  }

  return todos.sort(function(a, b){
    return new Date(b.date) - new Date(a.date);
  });

}

function showTodos(){
  todos = getTodoObject();
  if(todos != "" && todos != null){
    for(let i = 0;i < todos.length; i++){
        $('#todos').append('<li class="ui-body-inherit ui-li-static" onclick=myFunction(this)>'+ todos[i].task+ '<br>'+ todos[i].date +'<div class="controls"><a href="#edit" id="editLink" data-task="'+todos[i].task + '" data-date="' + todos[i].date + '">Muuda|</a><a href="#" id="deleteLink" data-task="'+todos[i].task + '" data-date="' + todos[i].date + '" onclick="return confirm(\'Kas oled kindel, et tahad ülesannet kustutada?\')">Kustuta</a></div></li>');
	}
  }
  $('#home').on('pageinit', function(){
    $('#todos').listview('refresh');
  });
}

function sortUnorderedList(ul, sortDescending) {
  if(typeof ul == "string")
    ul = document.getElementById(ul);
    var lis = ul.getElementsByTagName("LI");
    var vals = [];
    for(var i = 0, l = lis.length; i < l; i++)
      vals.push(lis[i].innerHTML);
      vals.sort();
  if(sortDescending)
    vals.reverse();
    for(var i = 0, l = lis.length; i < l; i++)
      lis[i].innerHTML = vals[i];
  }
  window.onload = function() {
    var desc = false;
    document.getElementById("sortByName").onclick = function() {
      sortUnorderedList("todos", desc);
      desc = !desc;
      return false;
  };
  };

  
});
