var dateNow = new Date();
document.write(formatDate(dateNow));

function formatDate(date){
  var year = date.getFullYear();
  var month = date.getMonth();
  month = month + 1;
  if(month < 10) {
    month = "0" + month;
  }
  var day = date.getDate();
  if(day < 10) {
    day = "0" + day;
  }

  return year + "-" + month + "-" + day;

}
if(date < formatDate(dateNow)){
  li.style.backgroundColor = "red";
  }
class Todo{
  constructor(title, description, date){
    this.title = title;
    this.description = description;
    this.date = date;
    this.done = false;
  }
}

let todos = [];
todos = JSON.parse(window.localStorage.getItem('todos')) || [];
render();

function saveInLocalStorage(){
  window.localStorage.setItem('todos', JSON.stringify(todos));
}

$('#addButton').on('click', ()=>addEntry());

function render(){
  $('#todos').html("");
  $.get('database.txt', function(data){
    let content = JSON.parse(data).content;
    content.forEach(function(todo, todoIndex){
      console.log(todoIndex);
      $('#todos').append('<ul><li>'+ todo.title+'</li><li>'+ todo.description +'</li><li>'+ todo.date +'</li></ul>');
    });
  });
}

function addEntry(){
  const titleValue = $('#title').val();
  const dateValue = $('#date').val();
  const descriptionValue = $('#description').val();

  todos.push(new Todo(titleValue, descriptionValue, dateValue));

  console.log(todos);
  saveToFile();
  saveInLocalStorage();
  render();
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
