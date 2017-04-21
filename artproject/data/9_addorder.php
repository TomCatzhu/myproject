<?php
header('Content-Type:application/json');
@$rn=$_REQUEST['rcvName']or die('{"code":401,"msg":"rcvName required"}');
@$ra=$_REQUEST['rcvAddr']or die('{"code":402,"msg":"rcvAddr required"}');
@$rp=$_REQUEST['rcvPhone']or die('{"code":403,"msg":"rcvPhone required"}');
@$pr=$_REQUEST['price']or die('{"code":404,"msg":"price required"}');
@$pm=$_REQUEST['payment']or die('{"code":405,"msg":"payment required"}');
@$uid=$_REQUEST['uid']or die('{"code":405,"msg":"uid required"}');
$st=1;//新下的订单默认都是“等待付款”
$ot=time()*1000;//获得php服务器的当前系统时间
//连接数据库
require('1_init.php');
//SQL1:添加新的订单记录，获得订单编号
$sql="INSERT INTO art_order VALUES(NUll,'$rn','$ra','$rp','$pr','$pm','$st','$ot','$uid')";
$result=mysqli_query($conn,$sql);
$orderId=mysqli_insert_id($conn);//获得上一条语句购物车的编号
//SQL2:查询当前用户购物车内容
$sql="SELECT*FROM art_cart_detail WHERE cartId=(SELECT cid FROM art_cart WHERE userId=$uid)";
$result=mysqli_query($conn,$sql);
$productList=mysqli_fetch_all($result,MYSQLI_ASSOC);//当前用户购物车的所有商品
foreach($productList as $p){
//SQL3：把购物车内容插入订单详情表
$sql="INSERT INTO art_order_detail VALUES(NULL,$orderId,$p[productId],$p[count])";
mysqli_query($conn,$sql);
//SQL4：从购物车详情中删除已购买商品
 $sql = "DELETE FROM art_cart_detail WHERE did=$p[did]";
    mysqli_query($conn,$sql);
}
echo '{"code":200,"orderId":'.$orderId.'}';


