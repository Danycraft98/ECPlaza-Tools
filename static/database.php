<?php
$db_info = json_decode($_GET["database"], true);
$sql = $_GET["sql"]
//$db = new mysqli(db_info['HOST'] + ':' + db_info['PORT'], db_info['USER'], db_info['PASSWORD'], db_info['NAME']);
$db = new SQLite3(db_info['NAME']);
if($db->connect_error) {
  exit('Could not connect');
}
echo $sql;
/*$stmt = $db->prepare($sql);
$stmt->bind_param("s", $_GET['q']);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($cid, $cname, $name, $adr, $city, $pcode, $country);
$stmt->fetch();
$stmt->close();

echo "<table>";
echo "<tr>";
echo "<th>CustomerID</th>";
echo "<td>" . $cid . "</td>";
echo "<th>CompanyName</th>";
echo "<td>" . $cname . "</td>";
echo "<th>ContactName</th>";
echo "<td>" . $name . "</td>";
echo "<th>Address</th>";
echo "<td>" . $adr . "</td>";
echo "<th>City</th>";
echo "<td>" . $city . "</td>";
echo "<th>PostalCode</th>";
echo "<td>" . $pcode . "</td>";
echo "<th>Country</th>";
echo "<td>" . $country . "</td>";
echo "</tr>";
echo "</table>";*/
?>