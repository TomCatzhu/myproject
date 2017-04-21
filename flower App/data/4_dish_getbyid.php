<?php
header("Content-Type:application/json");
@$id=$_REQUEST['id'];
if(empty($id)){
    echo '[]';
    return;
}
require('1_init.php');
//$sql = "select did,name,img_lg,price,material from kf_dish where did=$id";
$sql="SELECT * FROM fl_dish WHERE did=$id";
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