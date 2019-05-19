<?php 
require("../../config.php");
$database = "if18_markus_mu_1";
$con = mysqli_connect($GLOBALS["serverHost"], $GLOBALS["serverUsername"],$GLOBALS["serverPassword"]);
$db_select = mysqli_select_db($con, $database);
$id = $_POST['delete_id'];
$query = "delete from sonumid where id = {$id}";
$con->query($query);
exit;