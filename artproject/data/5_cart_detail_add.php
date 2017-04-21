<?php
/*
*接收客户端提交的用户编号（uid）、产品编号（pid），试着向购物车中添加新的购买记录
*最后向客户端返回：{"code":1, "msg":"购买成功","count": 3}
*/
header('Content-Type: application/json;charset=UTF-8');

//接收客户端提交数据
@$userId = $_REQUEST['uid'] or die('{"code":-2,"msg":"用户编号不能为空"}');
@$productId = $_REQUEST['pid'] or die('{"code":-3,"msg":"产品编号不能为空"}');

require('1_init.php');

//SQL1：根据用户编号查询出他对应的购物车编号
$sql = "SELECT cid FROM art_cart WHERE userId='$userId'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_row($result);

if($row===null){	//没有查询到购物车编号
	//SQL2：如果用户没有购物车，则添加一个购物车，获得购物车编号
	$sql = "INSERT INTO art_cart VALUES(NULL,'$userId')";
	mysqli_query($conn, $sql);
	$cartId = mysqli_insert_id($conn); //读取刚创建的购物车编号
}else {		//查询到了购物车编号
	$cartId = $row[0];
}

//SQL3：查询购物车详情，对应的购物车编号+产品编号是否存在
$sql = "SELECT did,count FROM art_cart_detail WHERE cartId='$cartId' AND productId='$productId'";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_row($result);

if($row===null){  //指定购物车中没有该商品的购买记录
	//SQL4：若之前未购买过该商品，则插入一条购买记录，购买数量为1
	$sql = "INSERT INTO art_cart_detail VALUES(NULL,'$cartId','$productId','1')";
	mysqli_query($conn,$sql);
	$count = 1;
}else {   //指定购物车中买过该商品	
	//SQL5：若之前已经购买该商品，则更新购买数量+1
	$did = $row[0];		//详情编号
	$count = $row[1];	//购买数量
	$count++;
	$sql = "UPDATE art_cart_detail SET count='$count' WHERE did='$did'";
	mysqli_query($conn,$sql);
}

echo '{"code":1, "msg":"购买成功", "count":'.$count.'}';

