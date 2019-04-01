<?php
require("functions.php");
//kui pole sisse loginud

//kontrollib kas on sisselogitud
if(!isset($_SESSION["userId"])){
    header("Location: index.php");
    exit();
}

if(isset($_GET["logout"])){
    session_destroy();
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
    <script src="sidebar.js"></script>
    <title>Pealeht</title>
</head>
<body>
    <div class="title">
        <div id="menuButton"><span style="font-size:60px;cursor:pointer" onclick="toggleNav()">&#9776;</span></div>
        <a>Tere,  <?php echo $_SESSION["username"]; ?></a>
    </div>

    <div id="mySidenav" class="sidenav">
        <h1>Menüü</h1>
            <a href="notebook.html">Märkmik</a>
            <a href="?logout=1">Logi välja</a>
    </div>
</body>
</html>