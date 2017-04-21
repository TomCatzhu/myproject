
//功能点1：检查用户是否登录，未登录跳转到登录页
if(!sessionStorage['LoginUid']){
  location.href="productlist.html";
}
//功能点2：异步请求页头页尾
$("#header").load('data/header.php', function () {
  $('#welcome').html('欢迎回来：'+sessionStorage['LoginUname'])
});
$("#footer").load('data/footer.php');
//功能点3异步请求当前登录用户的购物车信息
$.ajax({
  url:"data/6_cart_detail_list.php",
  data:{uid:sessionStorage['LoginUid']},
  success: function (list) {
    console.log('请求购物车详情成功')
    console.log(list);
    var html='';
    var sum=0;
    $.each(list,function(i,obj){
      sum+=obj.price*obj.count;
      html+=`
         <div class="goods-item">
            <div class="p-img">
                <a target="_blank" href=""><img src="${obj.pic}" alt=""></a>
            </div>
            <div class="p-name">
                <a href="" target="_blank">
                    ${obj.pname}
                </a>
            </div>
            <div class="p-price">
                <strong class="jd-price">￥${obj.price}</strong>
                <span class="p-num">x${obj.count}</span>
                <span class="p-state">有货</span>
            </div>
        </div>
      `
    });
    $('.goods-items').html(html);
    $('.price-num').html("￥"+sum);//显示购物车的总金额
    $('[name="price"]').val(sum);//隐藏域的总金额

  },
  error: function () {
    alert('请求购物车详情失败！')
  }
})
//功能4为“支付方式下面的li做事件绑定”
$(".payment-list").on('click','li', function () {
  //修改payment-item-selected的位置
  $(this).addClass('payment-item-selected').siblings('.payment-item-selected').removeClass('payment-item-selected');
  //根据当前li的data-value的值修改当前隐藏域的value
  var v=$(this).data('value');
  //var v=$(this).attr('data-value');
  $(this).siblings('[name="payment"]').val(v);
});
//功能5为提交订单绑定监听
$('.checkout-submit').click(function () {
  //收集所有的用户输入，组成k=v&k=v的形式-表单序列化
  var data=$("#form-addorder").serialize();
  data+='&uid='+sessionStorage['LoginUid'];
  console.log(data);
  $.ajax({
    type:'POST',
    url:'data/9_addorder.php',
    data:data,
    success: function (obj) {
      if(obj.code===200){//下单成功
        //跳转到addorder_succ.html,显示出订单号
        sessionStorage['orderId']=obj.orderId;
        location.href="addorder_succ.html";
      }else{//下单失败
        alert('下单失败！原因'+obj.msg);
      }
    },
    error:function(){
    alert('提交订单异步请求失败！')
    }
  })
});
