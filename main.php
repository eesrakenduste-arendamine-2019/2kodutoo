<?php
require("functions.php");
//kui pole sisse loginud

//kontrollib kas on sisselogitud
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
    <link rel="stylesheet" type="text/css" href="main.css">
    <title>Pealeht</title>
</head>
<body>
    <div class="title">
        <div id="menuButton"><span style="font-size:60px;cursor:pointer" onclick="navToggle()">&#9776;</span></div>
        <a>Pealeht</a>
        <div id="logout"><span style="font-size:20px;cursor:pointer" onclick="openNav()">Logi välja</div>
    </div>

    <div id="mySidenav" class="sidenav">
        <h1>Menu</h1>
            <a href="javascript:void(0)" onclick="changeTheme()">Märkmik</a>
            <a href="javascript:void(0)" onclick="changeFontSize()">Logivälja</a>
    </div>
    
    <div id="welcome">Olete sisse loginud nimega : <?php echo $_SESSION["username"]; ?></div>
    <div id="notebook">Todo märkmik</div>
</body>
</html>