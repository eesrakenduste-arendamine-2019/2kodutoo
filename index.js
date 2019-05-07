/*jshint esversion:6*/

class Entry{
  constructor(title, description, date){
    this.title = title;
    this.description = description;
    this.date = date;
  }
}


class ToDo{
  constructor(){
    this.entries = JSON.parse(window.localStorage.getItem('entries')) || [];
    document.querySelector('#addButton').addEventListener('click', ()=> this.addEntry());
    this.render();
  }


  render(){
    if(document.querySelector('.todo-list')){
      document.body.removeChild(document.querySelector('.todo-list'));
    }

    const ul = document.createElement("ul");
    ul.className = "todo-list";
    this.entries.forEach((entry, entryIndex)=>{
      const li = document.createElement("li");
      let title = document.createTextNode(entry.title);
      let desc = document.createTextNode(entry.description);
      let date = document.createTextNode(entry.date);

      li.appendChild(title);
      li.appendChild(desc);
      li.appendChild(date);
      let span = document.createElement("SPAN");
      let txt = document.createTextNode("\u00D7");
      span.className = "close";
      span.addEventListener("click", ()=>{
        ul.removeChild(li);
        this.entries = this.entries.slice(0, entryIndex).concat(this.entries.slice(entryIndex + 1, this.entries.length));
        this.saveOnLocalStorage();
      })

      li.addEventListener('click', (event)=> {
          event.target.classList.toggle('checked');
          if(entry.done){
            entry.done = false;
          }

          else{
            entry.done = true;
          }

          this.saveOnLocalStorage();
          this.render();
      });

      if(entry.done){
        li.classList.toggle('checked');
      }

      span.appendChild(txt);
      li.appendChild(span);
      ul.appendChild(li);
    });
    document.body.appendChild(ul);
  }


  addEntry(){
    const titleValue = document.querySelector('#title').value;
    const descriptionValue = document.querySelector('#description').value;
    const dateValue = document.querySelector('#date').value;
    this.entries.push(new Entry(titleValue, descriptionValue, dateValue));
    this.saveOnLocalStorage();
    this.render();
  }

  saveOnLocalStorage(){
    window.localStorage.setItem('entries', JSON.stringify(this.entries));
  }
}

const todo = new ToDo();
