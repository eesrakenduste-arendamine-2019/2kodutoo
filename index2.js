/*jshint esversion:6*/

let getTodo = localStorage.getItem('todo');
let sort = 1;

$(document).ready(function(){
	if (getTodo != null){
		showResults();
	}
	
	//whyTheseAgain();
	/*$("#todos li").on("click", function() {
		$(this).toggleClass("checked");
		markAsDone($(this).text());
	});
	
	$('.pDelete').on("click", function(){
		deleteTask($(this).parent().text());
	});*/
	
	let date = new Date().toISOString().split('T')[0];
	$('#date').attr('min', date).attr('value', date);
	
	$("#searchbox").keyup(function(){

		// Retrieve the input field text
		let searchtext = $(this).val();
		let searchResults = $('#searchResults');

		// Loop through the local storage
		let json = JSON.parse(localStorage.getItem('todo'));
		
		searchResults.empty();
		
		if (searchtext.length > 0){
			for(obj in json) {
				if(json[obj].task.includes(searchtext)){
					$('#searchResults').append(
						$('<li>').append("<p class='pDate'>" + json[obj].date + "</p><p class='pTask'>" + json[obj].task));
				} 
			}
		}
		
	});
});

class Todo{
  constructor(task, date){
    this.task = task;
    this.date = date;
    this.done = false;
	this.important = false;
  }
}

let todos = [];

$('#addButton').on('click', ()=>addEntry());

function whyTheseAgain(){
	
	$('#todos li').off('click');
	$('.pImportant').off('click');
	$('.pDelete').off('click');
	$('.sorting').off('click');
	
	$("#todos li").on("click", function() {
		$(this).toggleClass("checked");
		markAsDone($(this).text());
	});
	
	$('.pImportant').on("click", function(){
		if ($(this).parent().hasClass("checked")){
			$(this).parent().toggleClass("checked important");
		} else {
			$(this).parent().toggleClass("important");
		}
		toggleImportant($(this).parent().text());
	});
	
	$('.pDelete').on("click", function(){
		deleteTask($(this).parent().text());
	});
	
	$('.sorting').on("click", function(){
		if (sort == 1){
			sort = 0;
			$('.sorting').text("re-sort by name");
		} else {
			sort = 1;
			$('.sorting').text("re-sort by date");
		}
		showResults();
	});
}

function addEntry(){
	const taskValue = $('#task').val();
	const dateValue = $('#date').val();
	
	if(checkIfExists(taskValue, dateValue)){
		alert("Exactly same data todo already exists");
	} else {
		todos.push(new Todo(taskValue, dateValue));
		saveToFile();
	}

}

function checkIfExists(taskValue, dateValue){
	let previousTodos = JSON.parse(localStorage.getItem('todo'));
	let returnThing = false;
	
	if (previousTodos != null){
		$.each(previousTodos, function(index, value){
			if (taskValue == value.task && dateValue == value.date){
				returnThing = true;
			}
		});
    }
	
	return returnThing;
}

  function saveToFile(){
    $.post('server.php', {save: todos}).done(function(){
      //alert('done');
    }).fail(function(){
      alert('fail');
    }).always(function(){
      //console.log('works');
    });
	
	saveInLocalStorage();
  }

function saveInLocalStorage(){
	
	let massif = [];

    let previousTodos = JSON.parse(localStorage.getItem('todo'));

    if (previousTodos != null){
		$.each(previousTodos, function(index, value){
			massif.push(value);
		});
    }
	
	massif.push(todos[todos.length-1]);
	
	//massif.push(todoObject);

    localStorage.setItem('todo', JSON.stringify(massif));
	
    showResults();
}
  
