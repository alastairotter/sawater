<?php
include("simple_html_dom.php");
include("conf.php");

// DB

$db = new mysqli($hostname, $mysql_login, $mysql_password, $database);
if($db->connect_errno > 0){ die('Unable to connect to database [' . $db->connect_error . ']'); }



// GET DATE
$html = file_get_html('http://www.dwa.gov.za/hydrology/Weekly/ProvinceWeek.aspx?region=EC');
$element = $html->find("table", 3);
$row = $element->find('font', 0);
$text = $row->find('b');

$text = str_replace("Eastern Cape Province State of Dams on ", "", $text[0]);
$text = str_replace("<b>", "", $text);
$date = str_replace("</b>", "", $text);

// Check date
$query = "SELECT * from damlevels where date = '$date'";
$query = $db->query($query);
$check = $query->num_rows;

if($check < 10) { 
    
    if($check > 0) { 
        
        // deletes records that weren't completed. 
    
        $query = "delete from damlevels where date = '$date'";
        $query = $db->query($query);
        
    }

// Create DOM from URL or file
$html = file_get_html('http://www.dwa.gov.za/hydrology/Weekly/SumProvince.aspx');


$element = $html->find("table", 4);
//echo $element;

for($x = 1; $x < 12; $x++) { 
    
    $row = $element->find("tr", $x);
        $cell[0] = $date;
        for($y = 0; $y < 5; $y++) { 
            $cell[] .= $row->find("td", $y);
            
        }
    
//        echo "<pre>";
//        var_dump($cell);
//        echo "</pre>";
    
        $ddate = $cell[0];
        $prov = strip_tags($cell[1]);
        $fsc = strip_tags($cell[2]);
        $tw = strip_tags($cell[3]);
        $lw = strip_tags($cell[4]);
        $ly = strip_tags($cell[5]);
    
        $prov = str_replace("Total", "National", $prov);
    
        echo "FSC: " . $fsc . "<br />";
    
        $query = "INSERT into damlevels (date, province, fsc, this_week, last_week, last_year) VALUES('$ddate', '$prov', '$fsc','$tw', '$lw', '$ly')";
        $query = $db->query($query);
    
        $cell = array();
        
    
}
    
    // get national 
    $nat = $element->find("tr", 11);
    echo $nat;
    
}
    
    else { 
        echo "Already retrieved";
    
    }

$reportDate = date('Y-m-d H:i:s');

mail('alastair@mediahack.co.za', 'Dam levels retrieved', 'Dam levels successfully retrieved at ' . $reportDate);



//echo $html;

// Find all images 
//foreach($html->find('table') as $element) 
////       echo $element->src . '<br>';
//    echo $element;
//
//// Find all links 
//foreach($html->find('a') as $element) 
//       echo $element->href . '<br>';

?>