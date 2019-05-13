/*jshint esversion:6*/
class Todo{
  constructor(title, description, date, saved){
    this.title = title;
    this.description = description;
    this.done = false;
    this.date = date;
    this.saved = new Date();

  }
}

let todos = [];
let localCheck = [];
let entryCheck = [];
let RenderCounter = 0;
let EntryCounter = 0;


$('#addButton').on('click', ()=>addEntry());
$('#saveButton').on('click', ()=>saveToFile());
$('#loadButton').on('click', ()=>render());

function render(){
  $('#todos').html("");
  $.get("database.txt", function(data){
	let date;
    let content = JSON.parse(data).content;
    content.forEach(function(todo, todoIndex){
		$('#todos').append('<ul class="todo-item-done" id="ul' + RenderCounter +'"><li>'+ todo.title+'</li><li>'+ todo.description +'</li><li>'+ todo.date +'</li></ul>');
		RenderCounter++;

			
    });
  });
}

$(function(){
	
	$(document).on('click', ".todo-item-done", done);


});

function done(){
	for(let i = 0; i < todos.length; i++){
		if(todos[i].title == $(this).data('title') && todos[i].description == $(this).data('description')){
			todos[i].done = true;
			$(this).parent().parent().toggleClass("done");

		}else{
			todos[i].done = false;
			$(this).parent().parent().toggleClass("notDone");
		}
	}
}

function done(){
	$(this).toggleClass("done");
}

function addEntry(){
	let check = false;
  const titleValue = $('#title').val();
  const dateValue = $('#date').val();
  const descriptionValue = $('#description').val();  
  todos.push(new Todo(titleValue, descriptionValue, dateValue));
  EntryCounter++
 
  entryCheck.push(todos);
  console.log(entryCheck.length);
	saveInLocalStorage();



  console.log(todos);
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

function search(){
	let input = $('#myInput').val();
	console.log(input);
	let filter = input.toUpperCase();
	let ul = document.getElementById('todos');
	for(let i = 0; i < ul.length; i++){
		for(let j = 0; j < li.length; j++){
			li[j].getElementsByTagName('li')[j];
		if(li.innerHTML.toUpperCase().indexOf(filter) > -1){
			li[j].style.display = "";
		}else{
			li[j].style.display = "none";
		}
	}
		//siia vaja midagi
	}
	}

//saving in localstorage
function saveInLocalStorage(){
	localCheck.push(todos);
	
	window.localStorage.setItem('todos', JSON.stringify(todos));

}

function deleteFromLocalStorage(item){
	localStorage.removeItem(item);
}