<?php
header("Content-Type:application/json");
@$uid=$_REQUEST['uid']or die('{"code":401,"msg":"uid required"}');
@$pageNum=$_REQUEST['pageNum'];
if(!$pageNum){//客户端未提交显示的页号
    $pageNum=1;
}else{//客户端提交要显示的页号
    $pageNum=intval($pageNum);//把字符串解析为整数
}
//$output即将要输出给客户端的分页对象
$output=[
    'totalCount'=>0,
    'pageSize'=>5,
    'pageCount'=>0,
    'pageNum'=>$pageNum,
    'data'=>null
];

require("1_init.php");
//1、查询满足条件的总记录数
$sql="SELECT COUNT(*) FROM art_order WHERE userId=$uid";
$result=mysqli_query($conn,$sql);
$output['totalCount']= intval(mysqli_fetch_row($result)[0]);
//2、计算总页数
$output['pageCount']=ceil(($output['totalCount'])/($output['pageSize']));
//3、根据用户编号查询所有用户编号
$start=($output['pageNum']-1)*$output['pageSize'];//从哪一条记录开始
$count=$output['pageSize'];
$sql="SELECT*FROM art_order WHERE userId=$uid LIMIT $start,$count";
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
//把查询到数据保存到输出数
$output['data']=$orderList;
echo json_encode($output);