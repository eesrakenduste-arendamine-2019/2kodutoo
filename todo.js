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
$('#addButton').on('click', ()=> addEntry());
$('#saveButton').on('click', ()=> saveToFile());
$('#loadButton').on('click', ()=>render());

function render(){
  $('#todos').html("");
  $.get('database.txt', function(data){
    let content = JSON.parse(data).content;


  });
}

function saveToFile(){
  $.post('todo.php', {save: todos}).done(function(){
    alert('done');
  });
}


function addEntry(){
  const titleValue = $('#title').val();
  const descriptionValue = $('#description').val();
  const dateValue = $('#date').val();

  todos.push(new Todo(titleValue, descriptionValue, dateValue));
  console.log(todos);

}

const ul = document.createElement('ul');
ul.className = "todo-list";

this.entries.forEach((entry, entryIndex)=>{
  const li = document.createElement('li');
  const removeTaskButton = document.createElement('div');
  const removeIcon = document.createTextNode('\u00D7');
  li.classList.add('entry');
  removeTaskButton.className = "delete-task-button";

  li.addEventListener('click', (event)=>{
    event.target.classList.add('task-completed');

    if(entry.done){
      entry.done = false;
    }else{
      entry.done = true;
    }

    this.saveInLocalStorage();
    this.render();

  });
  if(entry.done){
    li.style.backgroundColor = "lightgreen";
    li.style.textDecoration = "line-through";
  }
  removeTaskButton.addEventListener('click', ()=>{
    ul.removeChild(li);
    this.entries = this.entries.slice(0,
       entryIndex).concat(this.entries.slice(entryIndex + 1, this.entries.lenght));
    this.saveInLocalStorage();

  });
  removeTaskButton.appendChild(removeIcon);
  li.innerHTML = `${entry.title} ${entry.description} ${entry.date}`;
  li.appendChild(removeTaskButton);
  ul.appendChild(li);


  document.body.appendChild(ul);
});
