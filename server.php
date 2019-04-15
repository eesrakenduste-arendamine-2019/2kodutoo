<?php 
    $serverHost = "localhost";
    $serverUsername = "if18";
    $serverPassword = "ifikas18";
    $database = "if18_eesrakenduste_todo";

    if($_GET["function"] == "save"){
        if(isset($_POST["title"]) && !empty($_POST["title"]) && isset($_POST["desc"]) && !empty($_POST["desc"]) && isset($_POST["time"]) && !empty($_POST["time"])){
            saveToFile($_POST["title"],$_POST["desc"],$_POST["time"]);
        }
    } else if($_GET["function"] == "data"){
        echo loadData();
    }
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
    function loadData(){
        $notFirst = 0;
        $notice = '{"content":[';
        $mysqli = new mysqli($GLOBALS["serverHost"], $GLOBALS["serverUsername"], $GLOBALS["serverPassword"], $GLOBALS["database"]);
        $stmt = $mysqli->prepare("SELECT title, descriptionT, dateT, doneT, id FROM todo ORDER BY dateT");
        echo $mysqli->error;
        $stmt->bind_result($title, $description, $dateT, $done, $taskId);
        $stmt->execute();
        while($stmt->fetch()){
            if($notFirst == 1){
                $notice .= ",";
                $notice .= '{"title":' .$title .',"description":'.$description .',"date": '. $dateT .',"done": ' .$done .',"id": ' .$taskId. '}';
            } else {
                $notice .= '{"title":' .$title .',"description":'.$description .',"date": '. $dateT .',"done": ' .$done .',"id": ' .$taskId. '}';
                $notFirst = 1;
            }

        }
        $notice .= "]}";
        $stmt->close();
        $mysqli->close();
        return $notice;
    }
    function taskDone(){
        echo "Vahur lisab enda funktsiooni siia";
    }
?>