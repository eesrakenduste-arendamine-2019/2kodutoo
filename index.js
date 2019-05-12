var order = [];
$('#saveAndOrder').on('click', function(){
alert("save");
    var myData = $('form1').serializeArray();
  order.push(myData);
});

$('#saveData').on('click', function(){
  var myData = $('form1').serializeArray();
  var data = []
  data.push(myData);
  data.push(order);
  alert(data);
  console.log(myData);
  console.log(order);
  $.ajax({
    url: 'server.php',
    method: 'POST',
    data: data,
    success: function(data) {
      console.log("function success data");
      $('#output').html('Thank you...');
    }
  });
});