(function(global){
    function remChange(){
        document.documentElement.style.fontSize=20*document.documentElement.clientWidth/750+'px';
    }
    remChange();
    global.addEventListener('resize',remChange,false);
    var $solid = $('.solid');
    var $content =$('.content');
    $solid.height($content.height());
    //console.log($content.height())
})(window);