<?php
include_once("connection.php");
$db = new dbObj();
$connString =  $db->getConnstring();

$sql_query = "SELECT * FROM tasks";
$resultset = mysqli_query($connString, $sql_query) or die("database error:". mysqli_error($conn));
$tasks = array();
while( $rows = mysqli_fetch_assoc($resultset) ) {
    $tasks[] = $rows;
}