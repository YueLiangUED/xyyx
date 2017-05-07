(function(global){
    function remChange(){
        document.documentElement.style.fontSize=20*document.documentElement.clientWidth/750+'px';
    }
    remChange();
    global.addEventListener('resize',remChange,false);
})(window);

var currentPageObj={
    oldInputVal:'',
    oldSelectedVal:'',
    pageNum:0
};

function bindTelList() {
    //每次请求的时候 页码先加1
    var currentInputVal=$('#input').val();
    var currentSelectedVal=$('#select-zone').find('.swiper-slide.selected-slider span').eq(0).text();
    currentPageObj.pageNum++;

    $.getJSON('aiqing.json',{
        page: currentPageObj.pageNum, //页面延迟加载 一次加载20个手机号 为1页，请求包含页码
        inputVal: $('#input').val(),//查询参数 输入的值
        selectVal: $('#select-zone').find('.swiper-slide.selected-slider span').eq(0).text()//查询参数 选中的值
    },function(data) {
        if(data.code===0){
            //成功了要更新老的值
            currentPageObj.oldInputVal=currentInputVal;
            currentPageObj.oldSelectedVal=currentSelectedVal;

            var tmpStr="";
            var selectItemContent=$('#select-zone').find('.swiper-slide.selected-slider').eq(0).text().split('·')[1];
            var inputVal=currentPageObj.oldInputVal;
            var selectVal=currentPageObj.oldSelectedVal;

            $.each(data["data"]["resultData"], function(i,item){
                tmpStr+=" <li>";
                tmpStr+=" <p data-tel='"+item+"'>";
                var j=0,k=0;
                for(var i=0;i<item.length;i++){
                    if(inputVal&&item.startsWith(inputVal,i)){
                        j=inputVal.length;
                    }
                    if(selectVal&&item.startsWith(selectVal,i)){
                        k=selectVal.length;
                    }

                    if(j||k){
                        tmpStr+="<i class='march-letter'>"+item.charAt(i)+"</i>";
                        if(j>0) j--;
                        if(k>0) k--;
                    }else{
                        tmpStr+="<i>"+item.charAt(i)+"</i>";
                    }
                }
                tmpStr+="</p> ";
                tmpStr+=" <span>"+'生日靓号'+"</span> ";
                tmpStr+=" </li> ";
            });

            $('#tel-list').append(tmpStr);
        }else{
            alert(data.msg);
        }
        //请求成功后回写页码，确保页码正确
        currentPageObj.pageNum=data['data']['page'];

    }).error(function () {
        alert("抱歉，您的查询遇到了问题！");
        //失败了要页码-1
        currentPageObj.pageNum--;
    });

}

$(function () {
    !function () {
        $('#input').on('input',function () {
            if($('#input').val() != ''){
                //点击放大镜开始搜索
                $('.header i').click(function () {
                    $('.default').hide();
                    $('.phoneList').show();
                });
                //$('.default').hide();
                //$('.phoneList').show();
            }else if($('#input').val() == ''){
                $('.phoneList').hide();
                $('.default').show();
            }
        });
    }();
    //接口
    //页面加载后首次需要请求
    bindTelList();
    /*var slide = mySwiper.getSlide(mySwiper.activeIndex);
     console.log(slide);*/

    /*$('#search-btn').on('click',function () {
        var currentInputVal=$('#input').val();
        var currentSelectedVal=$('#select-zone').find('.swiper-slide.selected-slider span').eq(0).text();
        //console.log(currentInputVal,'----->>>',currentSelectedVal);
        if(currentPageObj.oldInputVal!==currentInputVal||currentPageObj.oldSelectedVal!==currentSelectedVal){
            currentPageObj.pageNum=0;
            $('#tel-list').html('');
            bindTelList();
        }
    });*/


    window.addEventListener('touchend', function() {
        if($(window).scrollTop() + $(window).height() >= $(document).height()-1){
            bindTelList();
        }
    }, false);

    function countProperty(obj) {
        var i=0;
        for(var key in obj){
            i++;
        }
        //console.log(i);
        return i;
    }

    $('#tel-list').on('click','li',function (e) {
        if ($(this).hasClass('selected-tel')) return;
        $(this).addClass('selected-tel').siblings().removeClass('selected-tel');

        /*
         if(!localStorage.getItem('joinitem')){
         localStorage.setItem("joinitem", "{}");
         }
         var tmpObj=JSON.parse(localStorage.getItem('joinitem'));
         var tel=$(this).children('p').attr('data-tel');
         if(!tel&&countProperty(tmpObj)<8){
         tmpObj[tel]=tel;
         localStorage.setItem("joinitem", JSON.stringify(tmpObj));
         }*/
    })
    window.setInterval(function () {
        if(countProperty(JSON.parse(localStorage.getItem('joinitem'))) == 0){
            $('.fixedBtn i').css('display','none');
        }else if(countProperty(JSON.parse(localStorage.getItem('joinitem'))) != 0){
            $('.fixedBtn i').css('display','inline-block');
            $('.fixedBtn i').text(countProperty(JSON.parse(localStorage.getItem('joinitem'))));
        }
    },0);


    $('.joinBtn').click(function () {
        //debugger;
        if(!localStorage.getItem('joinitem')){
            console.log('joinitem');
            localStorage.setItem("joinitem", JSON.stringify({}));
        }
        var tmpObj=JSON.parse(localStorage.getItem('joinitem'));
        //debugger
        var tel=$('#tel-list li.selected-tel').children('p').attr('data-tel');
        //console.log(tel);
        if(tel&&countProperty(tmpObj)<8){
            tmpObj[tel]=tel;
            localStorage.setItem("joinitem", JSON.stringify(tmpObj));
        }else if(tel&&countProperty(tmpObj) == 8){
            $('.opc').show().delay(2000).hide(300);
            $('.opc p').text('小主，最多可备选8个号码哦~');
        }else if(tel&&countProperty(tmpObj) == 0){
            $('.opc').show().delay(2000).hide(300);
            $('.opc p').text('小主，您还没有选择号码哦~');
        }
    });


});
