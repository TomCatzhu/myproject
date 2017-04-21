/**
 * Created by uid on 2017/4/8.
 */
//功能点1：若用户没登陆跳转回登录页
if(!sessionStorage['LoginUid']){
  location.href="productlist.html";
}
//功能点2：异步请求页头页尾显示欢迎回来##
$("#header").load('data/header.php', function () {
  $('#welcome').html('欢迎回来：'+sessionStorage['LoginUname'])
});
$("#footer").load('data/footer.php');
//功能点3为附加导航中的超链接添加事件监听
$(".affix").on('click','a', function (e) {
  e.preventDefault();
  //调整li.active位置
  $(this).parent().addClass('active').siblings('.active').removeClass('active');
  //调整.right>div的active的位置
  var divId=$(this).attr('href');
  $(divId).addClass('active').siblings('.active').removeClass('active');
})
//功能点4：页面加载完成异步请求当前用户的订单信息
loadOrderDataByPage(1);//异步请求第一页数据
function formatTableData(){
  //1、把支付方式对应的1/2/3转换为汉字
  $('span.payment').each(function (i,span) {
    var txt=$(span).html();
    if(txt==='1'){
      $(span).html('货到付款')
    }else if(txt==='2'){
      $(span).html('京东支付')
    }else if(txt==='3'){
      $(span).html('在线支付')
    }else if(txt==='4'){
      $(span).html('手机支付')
    }
  })
  //2、把下单时间对应的数字转换为日期字符串
  $('span.orderTime').each(function (i,span) {
    var txt=$(span).html();
    txt=parseInt(txt);
    var d=new Date(txt);
    txt=`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}<br>${d.getHours()}:${d.getMinutes()}`;
    $(span).html(txt);
  });

  //1、把订单状态对应的1/2/3转换为汉字
  $('span.status').each(function (i,span) {
    var txt=$(span).html();
    if(txt==='1'){
      $(span).html('等待付款')
    }else if(txt==='2'){
      $(span).html('配货中')
    }else if(txt==='3'){
      $(span).html('运输中')
    }else if(txt==='4'){
      $(span).html('派货中')
    }else if(txt==='5'){
      $(span).html('订单完成')
    }
  })
}
//异步分页加载指定页面的订单数据 代码重构
function loadOrderDataByPage(pno){
  $.ajax({
    //url:'data/10_myorder.php',
    url:'data/11_myorder_page.php',
    //data:{uid:sessionStorage['LoginUid']},
    data:{uid:sessionStorage['LoginUid'],pageNum:pno},
    //success: function (orderList) {
    success: function (pager) {
      //console.log(orderList);订单列表
      //1、遍历订单数组，拼接html放到table
      var html='';
      //for(var order of orderList){//遍历每个订单
      for(var order of pager.data){//遍历每个订单
        //console.log(order);
        html+=`
          <tr>
          <td colspan="6">订单编号：${order.oid}</td>
        </tr>
        <tr>
          <td>
           `;
        for(var p of order.productList){//拼接订单中的商品
          html+=`<img src="${p.pic}">`;
        }
        html+=`
          </td>
          <td>${order.rcvName}</td>
          <td>￥${order.price} <br/><span class="payment">${order.payment}</span></td>
          <td><span class="orderTime">${order.orderTime}</span></td>
          <td><span class="status">${order.status}</span></td>
          <td>
            <a href="">查看</a>
            <a href="">评价</a> <br/>
            <a href="">晒单</a>
            <a href="">再买</a>
          </td>
        </tr>
      `;
      }
      $("#table-order tbody").html(html);
      formatTableData();//格式化表格中的数据
      //2、根据分页相关数据拼接html字符型重建分页条
      var html='';

      //  html+=`
      //<li>
      //    <a href="${pager.pageNum-2}">${pager.pageNum-2}</a>
      //  </li>
      //  <li>
      //    <a href="${pager.pageNum-1}">${pager.pageNum-1}</a>
      //  </li>
      //
      //  <li class="active">
      //    <a href="${pager.pageNum}">${pager.pageNum}</a>
      //  </li>
      //  <li>
      //    <a href="${pager.pageNum+1}">${pager.pageNum+1}</a>
      //  </li>
      //  <li>
      //    <a href="${pager.pageNum+2}">${pager.pageNum+2}</a>
      //  </li>
      //`;
      if(pager.pageNum-2>0){  //当前页-2
        html += `<li><a href="${pager.pageNum-2}">${pager.pageNum-2}</a></li> `;
      }
      if(pager.pageNum-1>0){  //当前页-1
        html += `<li><a href="${pager.pageNum-1}">${pager.pageNum-1}</a></li> `;
      }
      html += `<li class="active"><a href="#">${pager.pageNum}</a></li> `;
      if(pager.pageNum+1<=pager.pageCount){ //当前页+1
        html += `<li><a href="${pager.pageNum+1}">${pager.pageNum+1}</a></li> `;
      }
      if(pager.pageNum+2<=pager.pageCount){ //当前页+2
        html += `<li><a href="${pager.pageNum+2}">${pager.pageNum+2}</a></li> `;
      }
      $('.pager').html(html);
    },
    error:function(){
      alert('异步请求订单数据失败')
    }
  });
}
//功能点5为分页条中的每个页号绑定监听--委托给父元素
$('.pager').on('click','a', function (e) {
  e.preventDefault();
  //获取要显示的页号
  var pno=$(this).attr('href');
  //发起异步请求，获取指定的页号的数据，格局响应的数据重建table同时重新构建分页条
  loadOrderDataByPage(pno);
});

