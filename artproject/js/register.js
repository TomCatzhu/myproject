/**
 * Created by uid on 2017/4/12.
 */
/*失去焦点时，验证用户名的有效性*/
uname.onblur = function(){
  //this.value 验证
  //this.validity 验证
  if(this.validity.valueMissing){
    var msg = '用户名不能为空';
    this.nextElementSibling.innerHTML = msg;
    this.nextElementSibling.className = 'help-block danger';
    this.setCustomValidity(msg);
  }else if(this.validity.tooShort){
    var msg = '用户名长度不能少于3位';
    this.nextElementSibling.innerHTML = msg;
    this.nextElementSibling.className = 'help-block danger';
    this.setCustomValidity(msg);
  }else if(this.validity.tooLong){
    var msg = '用户名长度不能长过6位';
    this.nextElementSibling.innerHTML = msg;
    this.nextElementSibling.className = 'help-block danger';
    this.setCustomValidity(msg);
  }else {
    var msg = '用户名输入有效';
    this.nextElementSibling.innerHTML = msg;
    this.nextElementSibling.className = 'help-block success';
    this.setCustomValidity('');
  }
}
upwd.onblur= function () {
  if(this.validity.valueMissing){
    var msg = '密码不能为空';
    this.nextElementSibling.innerHTML = msg;
    this.nextElementSibling.className = 'help-block danger';
    this.setCustomValidity(msg);
  }else if(this.validity.tooShort){
    var msg = '密码长度不能少于3位';
    this.nextElementSibling.innerHTML = msg;
    this.nextElementSibling.className = 'help-block danger';
    this.setCustomValidity(msg);
  }else if(this.validity.tooLong){
    var msg = '用户名长度不能长过6位';
    this.nextElementSibling.innerHTML = msg;
    this.nextElementSibling.className = 'help-block danger';
    this.setCustomValidity(msg);
  }else {
    var msg = '用户名输入有效';
    this.nextElementSibling.innerHTML = msg;
    this.nextElementSibling.className = 'help-block success';
    this.setCustomValidity('');
  }
}

$('#bt-submit').click(function () {
  //表单序列化把选中的表单中所有的带name属性的值串联起来组成k=v&k=v形式
  //直接用于http请求消息
  var data=$('#form-register').serialize();
  console.log(data);
  $.ajax({
    type:'POST',
    url:'data/8_register.php',
    data:data,
    success: function (obj) {
      if(obj.code===200){
        alert('新用户注册成功!3s自动跳转到首页');
        setTimeout(function(){
          location.href='first.html'
        },3000)
      }else{
        alert('新用户注册失败！错误消息为：'+obj.msg);
      }
    },
    error: function () {
      alert("异步请求失败!");
    }
  })
})
