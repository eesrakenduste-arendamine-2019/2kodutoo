<?php 
    $serverHost = "localhost";
    $serverUsername = "if18";
    $serverPassword = "ifikas18";
    $database = "if18_eesrakenduste_todo";
    session_start();
    if(isset($_POST["save"]) && !empty($_POST["save"])){
        saveToFile($_POST["save"]);

    }
/*     function saveToFile($stringToSave){
        $object = new StdClass();
        $object->last_modified = time();
        $object->content = $stringToSave;
        $jsonString = json_encode($object);
        if(file_put_contents("database.txt", $jsonString)){
            echo "Success";
        }
    } */
    /*function saveToFile($stringToSave){
        $object = new StdClass();
        $object->content = $stringToSave;
        echo $object->content;
        echo "Success";
    }*/
    function saveToFile($stringToSave){
        echo "Töötab!";
        $lo = json_decode($stringToSave);
        $jsonString = json_encode($lo[0]->title);
        $mysqli = new mysqli($GLOBALS["serverHost"], $GLOBALS["serverUsername"], $GLOBALS["serverPassword"], $GLOBALS["database"]);
        $stmt = $mysqli->prepare("INSERT INTO todo (content) VALUES (?)");
        echo $mysqli->error;
        $stmt->bind_param("s", $jsonString);//s - string, i - integer, d - decimal
        if ($stmt->execute()) {
            echo 'Info "'. $jsonString .'"'; 
        } 
        else { 
            echo "Sõnumi salvestamisel tekkis tõrge: ". $stmt->error; 
        }
        $stmt->close();
        $mysqli->close();
    }
?>