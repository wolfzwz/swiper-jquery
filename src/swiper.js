
window.z = function(){
	for(var i = 0; i < arguments.length; i++){
        console.log(arguments[i]);
	}
}
//
import components from './components'

window.Swiper = Swiper;

function Swiper (obj) {
	//touch time
	this.time = {
		s: 0,
		e: 0
	};
	//touch s position
	this.spos = {
		x: 0,
		y: 0
	};
	//
	this.dis = {
		x: 0,
		y: 0
	}
	//move direction
	this.direction = 'horizontal';
	//is fast touch
	this.fastTouch = false;
	//translate
	this.translate = {
		curr: 0,
		min: 0,
		max: 0
	};
	//target
	this.target = undefined;
	this.defaults = {
		resistance: true
	},
	this.startDirection = 0;
	this.params = obj;

	this.start();
}
Swiper.prototype = {
	start: function(){
		//初始化配置
			//new Loop().init(this);
			this.init();
			this.components();
        //开启
			this.touchstart();
			this.touchmove();
			this.touchend();
			this.maxTranslate();
			this.paginationActive();
	},
	//基础数据初始化
	init(){
		//wrapper
			this.wrapper = $('.swiper-wrapper');
			this.width = $(this.params.container).width();
			this.slides = $('.swiper-slide');
			new components[0]().init(this);
	},
	//组件调用
	components(){
		components.map((item)=>{
			if(typeof item === 'function'){
                new item().init(this).init();
			}
		})
	},
	touchstart: function(){
		$('.swiper-container').bind('touchstart',function(e){
			this.time.s = new Date().getTime();
			var target = e.originalEvent.targetTouches[0];
			this.spos.x = target.pageX;
			this.spos.y = target.pageY;
			this.transition(0);
			this.translate.curr = this.getTranslate(this.wrapper[0],'x');
		}.bind(this));
	},
	touchmove: function(){
		$('.swiper-container').bind('touchmove',function(e){
			
			var defaults = this.defaults;
			var t = e.originalEvent.targetTouches[0];
			this.getStartDirection(Math.abs(t.pageX - this.spos.x),Math.abs(t.pageY - this.spos.y));
			if(this.startDirection == 2){
				return ;
			}else{
				e.preventDefault();
			}
			this.dis.x += t.pageX - this.spos.x;
			this.dis.y += t.pageY - this.spos.y;
			var translate = 0,translate3d = 0;
			if(defaults.resistance){
				translate = this.translate.curr + this.dis.x;
				this.dis.x += (translate > 0 || translate < -this.targetArr[this.targetArr.length - 2] ? -2/3 * (t.pageX - this.spos.x) : 0);
				//translate = this.translate.curr + this.dis.x
				translate = this.translate.curr + this.dis.x
				translate3d = 'translate3d('+ translate +'px,0,0)';
				
			}else{
				translate = this.translate.curr + this.dis.x;
				translate3d = 'translate3d('+ (
					translate > 0 ? 0 :
					translate > -this.translate.max ? translate : -this.translate.max
				)+'px,0,0)';
			}
			if(Math.abs(t.pageX - this.spos.x) > Math.abs(t.pageY - this.spos.y)){
				this.transform.call(this.wrapper[0],translate3d);
			}
			this.spos.x = t.pageX;
			this.spos.y = t.pageY;
		}.bind(this));
	},
	touchend: function(){
		var time = this.time;
		var dis = this.dis;
		var defaults = this.defaults
		$('.swiper-container').bind('touchend',function(e){
			this.startDirection = 0;
			if(this.dis.x < 0){
				this.direction = 'left';
			}else if(this.dis.x > 0){
				this.direction = 'right';
			}else{
                this.direction = undefined;
			}
			console.log('direction',this.direction);
			this.dis.x = 0;
			this.dis.y = 0;
			this.translate.curr = this.getTranslate(this.wrapper[0],'x');
			time.e = new Date().getTime();
			var translate3d = 0;
			if(this.target === void 0){
				this.target = 0;
			}
			if(time.e - time.s < 300){
				this.transition(this.params.time);
				if(this.direction === 'left'){
					if(this.getTranslate(this.wrapper[0],'x') < 0 && this.getTranslate(this.wrapper[0],'x') > -this.translate.max){
						this.target = -this.getTarget(-this.getTranslate(this.wrapper[0],'x'));
					}
                    console.log(this.target)
					translate3d = 'translate3d(' + -this.targetArr[-this.target] + 'px,0,0)';
					this.transform.call(this.wrapper[0],translate3d);
				}else if(this.direction == 'right'){
					if(this.getTranslate(this.wrapper[0],'x') < 0 && this.getTranslate(this.wrapper[0],'x') > -this.translate.max){
                        this.target = -this.getTarget(-this.getTranslate(this.wrapper[0],'x')) + 1;
					}
					translate3d = 'translate3d(' + -this.targetArr[-this.target] + 'px,0,0)';
					this.transform.call(this.wrapper[0],translate3d);
				}else if (this.direction === void 0){
                    if(this.getTranslate(this.wrapper[0],'x') < 0 && this.getTranslate(this.wrapper[0],'x') > -this.translate.max){
                        translate3d = 'translate3d(' + -this.targetArr[-this.target] + 'px,0,0)';
                        this.transform.call(this.wrapper[0],translate3d);
                    }
				}
			}else{
				this.transition(this.params.time);
				if(this.direction === 'left' ){
                    this.target = -this.getTarget(-this.getTranslate(this.wrapper[0],'x'));

                    console.log(this.targetArr[-this.target])
					this.target = Math.round(
						(-this.getTranslate(this.wrapper[0],'x') - this.targetArr[-this.target]) /
						(this.targetArr[-this.target + 1] - this.targetArr[-this.target])
                    ) == 1 ? this.target + 1 : this.target;
					translate3d = 'translate3d(' + -this.targetArr[-this.target] + 'px,0,0)';
					this.transform.call(this.wrapper[0],translate3d);
				}else if(this.direction == 'right'){
					this.target = Math.round(
						this.getTranslate(this.wrapper[0],'x') / this.slides.width()
					);
					translate3d = 'translate3d(' + -this.targetArr[-this.target] + 'px,0,0)';
					this.transform.call(this.wrapper[0],translate3d);
				}else if (this.direction === void 0){
                    if(this.getTranslate(this.wrapper[0],'x') < 0 && this.getTranslate(this.wrapper[0],'x') > -this.translate.max){
                        translate3d = 'translate3d(' + -this.targetArr[-this.target] + 'px,0,0)';
                        this.transform.call(this.wrapper[0],translate3d);
                    }
                }
			}
		}.bind(this));
	},
	transform: function(translate,callback){
		this.style.webkitTransform = translate;
		this.style.transform = translate;
		if(callback){
			callback();
		}
	},
	maxTranslate: function(){
		//this.translate.max = (this.slides.size() - 1) * this.slides.width();
		this.translate.max = this.targetArr[this.targetArr.length - 1];
	},
	getTranslate: function(el,dir){
		var win = window;
		dir = dir;
	    var matrix;
	    var curTransform;
	    var transformMatrix;
	
	    var curStyle = win.getComputedStyle(el, null);
	    if (win.WebKitCSSMatrix) {
	      curTransform = curStyle.transform || curStyle.webkitTransform;
	      if (curTransform.split(',').length > 6) {
	        curTransform = curTransform.split(', ').map(function (a) { return a.replace(',', '.'); }).join(', ');
	      }
	      // Some old versions of Webkit choke when 'none' is passed; pass
	      // empty string instead in this case
	      transformMatrix = new win.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
	    } else {
	      transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
	      matrix = transformMatrix.toString().split(',');
	    }
	
	    if (dir === 'x') {
	      // Latest Chrome and webkits Fix
	      if (win.WebKitCSSMatrix) { curTransform = transformMatrix.m41; }
	      // Crazy IE10 Matrix
	      else if (matrix.length === 16) { curTransform = parseFloat(matrix[12]); }
	      // Normal Browsers
	      else { curTransform = parseFloat(matrix[4]); }
	    }
	    if (dir === 'y') {
	      // Latest Chrome and webkits Fix
	      if (win.WebKitCSSMatrix) { curTransform = transformMatrix.m42; }
	      // Crazy IE10 Matrix
	      else if (matrix.length === 16) { curTransform = parseFloat(matrix[13]); }
	      // Normal Browsers
	      else { curTransform = parseFloat(matrix[5]); }
	    }
	    return curTransform || 0;
	},
	getTarget(dis){
		var t = this;
		var target = 0;
		t.targetArr.map(function(item,i){
			if(i != 0){
                if(dis < item && dis > t.targetArr[i - 1]){
                    target = i;
                    if( i == t.targetArr.length -1){
                    	target --;
					}
                }
			}

		});
		return target;
	},
	translate3d(dis){
        var translate3d = 'translate3d(' + dis + 'px,0,0)';
        return translate3d;
	},
	transition: function(duration){
	  if (typeof duration !== 'string') {
	    duration = duration + "ms"; 
	  }
      var elStyle = this.wrapper[0].style;
	  elStyle.webkitTransitionDuration = duration;
	  elStyle.transitionDuration = duration;
	},
	getStartDirection(x,y){
		if(x > y && this.startDirection != 2){
			this.startDirection = 1;
		}else{
			if(this.startDirection != 1){
				this.startDirection = 2;
			}	
		}
	},
	transitionEnd(callback) {
	  var that = this;
	  var events = ['webkitTransitionEnd', 'transitionend'];
	  var i;
	  function fireCallBack(e) {
	    /* jshint validthis:true */
	    //if (e.target !== this) { return; }
	    callback.call(this, e);
	    for (i = 0; i < events.length; i += 1) {
	      that.wrapper.off(events[i], fireCallBack);
	    }
	  }
	  if (callback) {
	    for (i = 0; i < events.length; i += 1) {
	    	that.wrapper.on(events[i], fireCallBack);
	    }
	  }
	},
	paginationActive(){
		var t = this;
		var pagition = $('.swiper-pagination');
		var span = $('<i></i>');
		var size = undefined;
		if(this.params.loop){
            size = this.slides.size() - 2;
		}else{
            size = this.slides.size()
		}
		for (var i = 0; i < size; i++){
            if(i == 0){
                pagition.append(span.addClass('active'));
            }else{
                pagition.append($('<i></i>'));
            }
		}
	}
};
