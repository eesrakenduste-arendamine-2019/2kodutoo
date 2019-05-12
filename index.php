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
  			var tegevus = $("#message").val();
  			var submit = $("#save").val();
  			$(".form-message").load("server.php", {
          tegevus: tegevus,
          submit: submit
        });
  		});
  	});
  </script>
  <title>Katkine kodutöö</title>
</head>
<body>
  <form action="server.php" method="POST">
    <input type="text" name="messageAdd" id="message" placeholder="Lisa tegevus">
    <br><br>
    <input type="date" name="expiredate" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" value="<?php echo $expiredate ?>">
      <br>
    <button type="submit" id="save" name="submit" >Save</button>
    <p class="form-message"></p>
  </form>
  <div id="output"></div>
</body>
</html>
