<?php
//Initialise an object to store data in an array
$data = array();

 // Create connection
$link = mysqli_connect("34.68.58.240", "root", "root", "coral_data");

// Check connection
if (!$link) {
    die("Connection failed: " . mysqli_connect_error());
}

// Querying the table from the database 
$sql = "SELECT PolymerType,Sum(Length) as Total FROM plastic WHERE PolymerType NOT LIKE '%PolymerType%' GROUP BY PolymerType;";
$result = mysqli_query($link, $sql);

foreach ($result as $row) {
    $data[] = $row;
   }
   // Displaying output  
    echo json_encode($data, JSON_NUMERIC_CHECK);

//Close connection    
$result->close();
mysqli_close($link);    
?>