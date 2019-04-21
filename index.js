//jshint esversion:6

let todos = [];

showTasks();
$('#saveTask').on('click', saveThis);
$('#todos').on('click', '#deleteLink', deleteThis);

function saveThis() {
  let titleTask = $('#title').val();
  let descriptionTask = $('#description').val();
  let dateTask = $('#date').val();

  todos = getToDoObject();
  task = {
    title: titleTask,
    description: descriptionTask,
    date: dateTask
  };

  todos.push(task);
  localStorage.setItem('text', JSON.stringify(todos));
  //window.location.href = "index.html";
  return false;
}

function deleteThis() {
  //let currentTask;
  todos = getToDoObject();
  localStorage.setItem('currentTask', $(this).data('title'));
  localStorage.setItem('currentDate', $(this).data('date'));
  localStorage.setItem('currentDesc', $(this).data('description'));
  let currentTask = localStorage.getItem('currentTask');
  let currentDate = localStorage.getItem('currentDate');
  let currentDesc = localStorage.getItem('currentDesc');


  for(let i = 0; i < todos.length; i++){
      /*localStorage.setItem('currentTask', todos[i]);
      currentTask = localStorage.getItem('currentTask');*/
    if (currentDate == todos[i].date && currentTask == todos[i].title && currentDesc == todos[i].description) {
        todos.splice(i, 1);
        localStorage.setItem('text', JSON.stringify(todos));
        break;
      }
  }
  window.location.href = "index.html";
  return false;
}

function showTasks() {
  //let currentTodos = localStorage.getItem('text');
  todos = getToDoObject();
  for (let i = 0; i < todos.length; i++) {
    $('#todos').append(todos[i].title + " " + todos[i].description + " " + todos[i].date + " " +
    '<a href="#" id="deleteLink" data-title="' + todos[i].title +'" data-date="' +
    todos[i].date + '" data-description="'+ todos[i].description + '">Kustuta</a>' + '<br>');
  }
}

function getToDoObject() {
  let currentTodos = localStorage.getItem('text');
  if(currentTodos != null){
    todos = JSON.parse(currentTodos);
  }
  else{
    todos = [];
  }
  return todos.sort(function(a, b) {
      return new Date(b.date) - new Date(a.date);
  });
}
