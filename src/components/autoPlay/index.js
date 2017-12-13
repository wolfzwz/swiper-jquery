
class AutoPlay {
    //初始化
    init(obj){
        this.start(obj);
        return obj;
    };
    //播放
    start(obj){
        var t = obj;
        var that = this;
        if(t.params.autoPlay === void 0){
            return false;
        }
        function auto(){
            if(t.params.loop && that.play !== void 0){
                t.target --;
                //var translate = t.target * t.slides.width();
                var translate = 0;
                if(-t.target == 0){
                    t.target = -t.slides.size()+2;
                    translate = t.target * obj.slides.width() + t.getTranslate(t.wrapper[0],'x');
                    t.transition(0);
                    t.transform.call(t.wrapper[0],t.translate3d(translate));
                }
                //判断是不是最后一个
                else if(t.target == (-t.slides.size()+1)){
                    t.transition(0);
                    //移动到第一个元素
                    t.transform.call(t.wrapper[0],t.translate3d(0));
                    t.target = -1;
                    //移动到下个元素
                    setTimeout(()=>{
                        translate = -t.targetArr[-t.target];
                        t.transition(t.params.time);
                        t.transform.call(t.wrapper[0],t.translate3d(translate));
                    },0);

                }else{
                    translate = -t.targetArr[-t.target];
                    t.transition(t.params.time);
                    t.transform.call(t.wrapper[0],t.translate3d(translate));
                }
                $('.swiper-pagination i').eq(-t.target - 1).
                addClass('active').siblings().removeClass('active');
                //判断是否需要重置为第一个或者最后一个this.getTranslate(this.wrapper[0],'x');
            }
            //没有开启循环功能
            else if(!t.params.loop && that.play !== void 0){
                if(t.target === void 0){
                   t.target = 0;
                }
                t.target --;
                //var translate = t.target * t.slides.width();
                var translate = 0;
                if(-t.target == 0){
                    t.target = -t.slides.size()+2;
                    translate = t.target * obj.slides.width() + t.getTranslate(t.wrapper[0],'x');
                    t.transition(0);
                    t.transform.call(t.wrapper[0],t.translate3d(translate));
                }
                //判断是不是最后一个
                else if(t.target == (-t.slides.size())){
                    t.target = 0;
                    translate = t.targetArr[0];
                    t.transition(t.params.time);
                    t.transform.call(t.wrapper[0],t.translate3d(translate));
                }else{
                    translate = -t.targetArr[-t.target];
                    t.transition(t.params.time);
                    t.transform.call(t.wrapper[0],t.translate3d(translate));
                }
                t.transitionEnd(()=>{
                    $('.swiper-pagination i').eq(-t.target).
                    addClass('active').siblings().removeClass('active');
                })
            }


            that.play = true;
            clearTimeout(t.autoPlay.timeOut);
            t.autoPlay.timeOut = setTimeout(auto,t.params.autoPlay)
        }
        t.autoPlay = {};
        auto();
        $(t.params.container).bind('touchstart',function(e){
            clearTimeout(t.autoPlay.timeOut);
        });
        $(t.params.container).bind('touchend',function(e){
           t.autoPlay.timeOut = setTimeout(auto,t.params.autoPlay);
        });
    };
}


export default AutoPlay;