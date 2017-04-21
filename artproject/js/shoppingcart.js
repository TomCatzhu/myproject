/**功能点1：读取上一个页面保存的Cookie，获得用户名和用户编号**/
//解析出loginUname和loginUid，若没有则必须跳转回“登录页面”
//'loginUname=xxx; loginUid=xxx'
/*
 var cookieArray = document.cookie.split('; ');
 var cookieObject = { };
 for(var i=0; i<cookieArray.length; i++){
 var pair = cookieArray[i].split('=');//loginUname=xxx
 var key = pair[0]; //loginUname
 var value = pair[1];  //qiangdong
 cookieObject[key] = value;
 }
 if(!cookieObject.loginUid){  //没有需要的Cookie数据
 location.href="productlist.html";
 }
 */
if(!sessionStorage['LoginUid']){  //若没有登录，则跳转回登录页面
  location.href = "productlist.html";
}

/**功能点2：页面加载完后，异步请求页头和页尾**/
$(function(){
  $('#site_header').load('data/header.php',function(){
    //异步请求完成(即页头加载完成)后的回调
    $('#welcome').html('欢迎回来：'+sessionStorage['LoginUname']);
  });
  $('#site_footer').load('data/footer.php');
})



/**功能点3：页面加载完后，异步请求当前登录用户购物车中的商品**/
$.ajax({
  url: 'data/6_cart_detail_list.php',
  //data: {uid: cookieObject.loginUid},
  data: {uid: sessionStorage['LoginUid']},
  success: function(data){
    var html = '';
    $.each(data, function(i, p){
      html += `
      <tr>
          <td>
            <input type="checkbox"/>
            <input type="hidden" value="${p.did}" />
            <div><img src="${p.pic}"></div>
          </td>
          <td><a href="">${p.pname}</a></td>
          <td>￥${p.price}</td>
          <td>
             <button class="subBtn" name="${p.did}">-</button><input type="text" value="${p.count}"/><button class="addBtn" name="${p.did}">+</button>
          </td>
          <td><span>￥${p.price*p.count}</span></td>
          <td><a href="${p.did}">删除</a></td>
      </tr>
      `;
    });
    $('#cart tbody').html(html);
  },
  error: function(){
    alert('购物车数据加载失败！请检查响应消息！');
  }
});


/**功能点4：为“删除”按钮绑定事件监听，实现购买详情的删除**/
$('#cart tbody').on('click', 'a:contains("删除")', function(e){
  e.preventDefault();
  var did = $(this).attr('href');
  var that = this;  //使用临时变量指向当前被点击的A
  $.ajax({
    type: 'POST',
    url: 'data/7_cart_detail_delete.php',
    data: {'did': did},
    success: function(data){
      if(data.code<0){
        alert('响应成功但删除失败！原因：'+data.msg);
      }else {
        alert('购买记录删除成功！');
        //必须手工从table中删除当前tr！
        //console.log(this); //$.ajax中的this指向请求对象
        $(that).parent().parent().remove();

      }
    },
    error: function(){
      alert('购买记录删除失败！请检查响应消息！');
    }
  })
})


//功能5：+
$('#cart tbody').on('click', '.addBtn', function(e){
  //1:获取当前元素兄弟元素input
  var input = $(this).siblings("input");
  //2:获取input中数值+1
  var v = parseInt(input.val())+1;
  //3:保存回input
  input.val(v);
  //4:发送ajax请求更新数据库
  //获取购物车中明细表的id
  var did = this.name;
  //5:发送ajax更新数据库
  $.get("data/update_count_add.php?did="+did);
});

//功能5：-
$('#cart tbody').on('click', '.subBtn', function(e){
  //1:获取当前元素兄弟元素input
  var input = $(this).siblings("input");
  //2:获取input中数值+1
  var v = parseInt(input.val())-1;
  //3:保存回input
  input.val(v);
  //4:发送ajax请求更新数据库
  //获取购物车中明细表的id
  var did = this.name;
  //5:发送ajax更新数据库
  $.get("data/update_count_sub.php?did="+did);
});
$("#addOrder").click(function(){
  location.href='addorder.html';
})