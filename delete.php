<?php 
include "config.php";
$id = $_POST['id'];
$query = "delete * from sonumid where id = $id";
exit;