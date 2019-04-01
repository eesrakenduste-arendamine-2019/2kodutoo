<?php
require ("../../../../config.php");
$database = "if18_ET";
session_start();

function signin($email, $password){
	$notice = "";
	$mysqli = new mysqli($GLOBALS["serverHost"], $GLOBALS["serverUsername"], $GLOBALS["serverPassword"], $GLOBALS["database"]);
	$stmt = $mysqli->prepare("SELECT user_id, username, password FROM users WHERE email=?");
	echo $mysqli->error;
	$stmt->bind_param("s", $email);
	$stmt->bind_result($idFromDb, $usernameFromDb, $passwordFromDb);
	if($stmt->execute()){
		//kui päring õnnestus
		if($stmt->fetch()){
			//kasutaja on olemas
			if(password_verify($password, $passwordFromDb)){
				//kui salasõna klapib
				$notice = "Logisite sisse!";
				//määran sessioonimuutujad
				$_SESSION["userId"] = $idFromDb;
				$_SESSION["username"] = $usernameFromDb;
				$_SESSION["userEmail"] = $email;
				//liigume kohe main.php
				$stmt->close();
				$mysqli->close();
				header("Location: main.php");
				exit();
			}else{
				$notice = "Vale salasõna!";
			} 
		}else{
			$notice = "Kasutaja (". $email. ") ei ole olemas!" .$stmt->error;
		}
	}else{
		$notice = "Sisse logimisel tekkis viga!" .$stmt->error;
	}

	$stmt->close();
	$mysqli->close();
	return $notice;
}

function signup($name, $email, $password){
	$notice = "";
	$mysqli = new mysqli($GLOBALS["serverHost"], $GLOBALS["serverUsername"], $GLOBALS["serverPassword"], $GLOBALS["database"]);
	$stmt = $mysqli->prepare("INSERT INTO users (username, email, password) VALUES(?,?,?)");
	echo $mysqli->error;
	//krüpteerin parooli, kasutades juhuslikku soolamisfraasi (salting_string)
	$options = [
		"cost" => 12,
		"salt" => substr(sha1(rand()), 0, 22),
		];
	$pwdhash = password_hash($password, PASSWORD_BCRYPT, $options);
	$stmt->bind_param("sss", $name, $email, $pwdhash);
	if($stmt->execute()){
		$notice = "Ok!";
	}else{
		$notice = "Error" .$stmt->error;
	}
	$stmt->close();
	$mysqli->close();
	return $notice;
}

function test_input($data) {
	//echo "Koristan!\n";
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}
?>