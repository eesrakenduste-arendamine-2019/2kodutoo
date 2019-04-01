<?php
require("functions.php");
//kui pole sisse loginud

if(!isset($_SESSION["userId"])){
    header("Location: index.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Pealeht</title>
</head>
<body>
    <div id="title">Pealeht</div>
    <p>Olete sisse loginud nimega : <?php echo $_SESSION["username"]; ?>
</body>
</html>