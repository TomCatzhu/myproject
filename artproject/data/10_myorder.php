<?php
header("Content-Type:application/json");
@$uid=$_REQUEST['uid']or die('{"code":401,"msg":"uid required"}');
require("1_init.php");
//根据用户编号查询所有用户编号
$sql="SELECT*FROM art_order WHERE userId=$uid";
$result=mysqli_query($conn,$sql);
$orderList=mysqli_fetch_all($result,MYSQLI_ASSOC);
//遍历每个订单查询该订单所购买的产品信息
foreach($orderList as $i=>$order){
    $oid=$order['oid'];//订单编号
    //根据订单编号查询产品编号，在查询产品信息
    $sql="SELECT*FROM art_product WHERE pid IN(SELECT productId FROM art_order_detail WHERE orderId=$oid)";
    $result=mysqli_query($conn,$sql);
    $productList=mysqli_fetch_all($result,MYSQLI_ASSOC);
    $orderList[$i]['productList']=$productList;
}
echo json_encode($orderList);