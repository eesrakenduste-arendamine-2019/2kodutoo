//jshint esversion:6

let todos = [];
let checked = false;
let idTask = 0;
let tasks = [];
let checkedtasks = [];
let knowncheckedtasks = [];
let items = [];
let item;

showTasks();
taskIfChecked();
$('#saveTask').on('click', saveThis);
$('#todos').on('click', '#deleteLink', deleteThis);

function saveThis() {
  let titleTask = $('#title').val();
  let descriptionTask = $('#description').val();
  let dateTask = $('#date').val();

  todos = getToDoObject();
  task = {
    id: idTask,
    title: titleTask,
    description: descriptionTask,
    date: dateTask
  };
  //tasks.push(new Task(id, titleTask, description, dateTask));
  idTask = idTask + 1;
  todos.push(task);
  localStorage.setItem('text', JSON.stringify(todos));
  window.location.href = "index.html";
  return idTask;
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
}

function showTasks() {

  item = localStorage.getItem("tasks");
  items = JSON.parse(item) || [];
  //let currentTodos = localStorage.getItem('text');
  todos = getToDoObject();
  //let check = $('<input type="checkbox" id="checked" onclick="checkedTask"')

  for (let i = 0; i < todos.length; i++) {
    $('#todos').append('<li id="'+ i +'">' + todos[i].title + " " + todos[i].description + " " + todos[i].date + " " +
    '<a href="#" id="deleteLink" data-title="' + todos[i].title +'" data-date="' +
    todos[i].date + '" data-description="'+ todos[i].description + '">Kustuta</a>' + '<input type="checkbox" id="checked'+ i +'" onclick="checkedTask('+ i +')"' + '</li>');
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

function checkedTask(liId) {
  checkedtasks = JSON.parse(localStorage.getItem("tasks")) || [];
  knowncheckedtasks = localStorage.getItem("tasks");
  if(document.getElementById('checked'+liId).checked){
    checked = true;
    $('#' + liId).css({'backgroundColor': 'red'});
	   if(knowncheckedtasks != null){
		}

  }
  else if(!document.getElementById('checked'+liId).checked){
    checked = false;
    $('#' + liId).css({'backgroundColor': 'white'});
    if(knowncheckedtasks != null){
		checkedtasks.splice(checkedtasks[liId].id, 1);
	}
  }

	checkedtask = {
		id: liId,
		isDone: checked
	};
  checkedtasks.push(checkedtask);

  localStorage.setItem("tasks", JSON.stringify(checkedtasks));
}

function taskIfChecked() {
  let items = [];
  let item;
  item = localStorage.getItem("tasks");
  items = JSON.parse(item) || [];
  if(item != null){
  for (let i = 0; i < items.length; i++) {
    if (items[i].isDone) {
      document.getElementById('checked'+items[i].id).checked = true;
      $('#' + items[i].id).css({'backgroundColor': 'red'});
    } else {
      document.getElementById('checked'+items[i].id).checked = false;
      $('#' + items[i].id).css({'backgroundColor': 'white'});
    }
  }
  }
}
