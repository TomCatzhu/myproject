<?php
header("Content-Type:application/json");
@$kw=$_REQUEST['kw'];
if(empty($kw)){
   echo '[]';
   return;
}
require("1_init.php");
$sql = "select did,name,img_sm,price,material from fl_dish where name like '%$kw%' or material like '%$kw%'";
//$sql="SELECT *FROM fl_dish where name like '%$kw%' ";
$result=mysqli_query($conn,$sql);
$output=[];
while(true){
$row=mysqli_fetch_assoc($result);
if(!$row){
    break;
}
$output[]=$row;
}
echo json_encode($output);
