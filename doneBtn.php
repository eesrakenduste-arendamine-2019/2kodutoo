<?php 
    $serverHost = "localhost";
    $serverUsername = "if18";
    $serverPassword = "ifikas18";
    $database = "if18_eesrakenduste_todo";
    
   
    function updateStatus($title, $description,$dateT){
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