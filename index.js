/*jshint esversion:6*/

let getTodo = localStorage.getItem('todo');

$(document).ready(function(){
	if (getTodo != null){
		showResults();
	}
});

class Todo{
  constructor(task, date){
    this.task = task;
    this.date = date;
    this.done = false;
  }
}

let todos = [];

$('#addButton').on('click', ()=>addEntry());
$('#saveButton').on('click', ()=>saveToFile());
$('#loadButton').on('click', ()=>render());

function render(){
  $('#todos').html("");
  $.get('database.txt', function(data){
    let content = JSON.parse(data).content;

    content.forEach(function(todo, todoIndex){
      console.log(todoIndex);
      $('#todos').append('<ul><li>'+ todo.task +'</li><li>'+ todo.date +'</li></ul>');
    });
  });
}

function addEntry(){
  const taskValue = $('#task').val();
  const dateValue = $('#date').val();

  todos.push(new Todo(taskValue, dateValue));

  //console.log(todos);
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
	
    let todoObject = { 'task': $('#task').val(), 'date': $('#date').val(), 'done': false };

    let previousTodos = JSON.parse(localStorage.getItem('todo'));

    if (previousTodos != null){
		$.each(previousTodos, function(index, value){
			massif.push(value);
		});
    }
	
	/*$.each(todos, function(index, value){
		massif.push(value);
	});*/
	
	massif.push(todoObject);

    localStorage.setItem('todo', JSON.stringify(massif));
	
    showResults();
}
  
function showResults(){
	$('#todos').html("");
    let previousTodos = JSON.parse(localStorage.getItem('todo'));
	let newMassif = [];

    $.each( previousTodos, function( key, value ) {
		if (value.date == ""){
			value.date = "0000-00-00";
		}
		
		newMassif.push(value);
    });
	
	newMassif.sort(function (a, b){
		if (parseInt(a.date.slice(0, 4)) != parseInt(b.date.slice(0, 4))){
			return parseInt(a.date.slice(0, 4)) - parseInt(b.date.slice(0, 4));
		} else if (parseInt(a.date.slice(5, 7)) != parseInt(b.date.slice(5, 7))){
			return parseInt(a.date.slice(5, 7)) - parseInt(b.date.slice(5, 7));
		} else {
			return parseInt(a.date.slice(8, 10)) - parseInt(b.date.slice(8, 10));
		}
	});
	
	/*newMassif.sort(function (a, b){
		return parseInt(a.date.slice(6, 7)) - parseInt(b.date.slice(6, 7));
	});
	
	newMassif.sort(function (a, b){
		return parseInt(a.date.slice(8, 9)) - parseInt(b.date.slice(8, 9));
	});*/
	
	$.each( newMassif, function (key, value) {
		$('#todos').append("<li>" + value.task + " " + value.date + " " + value.done + "</li>");
	});
	
	/*$.each( newMassif, function( key, value) {
		console.log(value.task + " " + value.date + " " + value.done + "\n");
	});*/

}
