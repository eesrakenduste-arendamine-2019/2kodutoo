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
  <form action="server.php" method="POST">
    <input type="text" name="messageTitleAdd" id="messageTitle" placeholder="Lisa tegevuse pealkiri">
    <br><br>
    <input type="text" name="messageAdd" id="message" placeholder="Lisa tegevus">
    <br><br>
    <input type="date" name="expiredate" id="date" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" value="<?php echo $expiredate ?>">
      <br><br>
    <button type="submit" id="save" name="submit" >Save</button>
    <p class="form-message"></p>
  </form>
  <hr>
  <div id="responsecontainer" class="dataFromDb">teine showdata test</div>
</body>
</html>
