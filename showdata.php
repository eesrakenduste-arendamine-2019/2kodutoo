<?php 
	require("../../config.php");
    $database = "if18_markus_mu_1";
    $tableName = "sonumid";
    $con = mysqli_connect($GLOBALS["serverHost"], $GLOBALS["serverUsername"],$GLOBALS["serverPassword"]);
    if (!$con) {
      die('Could not connect: ' . mysqli_error($con));
    }


	$db_select = mysqli_select_db($con, $database);
	if (!$db_select) {
    die("Database selection failed: " . mysqli_error($connection));
	}

	$result = mysqli_query($con, "SELECT * FROM $tableName");  

	 while($data = mysqli_fetch_row($result))
	 	{	
	 		echo "<p> Pealkiri: $data[1]</p> \n";
			echo "<p> Meelespea:$data[2]</p> \n";
			echo "<p> Tähtaeg:$data[3]</p> \n";
			echo "<hr>";
		} 
	  
?>