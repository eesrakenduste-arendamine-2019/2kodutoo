/*jshint esversion:6*/
let clockContainer
let dateContaier

window.onload = function () {
  init()
}

function init () {
  dateContainer = document.querySelector('#date')
  console.log(clockContainer)
  console.log(dateContainer)
  startDate()
}
function startDate(){
  let date = new Date()
  let kuud = ['jaanuar', '  veebruar  ', 'märts', 'aprill', 'mai', 'juuni', 'juuli', 'august', 'september', 'oktoober', 'november', 'detsember'];
  dateContainer.innerHTML =date.getFullYear()date.getDate()+" "+kuud[date.getMonth()]+" "+date.getDate()
}
class Entry{
  constructor(title, description, date){
    this.title = title;
    this.description = description;
    this.date = date;
    this.done = false;
  }
}

class ToDo{
  constructor(){
    this.entries = JSON.parse(window.localStorage.getItem('entries')) || [];

    document.querySelector('#addButton').addEventListener('click', () => this.addEntry());

    this.render();
  }

  render(){
    if(document.querySelector('.todo-list')){
      document.body.removeChild(document.querySelector('.todo-list'));
    }

    const ul = document.createElement('ul');
    ul.className = 'todo-list';

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

      removeTaskButton.addEventListener('click', ()=>{
        ul.removeChild(li);
        this.entries = this.entries.slice(0, entryIndex).concat(this.entries.slice(entryIndex + 1, this.entries.length));
        this.saveInLocalStorage();
      });
      if(entry.date<"2019-04-09"){
        li.style.backgroundColor = "red";
      }

      if(entry.done){
        li.style.backgroundColor = "lightgreen";
        li.style.textDecoration = "line-through";
      }

      removeTaskButton.appendChild(removeIcon);
      li.innerHTML = `${entry.title} <br> ${entry.description} <br> ${entry.date}`;
      li.appendChild(removeTaskButton);
      ul.appendChild(li);

    });

    document.body.appendChild(ul);
  }

  addEntry(){
    const titleValue = document.querySelector('#title').value;
    const descriptionValue = document.querySelector('#description').value;
    const dateValue = document.querySelector('#date').value;

    this.entries.push(new Entry(titleValue, descriptionValue, dateValue));

    this.saveInLocalStorage();

    this.render();
  }

  saveInLocalStorage(){
    window.localStorage.setItem('entries', JSON.stringify(this.entries));
  }
}

const todo = new ToDo();
