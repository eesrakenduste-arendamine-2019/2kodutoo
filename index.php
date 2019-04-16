<?php
    require("functions.php");
	echo "<body style='background-color:#438ef7'>";
    $notice = "";
    $email = "";
    $emailError = "";
    $passwordError = "";
    
    if(isset($_POST["login"])){
        if (isset($_POST["email"]) and !empty($_POST["email"])){
        $email = test_input($_POST["email"]);
        } else {
        $emailError = "Palun sisesta kasutajatunnusena e-posti aadress!";
        }
    
        if (!isset($_POST["password"]) or strlen($_POST["password"]) < 8){
        $passwordError = "Palun sisesta parool, vähemalt 8 märki!";
        }
    
    if(empty($emailError) and empty($passwordError)){
        $notice = signin($email, $_POST["password"]);
        } else {
        $notice = "Sisselogimine ebaõnnestus!";
    }
    
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" href="index.css">
    <title>TODO Märkmik</title>
</head>
<body>
    <div id="main">
        <h1>Sisselogimine</h1>
        <form method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
            <input type="email" name="email" placeholder="E-Mail" value="<?php echo $email; ?>"><br>
            
            <input name="password" type="password" placeholder="Salasõna"><br>
            
            <input name="login" type="submit" value="Logi sisse">
        </form>
        <a style="text-align:left;" href="newuser.php">Loo kasutaja</a>
        <a > | </a>
        <a href="newuser.php">Unustasid salasõna?</a>
        <br>
        <a><?php echo $notice; ?></a>
    </div><br>

</body>
</html>