<?php
require("../../config.php");
$database = "if18_markus_mu_1";
session_start();
//var_dump($_POST);
if (isset($_POST['submit'])) {	
	$messageTitle = $_POST['tegevusTitle'];
	$message = $_POST['tegevus'];
	$expireDate = $_POST['expireDate'];
	if(empty($message) || empty($expireDate) || empty($messageTitle)) {
		echo "<span>Please add an event to add</span>";
		?><script>console.log("Täida palun kõik väljad");</script><?php
	} else {
		echo "<span>Event added!</span>";	
		addmsg($messageTitle, $message, $expireDate);	
	}
}

function addmsg($messageTitle, $message, $expireDate){
			//echo "<span>toimib</span>";
			$mysqli = new mysqli($GLOBALS["serverHost"], $GLOBALS["serverUsername"],$GLOBALS["serverPassword"], $GLOBALS["database"]);
			echo $mysqli->error;
			$stmt = $mysqli->prepare("INSERT INTO sonumid (Title, sonum, expiredate) VALUES (?,?,?)");
			echo $mysqli->error;
			$stmt->bind_param("sss", $messageTitle, $message, $expireDate);
			if($stmt->execute()){
				//echo "Sõnum " + $message + $expireDate + " lisatud";
			} else {
				echo $stmt->error;
			}
			$stmt->close();
			$mysqli->close();
		}
		//algne php fetch test
		/*function getmsg(){
			$html = "";
			$mysqli = new mysqli($GLOBALS["serverHost"], $GLOBALS["serverUsername"], $GLOBALS["serverPassword"], $GLOBALS["database"]);
			$stmt = $mysqli->prepare("SELECT Title, sonum, expiredate FROM sonumid");
			echo $mysqli->error;
			$stmt->bind_result($messageTitleDb, $messageDb, $expireDateDb);
			$stmt->execute();
			echo $stmt->error;
			while ($stmt->fetch()){
				$html .= "<p> Pealkiri: " .$messageTitleDb. "</p> \n";
				$html .= "<p> Meelespea: " .$messageDb. "</p> \n";
				$html .= "<p> Tähtaeg: " .$expireDateDb. "</p> \n";
				$html .="<hr>";
			}
			$stmt->close();
			$mysqli->close();
			return $html;
		}*/
?>
