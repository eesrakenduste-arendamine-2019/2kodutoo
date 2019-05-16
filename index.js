/*jshint esversion:6*/
class Todo{
  constructor(title, description, date){
    this.title = title;
    this.description = description;
    this.done = false;
    this.date = date;

  }
}

let todos = [];

$('#addButton').on('click', ()=>addEntry());
$('#saveButton').on('click', ()=>saveToFile());
$('#loadButton').on('click', ()=>render());
$('#deleteButton').on('click', ()=>deleteEntry());

var today = new Date().toJSON().slice(0,10);
console.log(today);


function render(){
  $('#todos').html("");
  $.get("database.txt", function(data){
    let content = JSON.parse(data).content;
    //slice creates a copy and then reverses it
    content.slice().reverse().forEach(function(todo, todoIndex){
		    if(todo.done == true){
			    if(todo.date == today || todo.date < today){
				    $('#todos').append('<ul class="todo-item-done" id="past"><li>'+ todo.title+'</li><li>'+ todo.description +'</li><li>'+ todo.date +' </li></ul>');
			    }else{
				   	$('#todos').append('<ul class="todo-item-done" id="notpast"><li>'+ todo.title+'</li><li>'+ todo.description +'</li><li>'+ todo.date +' </li></ul>');
			    }

		    }else{
			    if(todo.date == today || todo.date < today){
				    $('#todos').append('<ul class="todo-item-done" id="past"><li>'+ todo.title+'</li><li>'+ todo.description +'</li><li>'+ todo.date +' </li></ul>');
			    }else{
				   	$('#todos').append('<ul class="todo-item-done" id="notpast"><li>'+ todo.title+'</li><li>'+ todo.description +'</li><li>'+ todo.date +' </li></ul>');
			    }
			}
				
    });
  });
}

$(function(){
	
	$(document).on('click', ".todo-item-done", done);


});


function deleteEntry(){
	$(this).remove()
}


function done(){
	$.get("database.txt", function(data){
	    let content = JSON.parse(data).content;
		content.forEach(function(todo, todoIndex){
			let li = $("ul").find("li");
			console.log(li);
			if(todo.title == li[0].innerHTML && todo.description == li[1].innerHTML){
				todo.done = true;
				$(li).parent().toggleClass("done");
			}else{
				todo.done = false;
				$(li).parent().toggleClass("unDone");
			}
			updateFile()
			

		});   
	

    });
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

function updateFile(){
	
}

function search(){
	let input = $('#myInput').val();
	console.log(input);
	input = input.toLowerCase();
	let ul = document.getElementsByClassName('todo-item-done');
	let li = $(ul).find("li");
	console.log(ul.length);
	for(let i = 0; i < ul.length; i++){
		for(let j = 0; j < li.length; j++){
		if(!li[j].innerHTML.toLowerCase().includes(input)){
			li[j].style.display ="none";
		}else{
			li[j].style.display ="";
		}
	}
		//siia vaja midagi
	}
	}

//saving in localstorage
function saveInLocalStorage(){
	
	window.localStorage.setItem('todos', JSON.stringify(todos));

}
