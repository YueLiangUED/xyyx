(function(global){
    function remChange(){
        document.documentElement.style.fontSize=20*document.documentElement.clientWidth/750+'px';
    }
    remChange();
    global.addEventListener('resize',remChange,false);
})(window);

$(function () {
    //电话号码绑定
    (function () {
        var jsonObj={
            code:0,
            message:"success",
            data:{
                tels:[
                    "15373350279",
                    "18201450279",
                    "13733356464",
                    "13345672323",
                    "15373350279",
                    "18201450279",
                    "13733356464",
                    "15373350279",
                    "18201450279",
                    "13733356464",
                    "15373350279",
                    "18201450279",
                    "13733356464",
                    "15373350279",
                    "18201450279",
                    "13733356464",
                    "13733356464",
                    "13733356464",
                    "13733356464",
                    "13733356464",
                    "13733356464",
                    "13733356464",
                    "13733356464",
                    "13733356464",
                    "13733356464",
                ]
            }
        };

        var tmpStr="";
        for(var i=0;i<jsonObj.data.tels.length;i++){
            //debugger;
            var str=jsonObj["data"]["tels"][i];
            //console.log(str);
            tmpStr+="<li data-temp='"+ str +"'> ";
            for(var j=0;j<str.length;j++){
                tmpStr+="<i>"+str.charAt(j)+"</i>"
            }
            tmpStr+="</li>";
        }
        $('.list ul').html(tmpStr);
        $('#input').on('input',function () {
            var $this=$(this);
            var value=$this.val();
            //先清除所有特殊颜色的class
            $('.list ul i').removeClass('bg-blue');
            $('.list ul>li').each(function (index,ele) {
                var $ele=$(ele);
                //根据li的data-temp属性判断 ，输入的value是不是匹配
                var marchIndex=$ele.attr('data-temp').indexOf(value);
                if(marchIndex!==-1){
                    //如果匹配 就将li下匹配的i加上背景样式
                    var $i= $ele.find('i');
                    for(var j=0;j<value.length;j++){
                        $i.eq(j+marchIndex).addClass('bg-blue')
                    }
                }
            })
        });
    })();

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
    //筛选按钮
    $('.filter').click(function () {
        $('.rightHide').animate({width:"28.5rem"},200);
        $('html,body').css({'height':'100%','overflow':'hidden'})
        showMask();
    });
    //筛选弹出层确定按钮
    $('.entBtn').click(function () {
        $('.rightHide').animate({width:'0'},200);
        hideMask();
    });
    //我的订单按钮
    $('.indentBtn').click(function () {
        window.location.href = 'index-del.html';
    });

    //备选中立即购买按钮
    $('.beixuanBtn').click(function () {
        window.location.href = 'taocan.html';
    })
    //立即购买按钮
    $('.buyBtn').click(function () {
        window.location.href = 'taocan.html';
    });
    //入学靓号
    $('.aiqingBtn').click(function () {
        window.location.href = 'ruxue.html';
    });
    //生日靓号
    $('.shengriBtn').click(function () {
        window.location.href = 'shengri.html';
    });
    //爱情靓号
    $('.ruxueBtn').click(function () {
        window.location.href = 'aiqing.html';
    });
    //吉祥靓号
    $('.jixiangBtn').click(function () {
        window.location.href = 'jixiang.html';
    });
    /*add by jrl >>> */
    //筛选层的操作
    //用于控制选择的群组对象
    var filterGroups={};

    //实例化某一群组项目的构造函数
    function filterTabs($selector,groupId) {
        var $that=this;
        //该群组项目默认值
        this.defaultLi='不限';
        //该群组项目选中值
        this.selectedLi='';
        //该群组项目所在群组的id
        this.groupId=groupId;
        //该群组项目内的所有li
        this.lis=$selector.find('li');

        //将群组项目加入到群组对象中
        if(!filterGroups[groupId]){
            filterGroups[groupId]=[];
            filterGroups[groupId].push(this);
        }else{
            filterGroups[groupId].push(this);
        }

        //群组中li的点击事件
        this.lis.on('click',function () {
            if($(this).hasClass('clearFont')) return;
            //debugger;
            //修改选中的样式
            $that.selectedLi=this.innerHTML;
            $(this).addClass('active').siblings().removeClass('active');

            //把选中的值绑定到选中的结果中
            bindSelectedItems();

            //判断选中的项目的值，根据结果来决定其他群组是否置灰
            var checkGroupIsDefaultResult=checkGroupIsDefault(filterGroups[$that.groupId]);

            //选择后 改群组为默认值
            for(var key in filterGroups){
                if(key!==$that.groupId){
                    //让不同组的都不可选
                    for(var i=0;i<filterGroups[key].length;i++){
                        var tmpItem=filterGroups[key][i];
                        if(checkGroupIsDefaultResult) {
                            //如果该群组选择的都是默认值了，那么初始化其他群组
                            tmpItem.init();
                        }else{
                            //如果该群组选择的有不是默认值的，将其他群组置灰
                            tmpItem.disable();
                        }
                    }
                }
            }
        });

        //初始化群组项目
        this.init();
    }

    //置灰该群组项目
    filterTabs.prototype.disable=function () {
        this.selectedLi='';
        //样式置灰
        this.lis.removeClass('active').addClass('clearFont');
    };

    //初始化该群组项目
    filterTabs.prototype.init=function () {
        //选中默认选项
        this.selectedLi=this.defaultLi;
        //清除置灰样式 并默认选中第一项
        this.lis.removeClass('clearFont active').eq(0).addClass('active');
    };

    //判断某一群组中所有项目是否选择了默认值
    var checkGroupIsDefault=function(groupArray){
        for(var i=0;i<groupArray.length;i++){
            if(groupArray[i].selectedLi!==groupArray[i].defaultLi){
                return false;
            }
        }
        return true;
    };

    //绑定条件选中的结果
    var bindSelectedItems=function() {
        var tmpStr='';
        for(var key in filterGroups){
            for(var i=0;i<filterGroups[key].length;i++){
                if(filterGroups[key][i].selectedLi!==''&&filterGroups[key][i].selectedLi!==filterGroups[key][i].defaultLi) {
                    tmpStr+='<span data-groupid="'+key+'" data-index="' + i + '" >'+filterGroups[key][i].selectedLi+'</span>';
                }
            }
        }
        $('.tiaojian').html(tmpStr);
    };

    //实例化三个群组项目
    new filterTabs($('.tese'),'gp1');
    new filterTabs($('.tedian'),'gp2');
    new filterTabs($('.haoduan'),'gp2');


    //删除某一选中条件
    $('.tiaojian').on('click','span',function (){
        var $this=$(this);
        //初始化删除掉的群组项目
        var item=filterGroups[$this.attr('data-groupid')][$this.attr('data-index')];
        item.init();
        //把选中的值绑定到选中的结果中
        bindSelectedItems();

        //判断该群组项目所在群组是否都是默认值了，如果是的话，还需要把其他群组都初始化
        var checkGroupIsDefaultResult=checkGroupIsDefault(filterGroups[$this.attr('data-groupid')]);
        for(var key in filterGroups){
            if(key!==$this.attr('data-groupid')){
                //让不同组的都不可选
                for(var i=0;i<filterGroups[key].length;i++){
                    if(checkGroupIsDefaultResult) {
                        //如果该群组选择的都是默认值了，那么初始化其他群组
                        filterGroups[key][i].init();
                    }
                }
            }
        }
    });

    //删除所有选中条件
    $('.delBtn').on('click',function () {
        for(var key in filterGroups){
            for(var i=0;i<filterGroups[key].length;i++){
                filterGroups[key][i].init();
            }
        }
        //把选中的值绑定到选中的结果中
        bindSelectedItems();
    });

    //筛选弹出层确定按钮
    $('.entBtn').click(function () {
        if($('.tiaojian span').attr('data-groupid') == 'gp1' && $('.tiaojian span').text() == '入学靓号'){
            window.location.href = 'ruxue.html';
        }else if($('.tiaojian span').attr('data-groupid') == 'gp1' && $('.tiaojian span').text() == '生日靓号'){
            window.location.href = 'shengri.html';
        }else if($('.tiaojian span').attr('data-groupid') == 'gp1' && $('.tiaojian span').text() == '爱情靓号'){
            window.location.href = 'aiqing.html';
        }else if($('.tiaojian span').attr('data-groupid') == 'gp1' && $('.tiaojian span').text() == '吉祥靓号'){
            window.location.href = 'jixiang.html';
        }else{
            window.location.href = 'index.html';
        }
    });


    //"我的备选"按钮
    $('.fixedBtn').click(function () {
        $('.beixuan p span').text('编辑');
        //console.log(localStorage.getItem('joinitem'));
            if(localStorage.getItem('joinitem') == null){
                $('.opc').show().delay(2000).hide(300);
                $('.opc p').text('小主，您还没有选择号码哦~');
                return false;
            }else if(localStorage.getItem('joinitem') !=0){
                var $ul=$('.beixuan').animate({'height':'28.8rem'}).find('ul');
                var joinItems=localStorage.getItem('joinitem')?JSON.parse(localStorage.getItem('joinitem')):{};
                var tmpStr='';
                for(var tel in joinItems){
                    tmpStr+='<li>'+ tel +'</li>';
                }
                $ul.html(tmpStr);
                showMask();
                $('html,body').css({'height':'100%','overflow':'hidden'});
            }



    });
    //我的备选弹出层

    $('.mask').click(function () {
        $('.beixuan').animate({'height':'0'});
        $('.rightHide').animate({width:'0'},200);
        $('html,body').css({'overflow':'auto'});
        hideMask();
    });
    //编辑按钮
    $('.beixuan p span').click(function () {
        if($(this).text() == '编辑'){
            $(this).text('完成');
            $('.beixuan ul li').append('<i></i>');
            $('.beixuan ul li i').css('display','inline-block');
        }else if($(this).text() == '完成'){
            $(this).text('编辑');
            $('.beixuan ul li i').remove();
            $('.beixuan ul li i').css('display','none');
        }
    });
    //删除号码按钮
    $('.beixuan ul').on('click','i',function () {
        var tel = $(this).parent().text()
        //console.log($(this).parent());
        var tmpObj=JSON.parse(localStorage.getItem('joinitem'));
        if(tmpObj.hasOwnProperty(tel)){
            delete tmpObj[tel];
        }
        localStorage.setItem("joinitem", JSON.stringify(tmpObj));
        $(this).parent().remove();
    });

    //备选弹出层li状态切换&&首页li选中状态切换
    $('.beixuan ul').on('click','li',function () {
        $(this).addClass('bxActive').siblings().removeClass('bxActive');
    });
    function beixuanTab($select) {
        var $lis = $select.find('li');
        $lis.on('click',function () {
            var $index = $(this).index();
            $(this).addClass('bxActive').siblings().removeClass('bxActive');
        });
    }
    $.each($('.list ul'),function () {
        beixuanTab($(this));
    });

    //筛选标签
    $('.all .clear li').each(function (index,ele) {
        $(this).on('click',function () {
            $('.all').slideUp();
            hideMask();
            mySwiper.slideTo(index,true);
            mySwiper.clickedSlide=mySwiper.slides[index];
            mySwiper.params['onTap'](mySwiper);

        });
    });

    function countProperty(obj) {
        var i=0;
        for(var key in obj){
            i++;
        }
        //console.log(i);
        return i;
    }

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
            //console.log('joinitem');
            localStorage.setItem("joinitem", JSON.stringify({}));
        }
        var tmpObj=JSON.parse(localStorage.getItem('joinitem'));
        //debugger
        var tel=$('#tel-list li.bxActive').attr('data-temp');
        console.log(tel);
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


    //判断屏幕滚动
    (function(){
        var special = jQuery.event.special,
            uid1 = 'D' + (+new Date()),
            uid2 = 'D' + (+new Date() + 1);
        special.scrollstart = {
            setup: function() {

                var timer,
                    handler =  function(evt) {

                        var _self = this,
                            _args = arguments;

                        if (timer) {
                            clearTimeout(timer);
                        } else {
                            evt.type = 'scrollstart';
                            jQuery.event.dispatch.apply(_self, _args);
                        }

                        timer = setTimeout( function(){
                            timer = null;
                        }, special.scrollstop.latency);

                    };

                jQuery(this).bind('scroll', handler).data(uid1, handler);

            },
            teardown: function(){
                jQuery(this).unbind( 'scroll', jQuery(this).data(uid1) );
            }
        };

        special.scrollstop = {
            latency: 300,
            setup: function() {

                var timer,
                    handler = function(evt) {

                        var _self = this,
                            _args = arguments;

                        if (timer) {
                            clearTimeout(timer);
                        }

                        timer = setTimeout( function(){

                            timer = null;
                            evt.type = 'scrollstop';
                            jQuery.event.dispatch.apply(_self, _args);

                        }, special.scrollstop.latency);

                    };

                jQuery(this).bind('scroll', handler).data(uid2, handler);

            },
            teardown: function() {
                jQuery(this).unbind( 'scroll', jQuery(this).data(uid2) );
            }
        };

    })();

    (function(){
        //$('.fixedBtn').css({'opacity':'1'})
        //滑动屏幕时"我的备选"按钮改变透明度并右移
        jQuery(window).bind('scrollstart', function(){
            console.log("start");
            $('.fixedBtn').animate({'opacity':'0.3','right':'-5rem'})
        });

        jQuery(window).bind('scrollstop', function(e){
            console.log("end");
            $('.fixedBtn').animate({'opacity':'1','right':'2rem'},500)
        });

    })();
});
