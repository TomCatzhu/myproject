<?php
header("Content-Type:application/json");
@$phone=$_REQUEST['phone'];
if(empty($phone)){
    echo "[]";
    return;
}
require('1_init.php');
$sql = "select fl_order.did,fl_order.oid,fl_order.order_time,fl_order.addr,fl_dish.img_sm ,fl_dish.did from fl_dish,fl_order where fl_order.did=fl_dish.did AND fl_order.phone='$phone'";
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
