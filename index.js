/* jshint esversion:6 */

class Todo {
    constructor(title, description, date, category,done = false) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.category=category;
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
    $('#todos').on('click', '.deleteButton', removeEntry);
    $('#todos').on('click', '.doneCheckbox', removeEntry);

    loadFromLocalStorage();
});



function render() {
    $('#todos tr:not(#header)').remove();
    todos.forEach(function (todo, todoIndex) {
        console.log(todoIndex);
        $('#todo').append('<tr><th>' + todo.title + '</th><th>' + todo.description + '</th><th>' + todo.date +'</th><th>'+ todo.category+'</th><th>'+todo.done+'</th><th><button class="editButton">Muuda</button></th><th><button class="deleteButton">Kustuta</button></th></tr>');
    });
}


function addEntry() {
    const titleValue = $('#title').val();
    const dateValue = $('#date').val();
    const descriptionValue = $('#description').val();
    const categoryValue= $('#category').val();

    todos.push(new Todo(titleValue, descriptionValue, dateValue,categoryValue));

    console.log(todos);
    render();
}

function removeEntry() {
    let id = $(this).data('id');
    todos.splice(id, 1);
    render();
}

function saveToFile() {
    $.post('server.php', { save: todos }).fail(function () {
        alert('Failed to save to the server!');
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
