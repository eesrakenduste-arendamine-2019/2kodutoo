<?php
  require("../../config.php");
  $database = "if18_markus_mu_1";
  session_start();
  function addmsg($message, $expiredate){
    $mysqli = new mysqli($GLOBALS["serverHost"], $GLOBALS["serverUsername"],$GLOBALS["serverPassword"], $GLOBALS["database"]);
    echo $mysqli->error;
    #$stmt = $mysqli->prepare("INSERT INTO sonumid (sonum, expiredate) VALUES (?, ?)");
    $stmt = $mysqli->prepare("INSERT INTO sonumid (sonum) VALUES ('".$_POST['messages']."')");
	  echo $mysqli->error;
    $stmt->bind_param("ss", $message, $expiredate);
    if($stmt->execute()){
	  echo $message.$expiredate;
	} else {
	  echo $stmt->error;
	}
  $stmt->close();
  $mysqli->close();


  }

  ?>
