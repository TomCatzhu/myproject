<?php
/*
*接收客户端提交的用户编号，查询出该用户购物车中的所有商品信息，以JSON格式返回
*/
header('Content-Type: application/json');

@$uid = $_REQUEST['uid'] or die('{"code":-2,"msg":"用户编号不能为空"}');

require('1_init.php');

$sql = "SELECT pid,pname,price,pic,did,count FROM art_product,art_cart_detail WHERE cartId=( SELECT cid FROM art_cart WHERE userId=$uid ) AND pid=productId";
$result = mysqli_query($conn, $sql);

$list = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($list);