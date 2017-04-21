<?php
header('Content-Type:application/json');
@$n=$_REQUEST['uname']or die('{"code":401,"msg":"uname required"}');
@$p=$_REQUEST['upwd']or die('{"code":402,"msg":"upwd required"}');
require("1_init.php");
$sql="INSERT INTO art_user VALUES(NULL,'$n','$p')";
$result=mysqli_query($conn,$sql);
if($result){
    $uid=mysqli_insert_id($conn);
  // echo '{"code":200,"uid":'.$uid.'}';
  $data=['code'=>200,'uid'=>$uid];
  echo json_encode($data);

}else{
echo '{"code":501,"msg":"sql err"}';
}