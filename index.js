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

    $('#addButton').on('click', (e) => {
        e.preventDefault();
        addEntry()
    });
    $('#saveButton').on('click', (e) => {
        e.preventDefault();
        saveToFile();
        saveToLocalStorage();
    });
    $('#loadButton').on('click', (e) => loadFromFile(e));
    $('#todo').on('click', '.deleteButton', removeEntry);
    $('#todo').on('change', '.doneCheckbox', toggleDone);
    //$('#todo').on('change', '.doneCheckbox', removeEntry);

    loadFromLocalStorage();
});



function render() {
    $('#todo tr:not(#header)').remove();
    todos.forEach(function (todo, todoIndex) {
        console.log(todoIndex);
        let checked = '';
        if (todo.done) {
            checked = 'checked';
        }
        $('#todo').append('<tr>' + 
            '<td><input type="checkbox" class="doneCheckbox" data-id="' + todoIndex + '" name="done" value="1" ' + checked + '></td>' +
            '<td>' + todo.title + '</td>' + 
            '<td>' + todo.description + '</td>' +
            '<td class="text-nowrap">' + todo.date + '</td>' +
            '<td>' + todo.category + '</td>' +
            '<td><button class="editButton btn btn-sm btn-info">Muuda</button></td>' +
            '<td><button class="deleteButton btn btn-sm btn-danger" data-id="' + todoIndex + '" >Kustuta</button></td>' +
        '</tr>');
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

function toggleDone(e) {
    let id = $(this).data('id');
    todos[id].done = this.checked;
}

function removeEntry(e) {
    e.preventDefault();
    let id = $(this).data('id');
    console.log(id);
    todos.splice(id, 1);
    render();
}

function saveToFile() {
    $.post('server.php', { save: JSON.stringify(todos) }).fail(function () {
        alert('Failed to save to the server!');
    });
}

function loadFromFile(e) {
    e.preventDefault();
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
        objects.push(new Todo(todo.title, todo.description, todo.date, todo.category, todo.done));
    });
    return objects;
}
