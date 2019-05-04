console.log('faili algus');
// var xd = "";
btn = document.getElementById('saveData');
xd = document.getElementById('message').value;
console.log(xd.value);
btn.addEventListener('click', salvesta());
function salvesta(){
  console.log(xd);
  console.log('test1');
  if(message.value!="") {
    console.log("test2");
    $.ajax({
      url: "server.php",
      type: "POST",
      async: true,
      data: { msg:$("#message").val() }, //your form data to post goes here as a json object
      dataType: "html",
      success: function(data) {
        $('#output').html(data);
        console.log("töötab");
      },
    });
  } else {
    console.log("pole datat");
  }
}
