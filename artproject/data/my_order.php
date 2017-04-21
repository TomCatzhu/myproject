<?php
/*
1:接收客户提交的uid,返回该用户所有订单信息
2:包括订单的基本信息,以及订单中商品，形如
[
   {oid:0009,rcvName='dauxue',price:0,products:[{},{}]}
   {oid:0010,rcvName='dauxue',price:0,products:[{},{}]}
   ....
]    15:42---15:55
1:修改返回数据格式json
2:获取参数uid
3:连接数据库设置编码
4:创建SQL 根据uid查询所有订单
5:保存数组
6:循环数组
  依据订单id查询该订单下所有商品信息
7:添加列表
8:发送json
*/
header("content-type:application/json;charset=utf-8");
@$uid = $_REQUEST['uid']or die('{"code":-2,"msg":"用户编号不能为空"}');
require('init.php');
//依据uid查询所有订单
$sql = "SELECT * FROM jd_order WHERE userId=$uid";
$result = mysqli_query($conn,$sql);
$orderList = mysqli_fetch_all($result,MYSQLI_ASSOC);

//遍历每个订单,该订单下所有商品
foreach($orderList as $i=>$order){
  //每个订单id
  $oid = $order['oid'];
  //根据订单的编号查询该订单->明细表中产品id
  //再去查询产品表
  $sql = "SELECT * FROM jd_product WHERE pid";
  $sql .= " IN(SELECT productId FROM jd_order_detail";
  $sql .= " WHERE orderId=$oid)";
  $result = mysqli_query($conn,$sql);
  $plist = mysqli_fetch_all($result,MYSQLI_ASSOC);

  //将产品列表追加订单列表中!!!!!
  $orderList[$i]['products']=$plist;
}
echo json_encode($orderList);

