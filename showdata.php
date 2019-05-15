<?php 
  require("../../config.php");
  $database = "if18_markus_mu_1";
  $tableName = "sonumid";

  $con = mysql_connect($GLOBALS["serverHost"], $GLOBALS["serverUsername"],$GLOBALS["serverPassword"]);
  $dbs = mysql_select_db($GLOBALS["database"], $con);
  $result = mysql_query("SELECT * FROM $tableName");         
  $array = mysql_fetch_row($result);                          
  echo json_encode($array);
?>