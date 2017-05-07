(function(global){
    function remChange(){
        document.documentElement.style.fontSize=20*document.documentElement.clientWidth/750+'px';
    }
    remChange();
    global.addEventListener('resize',remChange,false);
})(window);
$(function () {
    //后退按钮
    /*$("#backward").click(function () {
        history.go(-1);//返回上一页不刷新页面
    });*/
    //查询订单按钮
    $(".queryBtn span").click(function () {
        //如果提交过订单
        if($("[name=name]").val()=="11" && $("[name=phone]").val()=="11"){
            $(".queryResult").show();
            $("body").css({"backgroundColor":"#f3f3f3"});
            $(".queryBtn").css({"marginBottom":"0"});
            $(".default").hide();
            $(".success").show();
            $(".phone.number").text($("[name=phone]").val());
            $(".time.number").text(/**/); //下单时间
        }else {//如果查询不到订单信息
            $(".queryResult").show();
            $("body").css({"backgroundColor":"#f3f3f3"});
            $(".queryBtn").css({"marginBottom":"0"});
            $(".success").hide();
            $(".default").show();
        }
    });
    $(".success span").click(function () {
        window.location.href = ""; //查看详情按钮,跳转到详情页
    })
})