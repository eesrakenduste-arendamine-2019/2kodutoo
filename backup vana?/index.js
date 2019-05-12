$('document').ready(function() {
  $('#saveData').click(function(){
    console.log("#message1".value);
    $.ajax({
      type: "POST",
      url: "server.php",
      data: $("#message1").val(),
      success: function() {
      }
    });
  });
});













// console.log('faili algus');
// // var xd = "";
// $('document').ready(function() {
//   btn = document.getElementById('saveData');
//   xd = document.querySelector('#message1');
//   xd2 = $('#message').val();
//   console.log(xd);
//   console.log(xd2);
//   btn.addEventListener('click', salvesta());
//   function salvesta(){
//     console.log(xd);
//     console.log(xd2);
//     console.log('test1');
//     if(message1.value!="") {
//       console.log("test2");
//       $.ajax({
//         url: "server.php",
//         type: "POST",
//         async: true,
//         data: { msg:$("#message1").val() }, //your form data to post goes here as a json object
//         dataType: "html",
//         success: function(data) {
//           $('#output').html(data);
//           console.log("töötab");
//         },
//       });
//     } else {
//       console.log("pole datat");
//     }
//   }
// });
