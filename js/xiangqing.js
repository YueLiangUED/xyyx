(function(global){
    function remChange(){
        document.documentElement.style.fontSize=20*document.documentElement.clientWidth/750+'px';
    }
    remChange();
    global.addEventListener('resize',remChange,false);
})(window);

$(function () {
    //隐藏身份证中间10位
    !function () {
        var $card = $('#idCard').text();
        $('#idCard').text($card.replace($card.substr(4,10), "**********"));
    }();

    //遮罩层
    //显示遮罩层
    function showMask(){
        $(".mask").css("height",$(document).height());
        $(".mask").css("width",$(document).width());
        $(".mask").show();
    }
    //隐藏遮罩层
    function hideMask(){
        $(".mask").hide();
    }
    //待支付订单删除弹窗
    $('.footer span:nth-child(1)').click(function () {
        $('.isDel').show();
        showMask();
    });
    //取消删除订单
    $('.isDel span:nth-child(2)').click(function () {
        $('.isDel').hide();
        hideMask();
    });
    //删除确认
    $('.isDel span:nth-child(3)').click(function () {
        window.location.href = 'index-del.html';
    });
    $('.footer .wuliu').click(function () {
        hideMask();
        window.location.href = 'wuliu.html';
    });
    //查看物流
    $('.footer .look').click(function () {
        hideMask();
        window.location.href = 'wuliu.html';
    });
    $('.footer .buyAway').click(function () {
        window.location.href = 'index.html';
    });
    $('.footer .queren').click(function () {
        window.location.href = 'tijiao.html';
    });
    $('.message span').click(function () {
        hideMask();
        $('.message').hide();
    });
});
