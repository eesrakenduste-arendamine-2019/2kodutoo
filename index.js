console.log('faili algus');
var xd = "";
btn = document.getElementById('saveData');
var xd = document.getElementById('message');
console.log(xd.value);
btn.addEventListener('click', pederast());
$("button:saveData").click(function () {
  console.log("321");
	$('#msg').html($('input:textbox').val());

    });
function pederast(){
  console.log('mdv');
  if(message.value!="") {
    console.log("mdv2");
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
