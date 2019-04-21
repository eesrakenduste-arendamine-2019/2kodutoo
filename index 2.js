/*jshint esversion:6*/

let todos = [];

$(document).ready(function () {
  render();
});

class Todo {
  constructor(title, date) {
    this.title = title;
    this.date = date;
    this.done = false;
    this.status = false;
  }
}

$('#todoSearch').on('keyup', (e) => searchTodos($(e.target).val()))
$('#btn').on('click', () => addEntry());
$('#saveButton').on('click', () => saveToFile());
$('#loadButton').on('click', (e) => {
  e.preventDefault();
  render(true);
});


function searchTodos(searchTerm = '') {

  const filteredTodos = todos.filter((todo) => {
    return todo.title.indexOf(searchTerm) !== -1
  })

  $('#list').html("");

  printToDO(filteredTodos)
}

function loadFromServer(searchTerm = '', callback = (result) => { }) {
  $.ajax({
    url: 'search.php?search=' + searchTerm,
    method: 'POST',
    success: function (resp) {
      callback(JSON.parse(resp));
    }
  })
}

function render(fromServer = false) {
  $('#list').html("");
  console.info('Loading todos from: %s', fromServer ? 'server' : 'local')
  if (!fromServer && localStorage.getItem("ToDoList")) {
    var content = JSON.parse(localStorage.getItem("ToDoList"));
    console.log(content, 'local');
    todos = content;
    printToDO(content);
  } else {
    loadFromServer('', (rTodos) => {
      todos = rTodos;
      console.log(todos)
      printToDO(rTodos);
    })

  }
}

function printToDO(content) {
  content.forEach(function (todo, todoIndex) {
    const newItem = $('<div></div>');
    newItem.append(`<li class="ui-body-inherit ui-li-static" id="li-${todoIndex}">${todo.title}<br>${todo.date}
                <input id="${todoIndex}" class="checkboxes" type="checkbox">
                <button id="delete${todoIndex + 1}" class="btn deleteBtn" onclick="deleteB(${todoIndex});"><i class="fa fa-trash"></i></button></li>`);

    setTimeout(() => {
      if (todo.done == "true") {
        const listEl = $('#li-' + todoIndex);
        listEl.css('color', 'green');
        listEl.css('text-decoration', 'line-through');
        listEl.find('#' + todoIndex).prop('checked', true)

      }

      if (new Date().getTime() >= new Date(todo.date).getTime() && todo.done == false) {
        $('#li-' + todoIndex).css('color', 'orange');
      }
    })

    $('#list').append(newItem.hide(0).show(200));
  });

  $('input[type=checkbox]').click(function () {
    if ($(this).prop("checked") == true) {
      $("#li-" + this.id).css('color', 'green').css('text-decoration', 'line-through');
      todos[this.id].done = "true";
      localStorage.setItem('ToDoList', JSON.stringify(todos));

    }
    else if ($(this).prop("checked") == false) {
      $("#li-" + this.id).css('color', 'white').css('text-decoration', '');
      todos[this.id].done = "false";
      localStorage.setItem('ToDoList', JSON.stringify(todos));
    }
  });
}

function addEntry() {
  const titleValue = $('#input').val();
  const dateValue = $('#date').val();
  todos.push(new Todo(titleValue, dateValue));
  localStorage.setItem('ToDoList', JSON.stringify(todos));

  render();
}

function saveToFile() {
  console.log("Test");
  $.post('server 2.php', { save: todos }).done(function () {
    alert("done");
  }).fail(function () {
    alert("failed");
  });
}

function deleteB(id) {
  todos.splice(id, 1);
  console.log(JSON.stringify(todos));
  console.log("test");
  localStorage.setItem('ToDoList', JSON.stringify(todos));
  //saveToFile();
  render();
}
