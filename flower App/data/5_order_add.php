<?php
header("Content-Type:application/json");
@$user_name = $_REQUEST['user_name'];
@$sex = $_REQUEST['sex'];
@$phone = $_REQUEST['phone'];
@$addr = $_REQUEST['addr'];
@$did  = $_REQUEST['did'];
$order_time = time()*1000;
if(empty($user_name) ||empty($sex) || empty($phone) || empty($addr) || empty($did)){
   echo '[]';
     return;
 }
require('1_init.php');
$sql = "INSERT INTO fl_order VALUES(null,'$phone','$user_name','$sex','$order_time','$addr','$did')";
$result = mysqli_query($conn,$sql);
$output = [];
$arr=[];
if($result){
     $arr['msg'] = 'success';
     $arr['oid'] = mysqli_insert_id( $conn );
    }else{
      $arr['msg'] = 'error';
    }
    $output[] = $arr;
   echo json_encode($output);