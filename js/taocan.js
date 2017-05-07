(function(global){
    function remChange(){
        document.documentElement.style.fontSize=20*document.documentElement.clientWidth/750+'px';
    }
    remChange();
    global.addEventListener('resize',remChange,false);
})(window);

$(function () {
    /*套餐切换*/
    (function () {
        $('.selectT .one').css({'borderColor':'#0085cf','color':'#0085cf'});
        $('.selectT .one i').css('display','inline-block');
        $('.selectB .one').css({'borderColor':'#0085cf','color':'#0085cf'});
        $('.selectB .one i').css('display','inline-block');
        $('.selectB .one').addClass('active');
        getPrice();
        
        $('.selectT .one').click(function () {
            $('.selectT .two').css({'borderColor':'#333333','color':'#333333'});
            $('.selectT .two i').css('display','none');
            $('.selectB .two').css({'borderColor':'#333333','color':'#333333'});
            $('.selectB .two i').css('display','none');
            $('.selectT .one').css({'borderColor':'#0085cf','color':'#0085cf'});
            $('.selectT .one i').css('display','inline-block');
            $('.selectB .one').css({'borderColor':'#0085cf','color':'#0085cf'});
            $('.selectB .one i').css('display','inline-block');
            $('.selectB .one,.selectB .two').css('display','inline-block');
            $('.selectB .three').css('display','none');
            $('.selectB .one').addClass('active');
            getPrice();
        });

        $('.selectB .two').click(function () {
            $('.selectB .one').css({'borderColor':'#333333','color':'#333333'});
            $('.selectB .one i').css('display','none');
            $('.selectB .two').css({'borderColor':'#0085cf','color':'#0085cf'});
            $('.selectB .two i').css('display','inline-block');
            $('.selectB .two').addClass('active');
            $('.selectB .one').removeClass('active');
            getPrice();
        });
        
        $('.selectB .one').click(function () {
            $('.selectB .one').css({'borderColor':'#0085cf','color':'#0085cf'});
            $('.selectB .one i').css('display','inline-block');
            $('.selectB .two').css({'borderColor':'#333333','color':'#333333'});
            $('.selectB .two i').css('display','none');
            $('.selectB .one').addClass('active');
            $('.selectB .two').removeClass('active');
            getPrice();
        })

        $('.selectT .two').click(function () {
            $('.selectT .one').css({'borderColor':'#333333','color':'#333333'});
            $('.selectT .one i').css('display','none');
            $('.selectB .one').css({'borderColor':'#333333','color':'#333333'});
            $('.selectB .one i').css('display','none');
            $('.selectT .two').css({'borderColor':'#0085cf','color':'#0085cf'});
            $('.selectT .two i').css('display','inline-block');
            $('.selectB .one,.selectB .two').css('display','none');
            $('.selectB .three').css({'borderColor':'#0085cf','color':'#0085cf','display':'inline-block'});
            $('.selectB .three i').css('display','inline-block');
            $('.selectB .three').addClass('active');
            $('.selectB .one,.selectB .two').removeClass('active');
            getPrice();
        });

    })();

    /*下一步按钮*/
    $('.footer span').click(function () {
        window.location.href = '';
    });

    /*价格绑定*/
    function getPrice () {
        var $data = $('.selectB span').each(function () {
            $('.selectB span').hasClass('active');
        });
        if($data.hasClass('active')){
            var reg = /\d+/g;
            var str = $('.selectB .active').text();
            var ms = str.match(reg);
            if(ms == null){
                ms = 0
            }
            $('.footer p').html('¥'+ ms);
        }
    };

});
