<?php
require("server.php");
$expiredate = date("Y-m-d");

?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
  <link rel="stylesheet" type="text/css" href="index.css">
  <script>
  	$(document).ready(function() {
  		refreshStuff();
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
        refreshStuff();
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
  <hr>
  <div id="responsecontainer" class="dataFromDb">teine showdata test</div>
  <script id="source" language="javascript" type="text/javascript">
    function refreshStuff() {
    	$.ajax({    //create an ajax request to display.php
        type: "GET",
        url: "showdata.php",             
        dataType: "html",   //expect html to be returned                
        success: function(response){                    
            $("#responsecontainer").html(response); 
            //alert(response);
        }
    });
   }; 
  </script>
</body>
</html>
