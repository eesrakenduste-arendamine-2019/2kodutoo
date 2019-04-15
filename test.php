<?php 
    $serverHost = "localhost";
    $serverUsername = "if18";
    $serverPassword = "ifikas18";
	$database = "if18_eesrakenduste_todo";
	$notFirst = 0;
	$notice = '{"content":[';
    $mysqli = new mysqli($GLOBALS["serverHost"], $GLOBALS["serverUsername"], $GLOBALS["serverPassword"], $GLOBALS["database"]);
	$stmt = $mysqli->prepare("SELECT title, descriptionT, dateT, doneT FROM todo");
	echo $mysqli->error;
	$stmt->bind_result($title, $description, $dateT, $done);
	$stmt->execute();
	while($stmt->fetch()){
		if($notFirst == 1){
			$notice .= ",";
			$notice .= '{"title":' .$title .',"description":'.$description .',"date": '. $dateT .',"done": ' .$done. '}';
		} else {
			$notice .= '{"title":' .$title .',"description":'.$description .',"date": '. $dateT .',"done": ' .$done. '}';
			$notFirst = 1;
		}

	}
	$notice .= "]}";
	$stmt->close();
	$mysqli->close();
	echo $notice;
	return $notice;
?>