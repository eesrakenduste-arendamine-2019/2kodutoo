/* jshint esversion:6 */

class ToDo{
    constructor(title, description, date){
        this.title = title;
        this.description = description;
        this.date = date;
        this.done = false;
    }
}

let todos = [];

$("#saveButton").on("click", () => addEntry());
function render(){
    $("#todos").html(""); // Clear the view before loading items
    $.get("database.txt", function(data){
        let content = JSON.parse(data).content;

        content.forEach(function(todo, todoIndex){
            console.log(todoIndex);
            $("#todos").append("<ul><li>" + todo.title + "</li><li>" + todo.description + "</li><li>" + todo.date + "</li></ul>");
        });
    });
}

function addEntry(){
    const titleValue = $("#title").val();
    const descriptionValue = $("#description").val();
    const dateValue = $("#date").val();

    todos.push(new ToDo(titleValue, descriptionValue, dateValue));

    saveAndRender();
}

function saveToFile(){
    $.post("server.php", {
        save: todos
    }).done(function(){
        console.log("Successfully saved to file");
    }).fail(function(){
        console.log("Failed to save to file");
    });
}

function saveToLocalStorage(){
    $(todos).val(localStorage);
}

function saveAndRender(){
    saveToFile();
    saveToLocalStorage();
    render();
}