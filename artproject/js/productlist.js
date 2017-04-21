/**功能点1：待页面加载完成后，异步请求页头和页尾**/
$(function(){
  $('#site_header').load('data/header.php');
  $('#site_footer').load('data/footer.php');
})

/**功能点2：为“登录”按钮绑定事件监听**/
//var loginUname = null;  //全局变量，当前登录的用户名
//var loginUid = null;    //全局变量，当前登录的用户编号
$('#bt-login').click(function(){
  var n = $('[name="uname"]').val();
  var p = $('[name="upwd"]').val();
  //发起异步POST请求，进行登录验证
  $.ajax({
    type: 'POST',
    url: 'data/2_user_login.php',
    data: {uname: n, upwd: p},
    success: function(data){
      //console.log('开始处理响应消息');
      if(data.code<0){  //登录失败
        $('p.alert').html(data.msg);
      }else {           //登录成功
        $('.modal').hide();
        $('#welcome').html('欢迎回来：'+data.uname);
        //loginUname = data.uname; //在全局范围保存登录用户名
        //loginUid = data.uid;//在全局范围保存登录用户编号
        sessionStorage['LoginUname'] = data.uname;
        sessionStorage['LoginUid'] = data.uid;
      }
    },
    error: function(){
      alert('响应消息有问题！请检查Network！');
    }
  });
});


//发起异步GET请求，获取产品列表，重建分页条
function loadProduct(pno){
  $.ajax({
    //url: 'data/3_product_list.php', //不带分页
    url: 'data/4_product_list.php?pageNum='+pno,  //带分页
    success: function(pager){
      //console.log('开始处理分页对象');
      //console.log(pager);
      //1.根据分页器对象中的数据构建产品列表
      var html = '';
      $.each(pager.data, function(i, p){
        html += `
        <li>
            <a href="#"><img src="${p.pic}"></a>
            <p>￥${p.price}</p>
            <h1><a href="#">${p.pname}</a></h1>
            <div>
              <a href="#" class="contrast"><i></i>对比</a>
              <a href="#" class="p-operate"><i></i>关注</a>
              <a href="${p.pid}" class="addcart"><i></i>加入购物车</a>
            </div>
        </li>  
        `;
      });
      $('#plist ul').html(html);
      //2.根据分页器对象重新构建一个分页条
      var html = '';
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
      $('ol.pager').html(html);
    },
    error: function(){
      alert('异步请求商品列表出错！请检查响应消息');
    }
  });
}

/**功能点3：页面加载完后，异步请求产品列表**/
$(function(){
  //发起异步GET请求，获取产品列表，重建分页条
  loadProduct(1);
});

/**功能点4：为分页条中超链接绑定监听，实现异步分页请求**/
$('ol.pager').on('click', 'li a', function(e){
  e.preventDefault();
  var pno = $(this).attr('href');//要分页显示的页号
  //发起异步GET请求，获取产品列表，重建分页条
  loadProduct(pno);
});


/**功能点5：为每个商品下面的“添加到购物车”绑定监听——事件代理**/
$('#plist').on('click','a.addcart', function(e){
  e.preventDefault();
  var pid = $(this).attr('href');
  //把当前登录用户编号+商品编号提交给服务器，执行购物车条目添加
  $.ajax({
    type: 'POST',
    url: 'data/5_cart_detail_add.php',
    //data: {'uid': loginUid, 'pid': pid},
    data: {'uid': sessionStorage['LoginUid'], 'pid': pid},
    success: function(data){
      if(data.code<0){
        alert('添加失败！错误原因：'+data.msg);
      }else {
        alert('添加成功！该商品已购买：'+data.count);
      }
    },
    error: function(){
      alert('添加购物车商品出错！请检查响应消息！');
    }
  });
});

/**功能点6：为“去购物车结算”绑定事件监听**/
//下面的做法错误！异步请求来的页头中的内容都是后添加到DOM上！
/*$('#settle_up').click(function(){
 alert(999999);
 });*/
$(document.body).on('click', '#shoop', function(){
  //把当前登录用户名和编号保存入Cookie
  //document.cookie = 'loginUname='+loginUname;
  //document.cookie = 'loginUid='+loginUid;
  //跳转到购物车详情页面
  location.href = 'shoppingcart.html';
});
