(function(global){
    function remChange(){
        document.documentElement.style.fontSize=20*document.documentElement.clientWidth/750+'px';
    }
    remChange();
    global.addEventListener('resize',remChange,false);
})(window);

$(function () {
    //倒计时
    var myTimeLimitMin = 119;
    var myTimeLimitSec = 60;
    var myTimeLimitHou = parseInt(myTimeLimitMin/60);
    function timedCount() {
        $('.time').html('<p><i></i>请在' + myTimeLimitHou + '小时' + parseInt(myTimeLimitMin - myTimeLimitHou * 60) + '分' + myTimeLimitSec + '秒内完成付款，超时订单自动取消</p>');
        //$('.time>p').text('请在'+myTimeLimitHou+'小时' + parseInt(myTimeLimitMin-myTimeLimitHou*60) + '分' + myTimeLimitSec + '秒内完成付款，超时订单自动取消');
        if (myTimeLimitMin > 0) {
            myTimeLimitSec -= 1;
            if (myTimeLimitSec == 0) {
                myTimeLimitMin -= 1;
                myTimeLimitSec = 60;
            }
        } else if (myTimeLimitMin == 0) {
            myTimeLimitSec = 0;
            clearTimeout(t);
            $('.time-limit-overload').show();
        }
        var t = setTimeout(function () {
            timedCount()
        }, 1000);
    }
    timedCount();
    
    //查看订单
    $('.look').click(function () {
        window.location.href = 'dingdan.html';
    });
    //立即支付
    $('.pay').click(function () {
        window.location.href = 'taocan.html';
    });

    //已选号码
    $('.orderNumber p:nth-child(2)').text('13612344242');
    //订单金额
    $('.orderNumber p:nth-child(4)').text('200元');
    //订单编号
    $('.orderNumber p:nth-child(6)').text('002233');
});
