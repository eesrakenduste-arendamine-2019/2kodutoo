<?php 
    require("functions.php");

    if(isset($_POST["save"]) && !empty($_POST["save"])){
        saveToFile($_POST["save"]);
    }

    function saveToFile($stringToSave){
        $object = new StdClass();
        $object->last_modified = time;
        $object->content = $stringToSave;
        $jsonString = json_encode($object);
        if(file_put_contents("data".$_SESSION["userId"] .".txt", $jsonString)){
            echo "success";
        }
    }
?>