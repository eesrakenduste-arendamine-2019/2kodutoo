<?php
	require("functions.php");

	echo "<body style='background-color:#428cf4'>";

	$email = "";
	$name = "";

	//muutujad võimalike veateadetega
	$nameError = "";
	$emailError = "";
	$passwordError = "";
	
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
	}
	
	}//kui on nuppu vajutatud lõppeb ära

?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Create account</title>
</head>
<body>
	<h1>Konto loomine</h1>
	<br>
	
	<div id="signup">
		<form method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
			<label>Nimi:</label><br>
			<input name="firstName" type="text" value="<?php echo $name; ?>"><span><?php echo $nameError; ?></span><br>
			<label>E-mail (kasutajatunnus):</label><br>
			<input type="email" name="email" value="<?php echo $email; ?>"><br><span><?php echo $emailError; ?></span><br>
			<label>Salasõna:</label><br>
			<input type="password" name="password" type="text"><span><?php echo $passwordError; ?></span>
			<br>
			<input name="submitUserData" type="submit" value="Loo kasutaja">
		</form>
	</div>
</body>
</html>