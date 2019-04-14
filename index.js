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
//$('#saveButton').on("click", ()=> saveToFile());
$('#loadButton').on("click", ()=> render());
let content;
/*function render(){
    $('#todos').html("");
    $.get("database.txt", function(data){
        content = JSON.parse(data).content;

        content.forEach(function(todo, todoIndex){
            //prepend on ette
            $('#todos').append('<ul><li>'+todoIndex+'</li><li>'+todo.title+'</li><li>'+todo.description+'</li><li>'+todo.date+'</li><div class="delete-task-button">×</div></ul>');
            saveInLocalStorage();
         });

    });
}*/
function render(){
    $('#todos').html("");
    $.get("test.php", function(data) {
        console.log(data);
        
        content = JSON.parse(data).content;
        console.log(content);
        
        content.forEach(function(todo){
            //prepend on ette
            $('#todos').append('<ul><li>'+todo.title+'</li><li>'+todo.description+'</li><div class="delete-task-button">×</div></ul>');
            saveInLocalStorage();
         });

    });
}
function saveInLocalStorage(){
    window.localStorage.setItem('content', JSON.stringify(content));
}
function addEntry(){
    todos = [];
    const titleValue = $('#title').val();
    const descriptionValue = $('#description').val();
    const dateValue = $('#date').val();

    todos.push(new Todo(titleValue,descriptionValue,dateValue));
    saveToFile();
    console.log(todos);    
}
function saveToFile(){
    todos.forEach(function(todo){
        $.post("server.php", {title: todo.title, desc:todo.description, time: todo.date});
    });
    
    /*$.post("server.php", {save: todos}).done(function(){
        //$.post("server.php", {save: todos});
        console.log("done");
    }).fail(function(){
        console.log("fail");
    }).always(function(){
        console.log("always");
        
    });*/
}