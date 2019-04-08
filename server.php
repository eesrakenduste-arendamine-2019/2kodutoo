<?php
  if(isset($_POST["save"]) && !empty($_POST["save"])){
    saveToFile($_POST["save"]);
  }
  function saveCategory($stringToSave){
    $object = new StdClass();
    $object->last_modified = time();
    $object->content = $stringToSave;
    $jsonString = json_encode($object);
    if(file_put_contents("categories.txt", $jsonString)){
      echo "success";
    }
  }

  function saveVehicle($stringToSave){
    $object = new StdClass();
    $object->last_modified = time();
    $object->content = $stringToSave;
    $jsonString = json_encode($object);
    if(file_put_contents("vehicles.txt", $jsonString)){
      echo "success";
    }
  }

?>
