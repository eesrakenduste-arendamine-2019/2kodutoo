<?php
 var_dump($_POST);
 // die;

  function saveCategory($stringToSave){
    $object = new StdClass();
    $object->last_modified = time();
    $object->content = $stringToSave;
    $jsonString = json_encode($object);
    if(file_put_contents("categories.txt", $jsonString)){
      echo "success";
    }
  }

?>
