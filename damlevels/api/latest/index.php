<?php 
header('Content-Type: application/json');

//Latest figures

include("../../conf.php");




$db = new mysqli($hostname, $mysql_login, $mysql_password, $database);
if($db->connect_errno > 0){ die('Unable to connect to database [' . $db->connect_error . ']'); }


$query = "Select * from damlevels order by date desc, id asc limit 11";

$dbquery = $db->query($query);

$count = 0; 


while($row = $dbquery->fetch_assoc()){
    $results[$count] = $row;
    $count++;
}


$results = json_encode($results);

echo $results;


?>