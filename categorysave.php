<?php
// require("config.php");
// $database = "if18_kristjan_po_1";
//var_dump($_POST);

$object = new StdClass();
$myData = $_POST["id"];
$myFile = "categories.json";

$object -> last_modified = time();
$object -> content = $myData;
$jsonString = json_encode($object);

if(file_put_contents($myFile, $jsonString, FILE_APPEND | LOCK_EX)){
 echo "Successful write";
} else {
  $jsonString = "[]";
  echo "Failure to save";
}



// $object = new StdClass();
// $object -> last_modified = time();
// $jsonString = json_encode($object);
// if(file_put_contents("categories.json", $jsonString)){
//     echo "success";
// }
//
// $file = file_get_contents("categories.json");
// if(!empty($file)){
//     $object = new StdClass();
//     $jsonString = json_decode($file);
//     $tasks = $jsonString -> content;
//     $tasks = json_encode($tasks);
// }
// else {
//     $tasks = "[]";
// }
// print_r($tasks);
// return $tasks;

?>
