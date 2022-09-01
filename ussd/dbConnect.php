<?php 

$dbName = 'wdmprod';
$conn 	= mysqli_connect("localhost","wdmsecuser","78&#Doc*",$dbName) or die(mysqli_error()); 

// Check connection
if (mysqli_connect_errno()){
echo "Failed to connect to MySQL: " . mysqli_connect_error();
}


?>
