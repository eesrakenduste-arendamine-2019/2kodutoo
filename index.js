/*jshint esversion:6*/

//Kolm listi, mis hoiavad andmeid
var data = (localStorage.getItem("todoList")) ? JSON.parse(localStorage.getItem("todoList")) : { //parem IF statement versioon>> (boolean) ? DoTask : else;
  todo: [], //Teha
  done: [], //Tehtud
  important: [] //Tähtsad
};//ends data

//Leab lehe avamisel
window.onload = function(){
  //console.log("script has loaded");
  //console.log(JSON.parse(localStorage.getItem("todoList")));
};//ends onload

//Saadab andmed  ja kuvab need(HTML-DOM)
renderList();

//Väärtus nupu peale vajutades
document.getElementById('add').addEventListener('click', function(){
  let inputValue =  document.getElementById('item').value;
  if(inputValue){
    enterItem(inputValue);
  }
});//ends click function

//Väärtus Enter nuppu vajutades
document.getElementById("item").addEventListener("keydown", function (e) {
  let inputValue = this.value;

  if( e.code === 'Enter' && inputValue){
    console.log(inputValue);
    enterItem(inputValue);
  }
});//ends Enter function

//Saadab väärtuse konstrukteerimiseks
function enterItem(inputValue){
  addItem(inputValue);
  document.getElementById('item').value = "";
  data.todo.push(inputValue);
  dataUpdate();
}//ends enterItem function

//See funktsioon kuvab ükshaaval välja kõik esemed <li> listides
function renderList(){
  //Kui pole tühi, saadab vastuse
  if(!data.todo.length && !data.done.length && !data.important.length) return;

//Teha item listi kuvamine
  for(let i=0; i<data.todo.length;i++){
    var item = data.todo[i];
    addItem(item);
  }

  //Tehtud item listi kuvamine
  for(let i=0; i<data.done.length;i++){
    var item2 = data.done[i];
    addItem(item2, 1);
  }

  //Tähtsad item listi kuvamine
  for(let i=0; i<data.important.length;i++){
    var item3 = data.important[i];
    addItem(item3, 2);
    }
  }//ends renderList function

//Teiseldab väärtused JSON stringiks
function dataUpdate(){
  localStorage.setItem("todoList", JSON.stringify(data));
  //Siin tasub console.logid teha
}//ends dataUpdate functions

//Esemete viimine tehtud item listi
function completeItem(){
  let value = this.parentNode.parentNode;
  let list = value.parentNode;
  let listId = list.id;
  let goTo; //Sihtlist, ehk list kuhu ese saabub

  if(listId === "todo"){
    goTo = document.getElementById("done");
    data.todo.splice(data.todo.indexOf(value.innerText), 1);//Eemaldab olemasolevast listist
    data.done.push(value.innerText);//Lisab uude listi
  }else if(listId === "done"){
    goTo = document.getElementById("todo");
    data.done.splice(data.done.indexOf(value.innerText), 1);
    data.todo.push(value.innerText);
  }else if(listId === "important"){
    goTo = document.getElementById("done");
    data.important.splice(data.important.indexOf(value.innerText), 1);
    data.done.push(value.innerText);
  }
  list.removeChild(value);
  goTo.insertBefore(value, goTo.childNodes[0]);//Lisab listi esimeseks
  dataUpdate();
}//ends completeItem function

//Esemete viimine tähtsad item listi
function importantItem(){
  let value = this.parentNode.parentNode;
  let list = value.parentNode;
  let listId = list.id;
  let goTo;

  if(listId === "todo"){
    goTo = document.getElementById("important");
    data.todo.splice(data.todo.indexOf(value.innerText), 1);
    data.important.push(value.innerText);
  }else if(listId === "done"){
    goTo = document.getElementById("important");
    data.done.splice(data.done.indexOf(value.innerText), 1);
    data.important.push(value.innerText);
  }else if(listId === "important"){
    goTo = document.getElementById("todo");
    data.important.splice(data.important.indexOf(value.innerText), 1);
    data.todo.push(value.innerText);
  }
  list.removeChild(value);
  goTo.insertBefore(value, goTo.childNodes[0]);
  dataUpdate();
}//ends importantItem function

//Esemete kustutamine listist
function deleteItem(){
  let value = this.parentNode.parentNode;
  let list = value.parentNode;
  let listId = list.id;

  if(listId === "todo"){
    data.todo.splice(data.todo.indexOf(value.innerText), 1);
  }else if(listId === "done"){
    data.done.splice(data.done.indexOf(value.innerText), 1);
  }else if(listId === "important"){
    data.important.splice(data.important.indexOf(value.innerText), 1);
  }
  list.removeChild(value);
  dataUpdate();
}//ends deleteItem function

//Esemete genereerimine ja todo listi lisamine
function addItem(inputText, done2){
  let list = (done2 == 1) ? document.getElementById('done') : (done2 == 2) ? document.getElementById('important') : document.getElementById('todo');

  let value = document.createElement('li');
  value.innerText = inputText;

  let buttons = document.createElement('div');
  buttons.classList.add('buttons');

  //Tähtis nupp
  let important = document.createElement('button');
  important.classList.add('important');
  important.addEventListener('click', importantItem);

  //Tehtud nupp
  let done = document.createElement('button');
  done.classList.add('done');
  done.addEventListener('click', completeItem);

  //Kustuta nupp
  let deleted = document.createElement('button');
  deleted.classList.add('deleted');
  deleted.addEventListener('click', deleteItem);

  buttons.appendChild(important);
  buttons.appendChild(done);
  buttons.appendChild(deleted);
  value.appendChild(buttons);
  list.insertBefore(value, list.childNodes[0]);
}//ends addItem function

//Esemete sorteerimine listides
//Saab sorteerida numbrite või tähtede järgi
//funktsioon saadud aadressilt: https://www.w3schools.com/howto/howto_js_sort_list.asp
function sortListDir() {
  var list, i, switching, b, shouldSwitch, dir, switchcount = 0;
  //For loopi lisamine kolme erineva listi sorteerimise jaoks
  for (let ii = 0; ii < 3; ii++) {
    let list = (ii == 0) ? document.getElementById('important') : (ii == 1) ? document.getElementById('todo') : document.getElementById('done');
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    // Make a loop that will continue until no switching has been done:
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      b = list.getElementsByTagName("LI");
      // Loop through all list-items:
      for (i = 0; i < (b.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Check if the next item should switch place with the current item,
        based on the sorting direction (asc or desc): */
        if (dir == "asc") {
          if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
            /* If next item is alphabetically lower than current item,
            mark as a switch and break the loop: */
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (b[i].innerHTML.toLowerCase() < b[i + 1].innerHTML.toLowerCase()) {
            /* If next item is alphabetically higher than current item,
            mark as a switch and break the loop: */
            shouldSwitch= true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        b[i].parentNode.insertBefore(b[i + 1], b[i]);
        switching = true;
        // Each time a switch is done, increase switchcount by 1:
        switchcount ++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
}//Ends sorting function

//JQuery animatsiooni lisamine listide peitmiseks ja nähtavaletoomiseks
//töötab kolme erineva listi jaoks
$(document).ready(function() {
    $(".importantButton").click(function () {
    $(".importantContainer").toggle("slow");
    $('.importantButton').toggleClass('shadow');//lisab classi
   });
   $(".todoButton").click(function () {
   $(".todoContainer").toggle("slow");
   $('.todoButton').toggleClass('shadow');
  });
  $(".doneButton").click(function () {
  $(".doneContainer").toggle("slow");
  $('.doneButton').toggleClass('shadow');
 });
});//ends toggle animation funtion
