class OuterWidth{
    init(obj){
        this.targetSlides(obj);
        return obj;
    };
    //给obj添加target数组
    targetSlides(obj){
        var  t = obj;
        var slides = t.slides;
        var allWidth = 0;
        t.targetArr = [0];
        slides.each(function(){
            allWidth += $(this).outerWidth(true);
            t.targetArr.push(allWidth);
        });
        z(t.targetArr);
    }
}

export default OuterWidth;