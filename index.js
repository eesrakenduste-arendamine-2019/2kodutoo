/*jshint esversion:6*/
$(document).one('pageinit', function(){
  $(function(){
    $('.date').each(function(){
      $(this).datepicker();
    });
  });

  $('#addTask').on('click', saveToFile);
  showTodos();
  $('#submitAdd').on('tap', addTask);
  $('#todos').on('tap', '#editLink', setCurrent);
  $('#submitEdit').on('tap', editTask);
  $('#todos').on('tap', '#deleteLink', deleteTask);

  function showTodos(){
    todos = getTodoObject();

    for(let i = 0; i < todos.length; i++){
      $('#todos').append('<li class="ui-body-inherit ui-li-static">' + todos[i].task + '<br>' + todos[i].date + '<div class="controls"><a href="#edit" id="editLink" data-task="' + todos[i].task + '" data-date="' + todos[i].date + '">Muuda</a> | <a href="#" id="deleteLink" data-task="' + todos[i].task + '" data-date="' + todos[i].date + '">Kustuta</a></div></li>');
    }
  }

  function setCurrent(){
    console.log("setCurrent");
    localStorage.setItem('currentTask', $(this).data('task'));
    localStorage.setItem('currentDate', $(this).data('date'));

    $('#editTask').val(localStorage.getItem('currentTask'));
    $('#editDate').val(localStorage.getItem('currentDate'));
  }
  function deleteTask(){
    localStorage.setItem('currentTask', $(this).data('task'));
    localStorage.setItem('currentDate', $(this).data('date'));

    let currentTask = localStorage.getItem('currentTask');
    let currentDate = localStorage.getItem('currentDate');

    todos = getTodoObject();

    for(let i = 0; i < todos.length; i++){
      if(currentDate == todos[i].date && currentTask == todos[i].task){
        todos.splice(i, 1);
      }

      localStorage.setItem('todos', JSON.stringify(todos));
    }

    window.location.href = "index.html";
    return false;
  }


  function editTask(){
    console.log("editTask");
    let currentTask = localStorage.getItem('currentTask');
    let currentDate = localStorage.getItem('currentDate');

    todos = getTodoObject();

    for(let i = 0; i < todos.length; i++){
      if(currentDate == todos[i].date && currentTask == todos[i].task){
        todos.splice(i, 1);
      }

      localStorage.setItem('todos', JSON.stringify(todos));
    }


    let task = $('#editTask').val();
    let date = $('#editDate').val();

    let todo = {
      task: task,
      date: date
    };


    todos.push(todo);
    console.log(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
    window.location.href = "index.html";
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
    console.log(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
    window.location.href = "index.html";
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
  function saveToFile(){
  $.post('server.php', {save: todos}).done(function(){
    console.log('done');
  }).fail(function(){
    console.log('fail');
  }).always(function(){
    console.log('always');
  });
}



  $("#flip-2").change(function(){
    let color = $("#content").css("background-color");
    if(color === 'rgba(0, 0, 0, 0)'){
      console.log(color);
      $("[id=content]").css({"background-color": "black"});
    }else if ($("[id=content]").css({"background-color": "black"})) {
        $("[id=content]").css({"background-color": "white"});
    }
    });



});
