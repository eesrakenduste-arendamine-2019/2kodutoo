<?php
require("../../config.php");
$database = "if18_markus_mu_1";
session_start();
var_dump($_POST);
if (isset($_POST['submit'])) {	
	$message = $_POST['tegevus'];
	$errorEmpty = false;

	if(empty($message)) {
		echo "<span>ERROR</span>";
		?><script>console.log("joujoujou");</script><?php
	} else {
		addmsg($message);
		
		
	}

}

function addmsg($message){
			echo "<span>toimib</span>";
			$mysqli = new mysqli($GLOBALS["serverHost"], $GLOBALS["serverUsername"],$GLOBALS["serverPassword"], $GLOBALS["database"]);
			echo $mysqli->error;
			$stmt = $mysqli->prepare("INSERT INTO sonumid (sonum) VALUES (?)");
			echo $mysqli->error;
			$stmt->bind_param("s", $message);
			if($stmt->execute()){
				echo $message;
			} else {
				echo $stmt->error;
			}
			$stmt->close();
			$mysqli->close();
		}

?>

<script>
  var errorEmpty = "<?php echo $errorEmpty; ?>";

  if (errorEmpty == true) {
    console.log("Palun sisesta sõnum");
  }
</script>




