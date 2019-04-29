/*jshint esversion: 6*/
$(document).one('pageinit', function(){
  let todos;
  showTodos();
  $('#submitAdd').on('tap', addTask);
  $('#todos').on('tap', '#editLink', setCurrent);
  $('#submitEdit').on('tap', editTask);
  $('#todos').on('tap', '#doneTask', taskDone);
  $('#todos').on('tap', '#deleteLink', deleteTask);



  $('#flip-2').on('change', function() {
    setTheme();
  });

  let whichTheme = true;


  $(function(){
    $('.date').each(function(){
      $(this).datepicker();
    });
  });






function setTheme(){
      if (whichTheme){
          $("div").removeClass("ui-bar-b");
          $("div").addClass("ui-bar-a");
          $("header").removeClass("ui-bar-b");
          $("footer").removeClass("ui-bar-b");
          $("header").addClass("ui-bar-a");
          $("footer").addClass("ui-bar-a");

          whichTheme = !whichTheme;
      }
      else {
          $("div").removeClass("ui-bar-a");
          $("div").addClass("ui-bar-b");
          $("header").removeClass("ui-bar-a");
          $("footer").removeClass("ui-bar-a");
          $("header").addClass("ui-bar-b");
          $("footer").addClass("ui-bar-b");

          whichTheme = !whichTheme;
        }
      }




  function deleteTask(){
    localStorage.setItem('currentTask', $(this).data('task'));
    localStorage.setItem('currentDate', $(this).data('date'));

    let currentTask = localStorage.getItem('currentTask');
    let currentDate = localStorage.getItem('currentDate');

    for(let i = 0; i < todos.length; i++){
      if(todos[i].task == currentTask && todos[i].date == currentDate){
        todos.splice(i, 1);
      }
      localStorage.setItem('todos', JSON.stringify(todos));
    }

    alert("Ülesanne kustutatud!");

    window.location.href = "index.html";
    return false;
  }

  function taskDone() {

    localStorage.setItem('currentTask', $(this).data('task'));
    localStorage.setItem('currentDate', $(this).data('date'));

    let currentTask = localStorage.getItem('currentTask');
    let currentDate = localStorage.getItem('currentDate');

    for(let i = 0; i < todos.length; i++){
      if(todos[i].task == currentTask && todos[i].date == currentDate){
        todos.splice(i, 1);
      }
      localStorage.setItem('todos', JSON.stringify(todos));
    }

    alert("Ülesanne valma!");

    window.location.href = "index.html";
    return false;

  }

  function editTask(){
    let currentTask = localStorage.getItem('currentTask');
    let currentDate = localStorage.getItem('currentDate');

    for(let i = 0; i < todos.length; i++){
      if(todos[i].task == currentTask && todos[i].date == currentDate){
        todos.splice(i, 1);
      }
      localStorage.setItem('todos', JSON.stringify(todos));
    }
    let task = $('#editTask').val();
    let date = $('#editDate').val();
    let update_todo = {
      task: task,
      date: date
    };
    todos.push(update_todo);
    alert("ülesanne muudetud!");
    localStorage.setItem('todos', JSON.stringify(todos));
    window.location.href = "index.html";
    return false;
  }

  function setCurrent(){
    localStorage.setItem('currentTask', $(this).data('task'));
    localStorage.setItem('currentDate', $(this).data('date'));

    $('#editTask').val(localStorage.getItem('currentTask'));
    $('#editDate').val(localStorage.getItem('currentDate'));
  }

  function showTodos(){
    todos = getTodoObject();

    if(todos != "" && todos != null){
      for(let i = 0; i < todos.length; i++){
        $("#todos").append('<li class="ui-body-inherit ui-li-static">'+
        todos[i].task +'<br>'+ todos[i].date +

        '<div class="controls"><a href="#edit" id="editLink" data-task="'+
        todos[i].task+'" data-date="'+ todos[i].date +
        '">Muuda</a> | <a href="#" id="doneTask" data-task="'+
        todos[i].task+'" data-date="'+ todos[i].date +
        '">Tehtud</a> | <a href="#" id="deleteLink" data-task="'+
        todos[i].task+'" data-date="'+ todos[i].date +
        '" onclick="return confirm(\'Kas oled kindel?\')">Kustuta</a></div></li>');
      }
    }
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

    alert("Ülesanne lisatud");

    localStorage.setItem('todos', JSON.stringify(todos));

    window.location.href = "index.html";

    return false;
  }


  function getTodoObject(){
    let currentTodos = localStorage.getItem('todos');

    if(currentTodos != null){
      todos = JSON.parse(currentTodos);
    } else {
      todos = [];
    }

    return todos.sort(function(a, b){
      return new Date(b.date) - new Date(a.date);
    });
  }



});
