/*jshint esversion:6*/
class Todo{
    constructor(title, description, date){
        this.title = title;
        this.description = description;
        this.date = date;
        this.done = false;
    }
}

let todos = [];

$('#addButton').on("click", ()=> addEntry());
$('#saveButton').on("click", ()=> saveToFile());
$('#loadButton').on("click", ()=> render());
let content;
function render(){
    $('#todos').html("");
    $.get("database.txt", function(data){
        content = JSON.parse(data).content;

        content.forEach(function(todo, todoIndex){
            //prepend on ette
            $('#todos').append('<ul><li>'+todoIndex+'</li><li>'+todo.title+'</li><li>'+todo.description+'</li><li>'+todo.date+'</li><div class="delete-task-button">×</div></ul>');
            saveInLocalStorage();
         });

    });
}
function saveInLocalStorage(){
    window.localStorage.setItem('content', JSON.stringify(content));
}
function addEntry(){
    const titleValue = $('#title').val();
    const descriptionValue = $('#description').val();
    const dateValue = $('#date').val();

    todos.push(new Todo(titleValue,descriptionValue,dateValue));

    console.log(todos);    
}
function saveToFile(){
    $.post("server.php", {save: todos}).done(function(){
        console.log("done");
    }).fail(function(){
        console.log("fail");
    }).always(function(){
        console.log("always");
        
    });
}