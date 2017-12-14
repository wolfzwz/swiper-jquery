class Loop {
	init(obj){
        //判断是否循环，添加前后元素
        this.loop(obj);
        this.transitionEnd(obj);
		return obj;
	}
	//判断是否循环，对循环初始化
	loop(obj){
        if(obj.params.loop){
            var wrapper = obj.wrapper;
            var first = wrapper.children().eq(0);
            var last = wrapper.children().eq(wrapper.children().size() - 1);
            wrapper.prepend(last.clone());
            wrapper.append(first.clone());
            //设置初始滑动
            obj.target = -1;
            obj.transform.call(obj.wrapper[0],obj.translate3d(-obj.targetArr[-obj.target]));
            this.loopFinished = true;
        }
	}
	//滑动结束后判断是否是第一个或者最后一个
	transitionEnd(obj){
		var t = obj;
		var active  = 0;
		//目标位移
		var translate = 0;
		//判断是否需要重置为第一个或者最后一个
        if(t.params.loop){
            $(obj.params.container).bind('touchstart',function(e){
                t.transition(0);
                //判断是否需要重置为第一个或者最后一个this.getTranslate(this.wrapper[0],'x');
                if(-t.target == 0){
                    t.target = -obj.slides.size()+2;
                     translate = -obj.targetArr[-obj.target] + t.getTranslate(t.wrapper[0],'x');
                    // t.transform.call(obj.wrapper[0],obj.translate3d(translate));
                     t.transform.call(obj.wrapper[0],obj.translate3d(translate));
                }
                else if(t.target == (-obj.slides.size()+1)){
                    t.target = -1
                    translate = -obj.targetArr[-obj.target] + obj.targetArr[obj.slides.size()-1] + t.getTranslate(t.wrapper[0],'x');
                    t.transform.call(obj.wrapper[0],obj.translate3d(translate));
                }
                t.transitionEnd(()=>{
                    console.log(new Date());
                    if(t.params.loop){
                        t.transition(0);
                        //判断是否需要重置为第一个或者最后一个this.getTranslate(this.wrapper[0],'x');
                        if(-t.target == 0){
                            t.target = -obj.slides.size()+2;
                            translate = -obj.targetArr[-obj.target] + t.getTranslate(t.wrapper[0],'x');
                            // t.transform.call(obj.wrapper[0],obj.translate3d(translate));
                            t.transform.call(obj.wrapper[0],obj.translate3d(translate));
                        }
                        else if(t.target == (-obj.slides.size()+1)){
                            t.target = -1;
                            translate = -obj.targetArr[-obj.target] + obj.targetArr[obj.slides.size()-1] + t.getTranslate(t.wrapper[0],'x');
                            t.transform.call(obj.wrapper[0],obj.translate3d(translate));
                        }
                    }
                    $('.swiper-pagination i').eq(-t.target - 1).
                    addClass('active').siblings().removeClass('active');
                })
            });
        }

	}
}

 
export default Loop;
