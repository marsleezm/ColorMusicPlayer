<?php
header('Content-type: text/xml');
$user_name = "colormusicplayer";
$password = "Go!0767162024";
$database = "colormusicplayer";
$server = "colormusicplayer.db.11081827.hostedresource.com";

$xml_output = "<?xml version=\"1.0\"?>\n"; 
$db_handle = mysql_connect($server, $user_name, $password);
$db_found = mysql_select_db($database, $db_handle);


$U = $_POST['User']; // get data from the HTML form on new student form
$S = $_POST['Song'];
$H0 = $_POST['H0'];
$H1 = $_POST['H1'];
$H2 = $_POST['H2'];


    
$SQL = "
REPLACE INTO songscore  (User, Song, H0, H1, H2)
  VALUES ('$U', '$S', '$H0', '$H1', '$H2')";


if (!mysql_query($SQL))
{
  die('Error: ' . mysql_error($db_handle));
}
  
$SQL = "SELECT * FROM songglobscore WHERE Song='$S'";
$result = mysql_query($SQL);
$xml_output .= "<root>\n"; 
while ( $db_field = mysql_fetch_assoc($result) ) {
$xml_output .= "<H0>" . $db_field['H0'] . "</H0>";
$xml_output .= "<H1>" . $db_field['H1'] . "</H1>";
$xml_output .= "<H2>" . $db_field['H2'] . "</H2>";
}
$xml_output .= '</root>'."\n";


mysql_close($db_handle);
echo $xml_output;

?> 