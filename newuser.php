<?php
	require("functions.php");

	echo "<body style='background-color:#428cf4'>";

	$email = "";
	$name = "";

	//muutujad võimalike veateadetega
	$nameError = "";
	$emailError = "";
	$passwordError = "";
	$error = "";
	
	//kui on uue kasutaja loomise nuppu vajutatud
	if(isset($_POST["submitUserData"])){
	
	//var_dump($_POST); //Tähtis array $_POST

	if (isset($_POST["firstName"]) and !empty($_POST["firstName"])){
		//$name=$_POST["firstName"];
		$name = test_input($_POST["firstName"]);
	}else{
		$nameError="Palun sisesta eesnimi!";
	}

	if(isset($_POST["email"]) and !empty($_POST["email"])){
		$email = test_input($_POST["email"]);
	}else{
		$emailError = "Sisestage korrektne email!";
	}

	//passwordi kontroll

	if(strlen($_POST["password"]) < 8){
		$passwordError = "Salasõna peab olema vähemalt 8 tähemärgi pikkune";
	}
	//kui kõik on korras, siis salvestame kasutaja
	
	if(empty($nameError) and empty($emailError) and empty($passwordError)){
		$notice = signup($name ,$email, $_POST["password"]);
		echo $notice;
	}else{
		$error = "Kasutaja loomisel tekkis viga!";
	}
	
	}//kui on nuppu vajutatud lõppeb ära

?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="index.css">
	<title>Konto loomine</title>
</head>
<body>
	<br>
	
	<div id="main">
		<form method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
		    <h1>Konto loomine</h1>
			<input name="firstName" type="text" placeholder="Nimi" value="<?php echo $name; ?>"><br>
			<input type="email" name="email" placeholder="E-Mail" value="<?php echo $email; ?>"><br>
			<input type="password" name="password" type="text" placeholder="Salasõna" >
			<br>
			<input name="submitUserData" type="submit" value="Loo kasutaja">
		</form>
		<a><?php echo $error; ?></a>
	</div>
</body>
</html>