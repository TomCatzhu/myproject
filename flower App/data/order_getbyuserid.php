<?php
/**根据用户id查询订单数据**/
header('Content-Type:application/json');

$output = [];

@$userid = $_REQUEST['userid'];

if(empty($userid)){
    echo "[]"; //若客户端未提交用户id，则返回一个空数组，
    return;    //并退出当前页面的执行
}

//访问数据库
require('1_init.php');

$sql = "SELECT fl_order.oid,fl_order.userid,fl_order.phone,fl_order.addr,
fl_order.totalprice,fl_order.user_name,fl_order.order_time,
fl_orderdetails.did,fl_orderdetails.dishcount,fl_orderdetails.price,
fl_dish.name,fl_dish.img_sm

 from fl_order,fl_orderdetails,fl_dish
WHERE fl_order.oid = fl_orderdetails.oid and fl_orderdetails.did = fl_dish.did and fl_order.userid='$userid'";
$result = mysqli_query($conn, $sql);

$output['data'] = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($output);
?>
