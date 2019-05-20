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
    <script type="text/javascript" src="index.js"></script>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
  <title>Katkine kodutöö</title>
</head>
<body>
  <form name="submitMessage" action="server.php" method="POST">
    <input class="form-control" cols="30" type="text" name="messageTitleAdd" id="messageTitle" placeholder="Lisa tegevuse pealkiri">
    <br><br>
    <textarea class="form-control" cols="30" type="textarea" name="messageAdd" id="message" placeholder="Lisa tegevus"></textarea>
    <br><br>
    <input type="date" name="expiredate" id="date" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" value="<?php echo $expiredate ?>">
      <br><br>
    <button class="btn btn-outline-primary" type="submit" id="save" name="submit" >Save</button>
    <p class="form-message">123</p>
  </form>
  <hr>
  <div id="responsecontainer" class="dataFromDb"></div>
</body>
</html>
