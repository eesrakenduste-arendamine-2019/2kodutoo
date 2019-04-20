<?php
  if(isset($_POST["save"]) && !empty($_POST["save"])){
    saveToFile($_POST["save"]);
  }
  function saveToFile($stringToSave){
    $object = new stdClass();
    $object->last_modifies = time();
    $object->content = $stringToSave;
    $jsonString = json_encode($object);
    if(file_put_contents("database.txt", $jsonString)){
      echo "success";
    }
//.always
  }
 ?>