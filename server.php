<?php
    if (isset($_POST["save"]) && !empty($_POST["save"])) {
        saveToFile($_POST["save"]);
    }

    function saveToFile($stringToSave)
    {
        $object = [];
        $object['last_modified'] = time();
        $object['content'] = json_decode($stringToSave);
        $jsonString=json_encode($object);
        if (file_put_contents("database.txt",$jsonString)) {
            echo "SUCCESS";
        }
    }
 ?>
