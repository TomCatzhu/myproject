<?php
/***
*向客户端输出所有的产品信息，以JSON格式
*/
header('Content-Type: application/json');

require('1_init.php');

$sql = "SELECT * FROM art_product";
$result = mysqli_query($conn,$sql);
$list = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($list);

