<?php
/*
*接收客户端提交的详情编号did，从购物车详情中删除该记录，返回{"code":1,"msg":"删除成功"}
*/
header('Content-Type: application/json');

@$did = $_REQUEST['did'] or die('{"code":-2,"msg":"购买详情记录的编号不能为空"}');

require('1_init.php');

$sql = "DELETE FROM art_cart_detail WHERE did=$did";
$result = mysqli_query($conn, $sql);


echo '{"code":1, "msg":"删除成功"}';