window.onload=function() {
  var lunbo = document.getElementById('lunbo');
  var list = document.getElementById('list');
  var buttons = document.getElementById('buttons').getElementsByTagName('span');
  var prev = document.getElementById('prev');
  var next = document.getElementById('next');
  var index = 1;//存放小圆点
  var animated=false;
  var timer;
  function showButton() {
    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].className == 'on') {
        buttons[i].className = '';
        break;
      }
    }
    buttons[index - 1].className = 'on';
  }

  function animate(offset) {
    animated=true;
    var newLeft = parseInt(list.style.left) + offset;
    var time=320;//位移的总时间
    var interval=10;//位移间隔时间
    var speed=offset/(time/interval);//每次的位移量
    function go(){
      if((speed<0 &&  parseInt(list.style.left)>newLeft) || (speed>0&& parseInt(list.style.left)<newLeft)){
        list.style.left= parseInt(list.style.left)+speed+"px";
        setTimeout(go,interval);
      }else{
        animated=false;
        list.style.left = newLeft + 'px';
        if (newLeft > -1920) {
          list.style.left = -9600 + 'px';;/*小于-5300变成-600，大于-600变成-5300 滚到附属图就归位*/
        }
        if (newLeft < -9600) {
          list.style.left = -1920 + 'px';
        }

      }
    }
    go();
  }
  function play(){
    timer=setInterval(function(){
      next.onclick();
    },3000)
  }
  function stop(){
    clearInterval(timer);
  }
  next.onclick = function () {
    if (index == 5) {
      index = 1;
    } else {
      index += 1;
    }

    showButton();
    if(!animated) {
      animate(-1920);

    }

  }
  prev.onclick = function () {
    if (index == 1) {
      index = 5;
    } else {
      index -= 1;
    }

    showButton();
    animate(1920);
  }
  for(var i=0;i<buttons.length;i++){
    buttons[i].onclick=function(){
      if(this.className=='on'){
        return;
      }
      var myIndex=parseInt(this.getAttribute('index'));//getAttribute获取自定义属性
      var offset=-1920*(myIndex-index);//点击圆点的偏移量
      if(!animated) {
        animate(offset);
      }
      index=myIndex;//归位或更新到当前
      showButton();
    }
  }
  caption.onmouseover=stop;
caption.onmouseout=play;
  play();
}
