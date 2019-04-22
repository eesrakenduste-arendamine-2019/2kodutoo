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

$id =  $_SESSION["userId"];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" href="main.css">
    <script src="sidebar.js"></script>
    <script type="text/javascript">
        var sessId = '<?php echo $id; ?>';
    </script>
    <title>Pealeht</title>
</head>
<body>
    <div class="title">
        <div id="menuButton"><span style="font-size:60px;cursor:pointer" onclick="toggleNav()">&#9776;</span></div>
        <a>Tere,  <?php echo $_SESSION["username"]; ?></a>
    </div>
    <br><br><br><br><br>
    <div id="mySidenav" class="sidenav">
        <h1>Menüü</h1>
            <a href="?logout=1">Logi välja</a>
    </div>
    <div class="notebook">
        <input type="text" id="task">
        <input type="date" id="date">
        <br>
        <button id="addButton">LISA</button>
        <button id="saveButton">SALVESTA</button>
        <button id="loadButton">LAE</button>
        <div id="todos">Siia tulevad todod</div>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="notebook.js"></script>
</body>
</html>