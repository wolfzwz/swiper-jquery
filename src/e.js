
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
                }
                else if(t.target == (-t.slides.size()+1)){
                    t.target = -1
                    translate = t.target * t.slides.width() + (t.slides.size() - 1) * t.slides.width() + t.getTranslate(t.wrapper[0],'x');
                    t.transition(0);
                }else{
                    translate = t.target * t.slides.width();
                    t.transition(t.params.time);
                }
                t.transform.call(t.wrapper[0],t.translate3d(translate));
                //判断是否需要重置为第一个或者最后一个this.getTranslate(this.wrapper[0],'x');
            }
            that.play = true;
            clearTimeout(t.autoPlay.timeOut);
           return setTimeout(auto,t.params.autoPlay)
        }
        t.autoPlay = {};
        //这种方法无法清除
        t.autoPlay.timeOut =  auto();
        $(t.params.container).bind('touchstart',function(e){
            //这种方法无法清除
            clearTimeout(t.autoPlay.timeOut);
        });
        $(t.params.container).bind('touchend',function(e){
            t.autoPlay.timeOut = setTimeout(auto,t.params.autoPlay);
        });
    };
}


export default AutoPlay;