//功能点6异步请求消费统计数据绘制svg统计图
$.ajax({
  url:'data/12_buy_stat.php',
  success: function (list) {
    //使用第三方的绘图工具FusionCharts
    var c=new FusionCharts({
      //type:'column2d',
      type:'column3d',
      //type:'bar3d',
      //type:'bar2d',
      //type:'line',
//      type:'pie2d',
      //type:'pie3d',
      //type:'doughnut2d',
      //type:'doughnut3d',

      renderAt:'buy-stat-svg',
      width:'100%',
      height:'500',
      dataSource:{
        data:list
      }
    });
    c.render();//把图标绘制到页面上

  }
});
//功能点7：异步请求电器用户的抽奖统计情况
$.ajax({
  url:'data/13_lottery_stat.php',
  data:{uid:sessionStorage['LoginUid']},
  success:function(result){
    //console.log(result);
    if(result.total<=result.used){
      $("#bt-lottery").html('无剩余抽奖机会');
      return;
    }
    $('#bt-lottery').html(`开始抽奖(总次数：${result.total} 剩余抽奖次数：${result.total-result.used})`).prop('disabled',false);
    //绘制静态抽奖界面
    drawLottery()
  }
});
function drawLottery(){
  var ctx = $('#canvas-lottery')[0].getContext('2d');
  //等待所有图片加载完成，才开始绘图
  var progress = 0;
  var imgPan = new Image();
  imgPan.src ="img/pan.png";
  imgPan.onload = function(){
    progress+=80;
    if(progress===100){
      startDraw();
    }
  }
  var imgPin = new Image();
  imgPin.src ="img/pin.png";
  imgPin.onload = function(){
    progress+=20;
    if(progress===100){
      startDraw();
    }
  }
  function startDraw(){
    console.log('图片全部加载完成，开始绘图');
    var w = imgPan.width; //画布的宽
    var h = imgPan.height; //画布的高
    $('#canvas-lottery').attr('width',w).attr('height',h);
    ctx.drawImage(imgPan, 0, 0);
    ctx.drawImage(imgPin, w/2-imgPin.width/2, h/2-imgPin.height/2);
    //为“开始抽奖”按钮绑定事件监听
    //$('#bt-lottery').click();
    $('#bt-lottery').one('click', function(){
      console.log('圆盘开始旋转....');
      /**旋转抽奖必需的变量**/
      var duration = Math.random()*4000+4000;//旋转可以持续的总时长
      var last = 0; //旋转当前已经持续的时长
      var deg = 0;  //已经旋转的角度 370=>10

      var timer = setInterval(function(){
        deg += 3;    //当前的转速，最好为持续时间的抛物线函数
        deg %= 360;  //370等价于10

        //首先绘制圆盘
        ctx.save();//保存画笔变形状态
        ctx.translate(w/2, h/2);//平移
        ctx.rotate(deg*Math.PI/180);//旋转
        ctx.drawImage(imgPan,-w/2, -h/2);//绘图
        ctx.restore();//恢复画笔的状态

        //再次绘制指针
        ctx.drawImage(imgPin,w/2-imgPin.width/2, h/2-imgPin.height/2);

        //记录旋转时长
        last += 15;
        if(last>=duration){
          clearInterval(timer);
          //根据deg的值判定所获奖项
          //异步提交所获奖项给服务器
          //重新获取抽奖统计情况，如果还有剩余次数，继续抽奖
        }
      },15)
    });
  }
}