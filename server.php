<?php 
    $serverHost = "localhost";
    $serverUsername = "if18";
    $serverPassword = "ifikas18";
    $database = "if18_eesrakenduste_todo";
    //session_start();
    // && isset($_POST["desc"]) && !empty($_POST["desc"]) && isset($_POST["time"]) && !empty($_POST["time"])
    if(isset($_POST["title"]) && !empty($_POST["title"]) && isset($_POST["desc"]) && !empty($_POST["desc"]) && isset($_POST["time"]) && !empty($_POST["time"])){
        echo 2;
        saveToFile($_POST["title"],$_POST["desc"],$_POST["time"]);
    } else {
        echo 1;
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
    function saveToFile($title, $description,$dateT){
        //echo "Töötab!";
        $test =  "korras";
        $myTitle = json_encode($title);
        $myDesc = json_encode($description);
        $myDate = json_encode($dateT);
        $mysqli = new mysqli($GLOBALS["serverHost"], $GLOBALS["serverUsername"], $GLOBALS["serverPassword"], $GLOBALS["database"]);
        $stmt = $mysqli->prepare("INSERT INTO todo (title, descriptionT, dateT) VALUES (?,?,?)");
        echo $mysqli->error;
        $stmt->bind_param("sss", $myTitle, $myDesc, $myDate);//s - string, i - integer, d - decimal
        $stmt->execute();
        $stmt->close();
        $mysqli->close();
        echo $test;
        return $test;
    }
?>