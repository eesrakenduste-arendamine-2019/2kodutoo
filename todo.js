/*jshint esversion:6*/


function newElement(){
  var txt = document.createTextNode("xd");


  //$("#myInput").val("Glenn Quagmire");
  console.log(insertable);


}
window.onload = function(){
addBtn = document.querySelector('.addBtn');


addBtn.addEventListener('click', (event) => {
  if($("#myInput").val() != ''){
    var insertable = document.createTextNode($("#myInput").val());
    var listElement = document.createElement("li");
    listElement.appendChild(insertable);
    console.log(insertable);
    //listElement.innerHTML = insertable;
    document.getElementById("ToDoList").appendChild(listElement);
    $("#myInput").val("");
  }
});

};
