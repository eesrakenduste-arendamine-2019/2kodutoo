/*jshint esversion:6*/

class Entry{
  constructor(title, description, date){
    this.title = title;
    this.description = description;
    this.date = date;
    this.none = false;
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

      let t = document.createTextNode(entry.title);
      let desc = document.createTextNode(entry.description);
      let date = document.createTextNode(entry.date);


      li.appendChild(t);
      li.appendChild(desc);
      li.appendChild(date);
      var span = document.createElement("SPAN");
      var txt = document.createTextNode("\u00D7");
      span.className = "close";


      //var list = ul || "";
      console.log(entryIndex);
      span.addEventListener("click", ()=>{
        ul.removeChild(li);
        this.entries = this.entries.slice(0, entryIndex).concat(this.entries.slice(entryIndex + 1, this.entries.length));
        this.saveOnLocalStorage();
        //console.log("removing");
        console.log(this.entries);
      })

      li.addEventListener('click', (event)=> {

          //if (event.target.tagName === 'LI') {
          event.target.classList.toggle('checked');

          //}
          if(entry.done){
            entry.done = false;
          }
          else{
            entry.done = true;
          }
          this.saveOnLocalStorage();
          console.log("completed");
          this.render();
      });

      if(entry.done){
        li.classList.toggle('checked');
        //li.style.textDecoration = "line-through";
      }

      span.appendChild(txt);
      li.appendChild(span);
      ul.appendChild(li);

    });

    document.body.appendChild(ul);




    let i;
    var close = document.getElementsByClassName("close");
    /*for (i = 0; i < close.length; i++) {
       close[i].onclick = function() {
         var div = this.parentElement;
         div.style.display = "none";
       }
    }*/



       /*if(entry.done){
         li.style.backgroundColor = "lightgreen";
         li.style.textDecoration = "line-through";
       }*/
  }


  addEntry(){
    var li = document.createElement("li");
    var ul = document.createElement("ul");
    const titleValue = document.querySelector('#title').value;
    const descriptionValue = document.querySelector('#description').value;
    const dateValue = document.querySelector('#date').value;
    //var inputValue = document.getElementById("myInput").value;
    /*let t = document.createTextNode(titleValue);
    let desc = document.createTextNode(descriptionValue);
    let date = document.createTextNode(dateValue);

    li.appendChild(t);
    li.appendChild(desc);
    li.appendChild(date);
    ul.appendChild(li);

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    document.body.appendChild(ul);*/


    this.entries.push(new Entry(titleValue, descriptionValue, dateValue));
    this.saveOnLocalStorage();
    this.render();
  }

  saveOnLocalStorage(){
    window.localStorage.setItem('entries', JSON.stringify(this.entries));
  }
}

const todo = new ToDo();
