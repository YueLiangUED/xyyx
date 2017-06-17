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

    //提交订单按钮
    !function() {
        //判断是否同意协议
        $('#myCheck').click(function () {
            this.value = (this.value == 0 )? 1 : 0;
        });
        //提交订单
        $('.button').click(function () {
            if($('#myCheck').attr('value') == 1){
                window.location.href = 'xiangqing-queren.html';
            }else if($('#myCheck').attr('value') == 0){
                alert('您没有同意《北京移动选号入网协议》')
            }
        });
    }();
    //取货方式切换
    !function() {
        $('#home,#school').click(function () {
            $(this).addClass('active').siblings().removeClass('active');
            if($('#home').prop('className') == 'active'){
                $('.toHome').show();
                $('.toSchool').hide();
                $('.reminder p').text('温馨提示：签收时请务必本人签收并准备好身份证');
            }else if($('#school').prop('className') == 'active'){
                $('.toSchool').show();
                $('.toHome').hide();
                $('.reminder p').text('温馨提示：请您携带身份证、录取通知书到指定地点领取');
            }
        });
    }();
    
    
    //显示遮罩层
    function showMask(){
        $("#mask").css("height",$(document).height());
        $("#mask").css("width",$(document).width());
        $("#mask").show();
    }
    //隐藏遮罩层  
    function hideMask(){
        $("#mask").hide();
    }
    //选择城市
    !function () {
        $('#selectCity').click(function(){
            showMask();
            $(document).css('overflow','hidden');
            $('.city-list').animate({bottom:'0'});
        });
        $('.city-list-title>p:nth-child(1)').click(function(){
            $('.city-list').animate({bottom:'-24.25rem'});
            hideMask();
            $(document).css('overflow','auto');
        });
        $('.city-list-title>p:nth-child(2)').click(function(){
            $('.city-list').animate({bottom:'-24.25rem'});
            hideMask();
            $(document).css('overflow','auto');
            $('#selectCity').val($('#add .swiper-slide-active>p').text());
        });
        $('.mask').click(function(){
            $('.city-list').animate({bottom:'-24.25rem'});
            $(".mask").hide();
            $(document).css('overflow','auto');

        });
    }();
    //选择学校 不跳转
    (function () {
        $('#selectSchool').click(function(){
            showMask();
            $(document).css('overflow','hidden');
            $('#school-list').animate({bottom:'0'});
        });
        $('#school-list-title>p:nth-child(1)').click(function(){
            $('#school-list').animate({bottom:'-24.25rem'});
            hideMask();
            $(document).css('overflow','auto');
        });
        $('#school-list-title>p:nth-child(2)').click(function(){
            $('#school-list').animate({bottom:'-24.25rem'});
            hideMask();
            $(document).css('overflow','auto');
            $('#selectSchool').val($('#sch .swiper-slide-active>p').text());
        });
        $('.mask').click(function(){
            $('#school-list').animate({bottom:'-24.25rem'});
            $(".mask").hide();
            $(document).css('overflow','auto');

        });
    })();
    //选择学校 跳转
   /* !function () {
        $('#selectSchool').click(function () {
            window.location.href = '';
        })
    }();*/
    //到校自取下详细信息列表显示
    (function () {
        if(1/*$('.name.info input').val() != '' && $('.IDcard.info input').val() !='' && $('#selectSchool').val() != ''*/){
            $('.writeOver').css('display','block')
            $('.toSchool').css('height','15rem');
        }
    })();

    //配送到家姓名根据用户输入绑定
    $('.network .name input').on('blur',function () {
        $('.toHome .name input').val($('.network .name input').val());
    });


    //套餐弹窗
    $('#selectedTc').click(function () {
        $('.modal').show();
        showMask();
        $('.mask').click(function () {
            showMask();
        });
    });



    $('.front .img').on('click', function () {
        var $front = $(this).parents('.front');
        $('.front').removeClass('act');
        $front.addClass('act');
        $('.back').hide();
    });
    $('.details').on('click', function () {
        $('.back').hide();
        var $item = $(this).parents('.modal-item');
        var $back = $item.find('.back');
        $back.show();
        var $front = $(this).parents('.front');
        $('.front').removeClass('act');
        $front.addClass('act');

    });
    $('.return').on('click', function () {
        $('.back').hide();
    })

    $('.enter').on('click', function () {
        var $parent = $(this).parents('.modal');
        $parent.hide();
        hideMask();
        if($('#item48').hasClass('act')){
            $('#selectedTc').val('2017校园48元卡');
        }else if($('#item18').hasClass('act')){
            $('#selectedTc').val('2017校园18元卡');
        }
    });

    //优惠弹窗
    $('#youhuiTc').click(function () {
        $('.modal-youhui').show();
        showMask();
        $('.mask').click(function () {
            showMask();
        });
    });
    //关闭
    $('.modal-close').click(function () {
        $('.modal-youhui').hide();
        hideMask();
    });

    //视频流量弹窗
    $('.video-icon').on('click', function () {
        $('.video-icon').removeClass('act');
        $(this).addClass('act');
    });
    $('.enter2').on('click', function () {
        var $parent = $(this).parents('.modal2');
        $parent.hide();
        hideMask();
        if($('.yk').hasClass('act')){
            $('#selectedLiuliang').val('任我看优酷视频流量包');
        }else if($('.tx').hasClass('act')){
            $('#selectedLiuliang').val('任我看腾讯视频流量包');
        }else if($('.pptv').hasClass('act')){
            $('#selectedLiuliang').val('任我看PPTV视频流量包');
        }
    });

    $('#selectedLiuliang').click(function () {
        $('.modal2').show();
        showMask();
        $('.mask').click(function () {
            showMask();
        });
    });
});
