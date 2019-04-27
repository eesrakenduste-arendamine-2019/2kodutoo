<?php include('server.php'); ?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ToDo App</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="background">
  	<form class="taskform" hidden>
      <div>
        <label for="task">Ülesanne:</label>
        <textarea name="task" id="task" cols="30" rows="3"
        placeholder="Kirjuta midagi..."></textarea>
      </div>
      <div>
        <label for="taskdate">Kuupäev:</label>
      	<input type="date" name="taskdate" id="taskdate"
        title="Automaatselt tuleb tänane kuupäev, kui ise ei vali">
      </div>
      <button type="button" id="submit_btn">Salvesta</button>
      <button type="button" id="update_btn" style="display: none;">Uuenda</button>
      <br><br>
      <input id="search" type="text" placeholder="Otsi teksti või kuupäeva järgi...">
  	</form>
    <?php echo $tasks; ?>
  </div>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
  <script src="index.js"></script>
</body>
</html>
