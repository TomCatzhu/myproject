+function () {
  /*放大镜效果*/
  var $ulList = $("#icon_list");
  var $aBack = $("#mediumDiv>h1>a:first");
  var $aFor = $aBack.next();
  var $mImg = $("#mImg");
  var $mask = $("#mask");
  var $large = $("#largeDiv");
  var $super = $("#superMask");
  var moved = 0;//保存已经左移的li个数
  var LIWIDTH = 62;//保存每个li的宽度
  var OFFSET =//保存已经左移的li个数
    parseFloat($ulList.css("left"));
//保存一次显示的li个数
  var COUNT = 5;
  var MSIZE = parseFloat($mask.css("width"));
  var SSIZE = parseFloat($super.css("width"));
  var MAX = SSIZE - MSIZE;
  if ($ulList.children().size() <= 5)
    $aFor.attr("class", "forward_disabled")
//为$aFor绑定单击事件
  $aFor.click(function () {
    if (!$(this).is("[class$=_disabled]")) {
      moved++;
      $ulList.css("left", -moved * LIWIDTH + OFFSET);
//如果moved==$ulList下所有li的个数-
      if (moved == $ulList.children().size() - COUNT)
        $aFor.attr("class", "forward_disabled");
//设置$aBack的class为backward
      $aBack.attr("class", "backward");
    }
  });
//为$aBack绑定单击事件
  $aBack.click(function () {
    if (!$(this).is("[class$=_disabled]")) {
      moved--;
      $ulList.css("left", -moved * LIWIDTH + OFFSET);
//如果moved==$ulList下所有li的个数-
      if (moved == 0)
        $aBack.attr("class", "backward_disabled");
//设置$aBack的class为backward
      $aFor.attr("class", "forward");
    }
  });
//为$ulList添加鼠标进入事件代理，只允许li响应
  $ulList.on("mouseenter", "li", function () {
//this->li
//获得当前li中小图片的src
    var src = $(this).children("img").attr("src");
//在最后一个.前拼-m
    var i = src.lastIndexOf(".");
    src = src.slice(0, i) + "-m" + src.slice(i);
    $mImg.attr("src", src);
  });
//为id为superMask的div绑定鼠标进入
  $super.mouseover(function () {
    $mask.show();
    var src = $mImg.attr("src");
    var i = src.lastIndexOf(".");
    src = src.slice(0, i - 1) + "l" + src.slice(i);
    $large.css(
      "backgroundImage", "url('" + src + "')")
    $large.show();
  }).mouseout(function () {
    $mask.hide();
    $large.hide();
  }).mousemove(function (e) {
//计算$mask的left和top
    var left = e.offsetX - MSIZE / 2;
    var top = e.offsetY - MSIZE / 2;
//如果left<0，就改回0，否则如果left>MAX，就改回MAX，否则不变:
    left = left < 0 ? 0 : left > MAX ? MAX : left;
    top = top < 0 ? 0 : top > MAX ? MAX : top;
    $mask.css({left, top});
    $large.css("backgroundPosition", -16 / 7 * left + "px " + -16 / 7 * top + "px");
  });
}()


+ function () {
  var $main_tabs = $("#main_tabs");
  var $show = $main_tabs.find(".current").first().children();
  $close = $show.parent().next().first().children();
  $pro = $("#pro");
  $show.on("click", function (e) {
    change(e, $show, $close);
    $pro.show().next().hide();
  });
  $close.on("click", function (e) {
    change(e, $close, $show);
    $pro.hide().next().show();
  });
  function change(e, obj1, obj2) {
    e.preventDefault();
    obj1.children().css("backgroundPosition", "-80px -30px");
    obj2.children().css("backgroundPosition", "-108px -30px");

  }

}();



























