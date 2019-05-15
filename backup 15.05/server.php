<?php
require("../../config.php");
$database = "if18_markus_mu_1";
session_start();
//var_dump($_POST);
if (isset($_POST['submit'])) {	
	$message = $_POST['tegevus'];
	$expireDate = $_POST['expireDate'];
	if(empty($message) || empty($expireDate)) {
		echo "<span>Please add an event to add</span>";
		?><script>console.log("ple sonumit");</script><?php
	} else {
		echo "<span>Event added!</span>";	
		addmsg($message, $expireDate);	
	}
}

function addmsg($message, $expireDate){
			//echo "<span>toimib</span>";
			$mysqli = new mysqli($GLOBALS["serverHost"], $GLOBALS["serverUsername"],$GLOBALS["serverPassword"], $GLOBALS["database"]);
			echo $mysqli->error;
			$stmt = $mysqli->prepare("INSERT INTO sonumid (sonum, expiredate) VALUES (?,?)");
			echo $mysqli->error;
			$stmt->bind_param("ss", $message, $expireDate);
			if($stmt->execute()){
				//echo "Sõnum " + $message + $expireDate + " lisatud";
			} else {
				echo $stmt->error;
			}
			$stmt->close();
			$mysqli->close();
		}

		function getmsg(){
			$html = "";
			$mysqli = new mysqli($GLOBALS["serverHost"], $GLOBALS["serverUsername"], $GLOBALS["serverPassword"], $GLOBALS["database"]);
			$stmt = $mysqli->prepare("SELECT sonum, expiredate FROM sonumid");
			echo $mysqli->error;
			$stmt->bind_result($messageDb, $expireDateDb);
			$stmt->execute();
			echo $stmt->error;
			while ($stmt->fetch()){
				$html .= "<p> Meelespea " .$messageDb. "</p> \n";
				$html .= "<p> Tähtaeg: \n" .$expireDateDb. "</p> \n";
				$html .="<hr>";
			}
			$stmt->close();
			$mysqli->close();
			return $html;
		}
?>
<script>$("#message, #date").val("");</script>