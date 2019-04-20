/*jshint esversion:6*/

let todos = [];

window.onload = function() {
    var form = document.getElementById("form");
    var input = document.getElementById("input");
    var btn = document.getElementById("btn");
    var list = document.getElementById("list");
    var id = 1;

    btn.addEventListener("click", addToDoItem);

    list.addEventListener("click", boxChecked);


    function addToDoItem(){
        if(input.value === ""){
            alert("Sisesta sisu!");
        }else{
            if(list.style.borderTop === ""){
                list.style.borderTop ==="2px solid white";
            }
            var text = input.value;
            var item = `<li id="li-${id}">${text}
                        <input id="box-${id}"
                            class="checkboxes" type="checkbox">
                            <button class="btn deleteBtn"><i class="fa fa-trash"></i></button></li>`;
            list.insertAdjacentHTML('beforeend', item);
            id++;
            form.reset();
        }
    }

    function boxChecked(event){
        const element = event.target;
        if(element.type === "checkbox"){
            element.parentNode.style.textDecoration = "line-through";
        }else{
            element.parentNode.style.textDecoration = "none";
        }
    }


} 

//$('#saveButton').on('click', ()=>saveToFile());

function saveToFile(){
    $.post('server.php', {save: todos}).done(function(){
      alert("done");
    }).fail(function(){
      alert("failed");
    });
  }

  function deleteB(id){
    todos.splice(id, 1);
    console.log(list);
    console.log("test");
    localStorage.setItem('ToDoList', JSON.stringify(todos));
    //saveToFile();
    render();
  }