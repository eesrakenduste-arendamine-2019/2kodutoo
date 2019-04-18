<?php 
    $serverHost = "localhost";
    $serverUsername = "if18";
    $serverPassword = "ifikas18";
    $database = "if18_eesrakenduste_todo";

    if($_GET["function"] == "save"){
        if(isset($_POST["title"]) && !empty($_POST["title"]) && isset($_POST["desc"]) && !empty($_POST["desc"]) && isset($_POST["time"]) && !empty($_POST["time"])){
            saveToFile($_POST["title"],$_POST["desc"],$_POST["time"],$_POST["importance"]);
        }
    } else if($_GET["function"] == "data"){
        echo loadData();
    } else if($_GET["function"] == "swapStatus") {
        swapStatus($_POST["task_id"]);
    } else if($_GET["function"] == "deleteTask") {
        deleteTask($_POST["delete_id"]);
    }

    function swapStatus($task_id) {
        $mysqli = new mysqli($GLOBALS["serverHost"], $GLOBALS["serverUsername"], $GLOBALS["serverPassword"], $GLOBALS["database"]);
        $stmt = $mysqli->prepare("UPDATE todo SET doneT=1 WHERE id=?");
        $stmt->bind_param("i", $task_id);
        $stmt->execute();
        $stmt->close();
        $mysqli->close();
    }

    function saveToFile($title, $description,$dateT,$importance){
        //echo "Töötab!";
        $test =  "korras";
        $myTitle = json_encode($title);
        $myDesc = json_encode($description);
        $myDate = json_encode($dateT);
        $myImportance = json_encode($importance);
        $mysqli = new mysqli($GLOBALS["serverHost"], $GLOBALS["serverUsername"], $GLOBALS["serverPassword"], $GLOBALS["database"]);
        $stmt = $mysqli->prepare("INSERT INTO todo (title, descriptionT, dateT, importance) VALUES (?,?,?,?)");
        echo $mysqli->error;
        $stmt->bind_param("sssi", $myTitle, $myDesc, $myDate, $myImportance);//s - string, i - integer, d - decimal
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
        $stmt = $mysqli->prepare("SELECT id, title, descriptionT, dateT, doneT, importance FROM todo ORDER BY dateT");
        echo $mysqli->error;
        $stmt->bind_result($taskId,$title, $description, $dateT, $done, $import);
        $stmt->execute();
        while($stmt->fetch()){
            if($notFirst == 1){
                $notice .= ",";
                $notice .= '{"id":'.$taskId.',"title":' .$title .',"description":'.$description .',"date": '. $dateT .',"done": ' .$done .',"importance": ' .$import. '}';
            } else {
                $notice .= '{"id":'.$taskId.',"title":' .$title .',"description":'.$description .',"date": '. $dateT .',"done": ' .$done .',"importance": ' .$import. '}';
                $notFirst = 1;
            }

        }
        $notice .= "]}";
        $stmt->close();
        $mysqli->close();
        return $notice;
    }

    function deleteTask($task_id) {
        $mysqli = new mysqli($GLOBALS["serverHost"], $GLOBALS["serverUsername"], $GLOBALS["serverPassword"], $GLOBALS["database"]);
        $stmt = $mysqli->prepare("DELETE FROM todo WHERE id=?");
        $stmt->bind_param("i", $task_id);
        $stmt->execute();
        $stmt->close();
        $mysqli->close();
    }
?>