<?php
$todos = file_get_contents('database.txt');
$oTodos = json_decode($todos, true);
$searchTerm = $_GET['search'];

if(!$searchTerm) {
    echo json_encode($oTodos['content']);
    exit;
}

$results = [];

foreach ($oTodos['content'] as $value) {
    $title = $value['title']; 

    $searchResult = strpos($value['title'], $searchTerm);

    if ($searchResult !== false) {
        $results[] = $value;
    }
    // echo json_encode($value).PHP_EOL;
}


echo json_encode($results);