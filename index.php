<?php
require("server.php");
$expiredate = date("Y-m-d");
$messagesFromDb = getmsg();

?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
  <link rel="stylesheet" type="text/css" href="index.css">
  <script>
  	$(document).ready(function() {
  		$("form").submit(function(event) {
  			event.preventDefault();
        var tegevusTitle = $("#messageTitle").val();
  			var tegevus = $("#message").val();
  			var submit = $("#save").val();
        var expireDate = $("#date").val();
  			$(".form-message").load("server.php", {
          tegevusTitle: tegevusTitle,
          tegevus: tegevus,
          expireDate: expireDate,
          submit: submit
        });
  		});
  	});
  </script>
  <title>Katkine kodutöö</title>
</head>
<body>
  <form action="server.php" method="POST">
    <input type="text" name="messageTitleAdd" id="messageTitle" placeholder="Lisa tegevuse pealkiri">
    <br><br>
    <input type="text" name="messageAdd" id="message" placeholder="Lisa tegevus">
    <br><br>
    <input type="date" name="expiredate" id="date" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" value="<?php echo $expiredate ?>">
      <br>
    <button type="submit" id="save" name="submit" >Save</button>
    <p class="form-message"></p>
  </form>
  <div id="output"></div>
  <?php echo $messagesFromDb; ?>
  <h2>showdata.php näide</h2>
  <div id="output">jquery asendab selle dataga</div>
  <script id="source" language="javascript" type="text/javascript">
    $(document).ready(function()
    {
      $.ajax({                                      
        url: 'showdata.php',                       
        data: "",                        
        dataType: 'json',                
        success: function(data)        
        {
          var id = data[0];              
          var titleDb = data[1]; 
          var msgDb = data[2];
          var expireDb = data[3];
          var checkedDb = data[4];       
          $('#output').html("<b>Title: </b>"+titleDb+"<b> message: </b>"+msgDb+"<b> expiredate: </b>"+expireDb);
        }
      });
    }); 
  </script>
</body>
</html>
