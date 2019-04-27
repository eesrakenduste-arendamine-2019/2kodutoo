<?php
  $conn = mysqli_connect('localhost', 'if18', 'ifikas18', 'if18_laur_to_1');
  if (!$conn) {
    die('Connection failed ' . mysqli_error($conn));
  }
  if (isset($_POST["save"])) {
    if (!empty($_POST["task"])) {
      $task = preg_replace('/[^0-9a-zA-Z_üõöäÜÕÖÄ\s]/',"", $_POST["task"]);
      $wrongtaskdate = preg_replace('/[^0-9a-zA-Z_üõöäÜÕÖÄ\s]/',"", $_POST["taskdate"]);
      $taskdate = date("d.m.Y", strtotime($wrongtaskdate));
      if (empty($_POST["taskdate"])){
        $taskdate=date("d.m.Y");
      }
    	$sql = "INSERT INTO todoapp (task, taskdate) VALUES ('{$task}', '{$taskdate}')";
    	if (mysqli_query($conn, $sql)) {
    	  $id = mysqli_insert_id($conn);
        $savedtask = '<div class="taskbox">
        		<span class="delete" data-id="' . $id . '" >kustuta</span>
        		<span class="edit" data-id="' . $id . '">muuda</span>
        		<div class="tasktext">'. $task .'</div>
        		<div class="taskdatetext">'. $taskdate .'</div>
        	</div>';
    	  echo $savedtask;
    	}else {
    	  echo "Error: ". mysqli_error($conn);
    	}
    	exit();
    }
  }

  if (isset($_GET["delete"])) {
  	$id = $_GET["id"];
  	$sql = "DELETE FROM todoapp WHERE id=" . $id;
  	mysqli_query($conn, $sql);
  	exit();
  }

  if (isset($_POST["update"])) {
  	$id = $_POST["id"];
    $task = preg_replace('/[^0-9a-zA-Z_üõöäÜÕÖÄ\s]/',"", $_POST["task"]);
    $wrongtaskdate = preg_replace('/[^0-9a-zA-Z_üõöäÜÕÖÄ\s]/',"", $_POST["taskdate"]);
    $taskdate = date("d.m.Y", strtotime($wrongtaskdate));
    if (empty($_POST["taskdate"])){
      $taskdate=date("d.m.Y");
    }
  	$sql = "UPDATE todoapp SET task='{$task}', taskdate='{$taskdate}' WHERE id=".$id;
  	if (mysqli_query($conn, $sql)) {
  		$id = mysqli_insert_id($conn);
  		$savedtask = '<div class="taskbox">
  		  <span class="delete" data-id="' . $id . '" >kustuta</span>
  		  <span class="edit" data-id="' . $id . '">muuda</span>
  		  <div class="tasktext">'. $task .'</div>
  		  <div class="taskdatetext">'. $taskdate .'</div>
  	  </div>';
  	  echo $savedtask;
  	}else {
  	  echo "Error: ". mysqli_error($conn);
  	}
  	exit();
  }

  $today = new DateTime();
  $sql = "SELECT * FROM todoapp ORDER BY id ASC";
  $result = mysqli_query($conn, $sql);
  $tasks = '<div id="display_area">';
  while ($row = mysqli_fetch_array($result)) {
    $date = DateTime::createFromFormat("d.m.Y", $row["taskdate"]);
    $interval=$today->diff($date);
    $elapsed = $interval->format("%a");
      if ($today>$date) {
        if ($elapsed==1) {
          $tasks .= '<div class="taskboxExpired" hidden>
    		  <span class="delete" data-id="' . $row["id"] . '" >kustuta</span>
    		  <span class="edit" data-id="' . $row["id"] . '">muuda</span>
    		  <div class="tasktext">'. $row["task"] .'</div>
    		  <div class="taskdatetext">'. $row["taskdate"] . " - ". $elapsed." päev tagasi".'</div>
    	  </div>';
      }else{
        $tasks .= '<div class="taskboxExpired" hidden>
  		  <span class="delete" data-id="' . $row["id"] . '" >kustuta</span>
  		  <span class="edit" data-id="' . $row["id"] . '">muuda</span>
  		  <div class="tasktext">'. $row["task"] .'</div>
  		  <div class="taskdatetext">'. $row["taskdate"] . " - ". $elapsed." päeva tagasi".'</div>
  	  </div>';
      }
    }elseif ($today==$date){
      $tasks .= '<div class="taskboxToday" hidden>
      <span class="delete" data-id="' . $row["id"] . '" >kustuta</span>
      <span class="edit" data-id="' . $row["id"] . '">muuda</span>
      <div class="tasktext">'. $row["task"] .'</div>
      <div class="taskdatetext">'. $row["taskdate"] . " - TÄNA".'</div>
    </div>';
    }elseif ($today<$date) {
        $tasks .= '<div class="taskbox" hidden>
  		  <span class="delete" data-id="' . $row["id"] . '" >kustuta</span>
  		  <span class="edit" data-id="' . $row["id"] . '">muuda</span>
  		  <div class="tasktext">'. $row["task"] .'</div>
  		  <div class="taskdatetext">'. $row["taskdate"] . " - ". $elapsed." päeva pärast".'</div>
  	  </div>';
    }
  }
  $tasks .= '</div>';
?>
