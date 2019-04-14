<?php
if(isset($_POST["save"])){
    saveToFile($_POST["save"]);
}

if(isset($_POST["load"])){
    loadFromFile();
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

function loadFromFile(){
    $file = file_get_contents("database.json");
    if(!empty($file)){
        $object = new StdClass();
        $jsonString = json_decode($file); // decode as array
        $tasks = $jsonString -> content; // get the content
        $tasks = json_encode($tasks); // encode as json again
    }
    else {
        $tasks = "[]";
    }

    print_r($tasks);
    return $tasks;
}

?>