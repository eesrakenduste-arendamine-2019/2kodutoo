<?php
require ("../../../../config.php");
$database = "if18_ET";

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