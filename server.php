<?php
if(isset($_POST["save"])){
    saveToFile($_POST["save"]);
}

if(isset($_POST["load"])){
    readFromFile();
}

function saveToFile($stringToSave){
    $object = new StdClass();
    $object -> last_modified = time();
    if ($stringToSave != null){ // Whether there are tasks to save
        $object -> content = $stringToSave;
    }
    $jsonString = json_encode($object);
    if(file_put_contents("database.json", $jsonString)){
        echo "success";
    }
}

function readFromFile(){ // WIP
    $file = file_get_contents("database.json")
    if($file != null){
        $object = new StdClass();
        $jsonString = json_decode($file);
        $tasks = $jsonString -> content;
    }

    return $tasks;
}

?>