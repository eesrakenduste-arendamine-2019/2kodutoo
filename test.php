<?php 
    $serverHost = "localhost";
    $serverUsername = "if18";
    $serverPassword = "ifikas18";
    $database = "if18_eesrakenduste_todo";
	$notice = "";
    $mysqli = new mysqli($GLOBALS["serverHost"], $GLOBALS["serverUsername"], $GLOBALS["serverPassword"], $GLOBALS["database"]);
	$stmt = $mysqli->prepare("SELECT title, descriptionT FROM todo");
	echo $mysqli->error;
	$stmt->bind_result($title, $description);
	$stmt->execute();
	while($stmt->fetch()){
		$notice .= '{"last_modified":1554642311,"content":[{"title":' .$title .',"description":'.$description .'}]}';
	}
	$stmt->close();
	$mysqli->close();
	return $notice;
?>