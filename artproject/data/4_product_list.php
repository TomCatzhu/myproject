<?php
/***
*分页向客户端输出所有的产品信息，以JSON格式，形如：
{
	recordCount: 36,	//满足条件的总的记录数
	pageSize: 8,		//页面大小，一页中最多保存的记录数
	pageCount: 5,		//页面数量
	pageNum: 3,		//当前显示的页号
	data: [{},{},...{}]		//当前页中的记录数据
}
*/
header('Content-Type: application/json');

//接收客户端提交的要显示的页号
@$pno = $_REQUEST['pageNum'];
if($pno===null){	//客户端未提交要显示的页号
	$pno = 1;
}else {				//客户端提交了页号，默认是字符串
	$pno = intval($pno);	//字符串解析为整数
}

require('1_init.php');

//要输出给客户端数据
$output = [
	'recordCount'=>0,	//总记录数
	'pageSize'=>8,		//页面大小
	'pageCount'=>0,		//总页数
	'pageNum'=>$pno,	//当前显示的页号
	'data'=>null		//当前页中的数据
];

//查询出总的记录数
$sql = "SELECT COUNT(*) FROM art_product";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_row($result);
$output['recordCount'] = intval($row[0]);

//计算总的页数
$output['pageCount'] = ceil( $output['recordCount'] / $output['pageSize'] );  //ceil(36/8)

//查询出当前页中的记录行
$start = ($output['pageNum']-1)*$output['pageSize']; //从哪一行开始读取数据
$count = $output['pageSize']; //一次最多读取的行数
$sql = "SELECT * FROM art_product LIMIT $start,$count";
$result = mysqli_query($conn, $sql);
$output['data'] = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($output);
