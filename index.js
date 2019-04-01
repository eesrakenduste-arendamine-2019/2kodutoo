/* jshint esversion:6 */

class Todo {
    constructor(title, description, date, done = false) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.done = done;
    }
}

let todos = [];

$(function() { // Same as $(document).ready();
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    today = now.getFullYear()+"-"+(month)+"-"+(day) ;

    $('#date').val(today);

    $('#addButton').on('click', () => addEntry());
    $('#saveButton').on('click', () => {
        saveToFile();
        saveToLocalStorage();
    });
    $('#loadButton').on('click', () => loadFromFile());


    loadFromLocalStorage();
});



function render() {
    $('#todos').html("");
    todos.forEach(function (todo, todoIndex) {
        console.log(todoIndex);
        $('#todos').append('<ul><li>' + todo.title + '</li><li>' + todo.description + '</li><li>' + todo.date + '</li></ul>');
    });
    
}


function addEntry() {
    const titleValue = $('#title').val();
    const dateValue = $('#date').val();
    const descriptionValue = $('#description').val();

    todos.push(new Todo(titleValue, descriptionValue, dateValue));

    console.log(todos);
    render();
}

function saveToFile() {
    $.post('server.php', { save: todos }).done(function () {
        console.log('done');
    }).fail(function () {
        console.log('fail');
    }).always(function () {
        console.log('always');
    });
}

function loadFromFile() {
    $.getJSON('database.txt', function (data) {
        todos = arrayToTodoItems(data.content);
        console.log(todos);
        render();
    });
}

function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadFromLocalStorage() {
    let items = localStorage.getItem('todos');
    if (items) {
        todos = arrayToTodoItems(JSON.parse(items));
        console.log(todos);
        render();
    }
    
}

function arrayToTodoItems(items) {
    let objects = [];
    items.forEach(todo => {
        objects.push(new Todo(todo.title, todo.description, title.date, title.done));
    });
    return objects;
}
