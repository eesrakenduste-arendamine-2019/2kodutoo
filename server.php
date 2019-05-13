<?php
  if(isset($_POST["save"]) && !empty($_POST["save"])){
    saveToFile($_POST["save"]);
  }
  function saveToFile($stringToSave){
    $object = new StdClass();//new empty class
    $object->last_modified = time();//last modified prop
    $object->content = $stringToSave;//content is the string
    $jsonString = json_encode($object);
    if(file_put_contents("database.txt", $jsonString)){
      echo "success";
    }
  }
?>