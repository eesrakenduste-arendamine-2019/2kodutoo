<?php
require("server.php");
$expiredate = date("Y-m-d");
//var_dump($_POST);
// if(isset($_POST["submitMessage"])) {
//   addmsg($_POST["message"], $_POST["expiredate"]);
// }

?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <script src="jquery-3.4.0.min.js"></script>
    <link rel="stylesheet" type="text/css" href="index.css">
    <title></title>
  </head>
  <body>
    <label>Sõnum (max 256 märki):</label>
    <br>
    <p id="ants">as123ds3adas</p>

      <input type="text" id="message1" placeholder="Lisa tegevus">

    <!-- <textarea name="message" rows="4" cols="64" placeholder="Lisa tegevus"></textarea> -->
      <br>
      <!-- <input type="date" name="expiredate" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" value="<?php echo $expiredate ?>">
      <br> -->

      <input type="submit" id="saveData" value="Salvesta">

    <hr>
    <div id="output">

    </div>
    <script src="index.js"></script>
  </body>

</html>