function showResults(){
	//$('#todos').html("");
	$('#todos').empty();
	$('#importantTodos').empty();
	$('#importantTodos').text("Important todos:");
    let previousTodos = JSON.parse(localStorage.getItem('todo'));
	let newMassif = [];

	if (previousTodos != null){
		$('#todos').html("Todos: <br>")
		$.each( previousTodos, function( key, value ) {
			newMassif.push(value);
		});
	}
	
	if (sort == 0){
		newMassif.sort(function (a, b){
			if (parseInt(a.date.substring(0, 4)) != parseInt(b.date.substring(0, 4))){
				return parseInt(a.date.substring(0, 4)) - parseInt(b.date.substring(0, 4));
			} else if (parseInt(a.date.substring(5, 7)) != parseInt(b.date.substring(5, 7))){
				return parseInt(a.date.substring(5, 7)) - parseInt(b.date.substring(5, 7));
			} else {
				return parseInt(a.date.substring(8, 10)) - parseInt(b.date.substring(8, 10));
			}
		});
	} else if (sort == 1){
		newMassif.sort(function (a, b){
			let aTask = a.task.toLowerCase();
			let bTask = b.task.toLowerCase();
			if (aTask < bTask) { return -1; }
			if (aTask > bTask) { return 1; }
			return 0;
		})
	}
	
	
	/*$.each( newMassif, function (key, value) {
		$('#todos').append("<li>" + value.task + " " + value.date + " " + value.done + "</li>");
	});*/
	$.each( newMassif, function (key, value) {
		if (value.done === false && value.important === false){
			$('#todos').append(
				$('<li>').append("<p class='pDate'>" + value.date + "</p><p class='pTask'>" + value.task + "</p><p class='pImportant'>" + "!" + "</p><p class='pDelete'>" + "\u00D7" + "</p>") // $('<li>').append(value.date + " " + value.task) + " " + value.done
			); 
		} else if (value.done === true && value.important === false) { // else
			$('#todos').append(
				$('<li>').addClass("checked").append("<p class='pDate'>" + value.date + "</p><p class='pTask'>" + value.task + "</p><p class='pImportant'>" + "!" + "</p><p class='pDelete'>" + "\u00D7" + "</p>") //  + " " + value.done
			); 
		} else if (value.done === false && value.important === true){
			$('#todos').append(
				$('<li>').addClass("important").append("<p class='pDate'>" + value.date + "</p><p class='pTask'>" + value.task + "</p><p class='pImportant'>" + "!" + "</p><p class='pDelete'>" + "\u00D7" + "</p>") //  + " " + value.done
			); 
			
			$('#importantTodos').append(
				$('<li>').addClass("important").append("<p class='pDate'>" + value.date + "</p><p class='pTask'>" + value.task) //  + " " + value.done
			);
		} else if (value.done === true && value.important === true){
			$('#todos').append(
				$('<li>').addClass("checked important").append("<p class='pDate'>" + value.date + "</p><p class='pTask'>" + value.task + "</p><p class='pImportant'>" + "!" + "</p><p class='pDelete'>" + "\u00D7" + "</p>") //  + " " + value.done
			); 
			
			$('#importantTodos').append(
				$('<li>').addClass("checked important").append("<p class='pDate'>" + value.date + "</p><p class='pTask'>" + value.task) //  + " " + value.done
			);
		}
	});
	
	whyTheseAgain();

}

function markAsDone(input){
	massif = [];
	let previousTodos = JSON.parse(localStorage.getItem('todo'));
	
	input = input.slice(0, input.length-2);
	
	if (previousTodos != null){
		$.each(previousTodos, function(key, value){
			let current = value.date + value.task; //  + " " + value.done
			let todoObject = { 'task': value.task, 'date': value.date, 'done': value.done, 'important': value.important };
			
			if (current === input){
				if (todoObject.done === false){
					todoObject.done = true;
				} else {
					todoObject.done = false;
				}
			} 
			
			massif.push(todoObject);
		});
	}
	
	localStorage.setItem('todo', JSON.stringify(massif));
	showResults();
}

function deleteTask(input){
	massif = [];
	let previousTodos = JSON.parse(localStorage.getItem('todo'));
	
	input = input.slice(0, input.length-2);
	
	if (previousTodos != null){
		$.each(previousTodos, function(key, value){
			let current = value.date + value.task; //  + " " + value.done
			let todoObject = { 'task': value.task, 'date': value.date, 'done': value.done, 'important': value.important };
			
			if (current != input){
				massif.push(todoObject);
			} 
		});
	}
	
	localStorage.setItem('todo', JSON.stringify(massif));
	showResults();
	
}

function toggleImportant(input){
	massif = [];
	let previousTodos = JSON.parse(localStorage.getItem('todo'));
	
	input = input.slice(0, input.length-2);
	
	if (previousTodos != null){
		$.each(previousTodos, function(key, value){
			let current = value.date + value.task; //  + " " + value.done
			let todoObject = { 'task': value.task, 'date': value.date, 'done': value.done, 'important': value.important };
			
			if (current === input){
				if (todoObject.important === false){
					todoObject.important = true;
				} else {
					todoObject.important = false;
				}
			} 
			
			massif.push(todoObject);
		});
	}
	
	localStorage.setItem('todo', JSON.stringify(massif));
	showResults();
	
}