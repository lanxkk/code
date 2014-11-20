/*网页图片较多时，分批次加载图片*/
var preImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"; //预设图片
var needLoadImgs = (function(loads) {
    /*
     * 1,待加载元素的集合
     * 2,待加载的元素，必须采用替换或其它方法停止图片加载
     * 3,加载图片的触发条件，容器在可视区域内
     * 4,,加载图片的影响因素，窗体滚动、大小改变的时候
     * 5，重复以上动作，直到所有图片加载完毕为止
     * */
    var needLoadImgs = function() {
        var that = this;
        this._imgs = [];
        this.initImgs = function() {
            var l = document.images.length,
                i = 0,
                imgs = document.images,
                _i = null;
            if (l > 0) { //是否启用事件
                for (; i < l; i++) {
                    _i = imgs[i];
                    this._imgs[i] = _i; //待载入图的数组
                    if (_i.src === undefined || _i.src === false) { //检测是否存在损坏图片
                        _i.src = preImg;
                    }
                }
                that.updateImg();
                that.initEvent();
            }
        }
    }
    needLoadImgs.prototype.initEvent = function() { //绑定事件检测
        var that = this;
        //滚轴事件
        window.onscroll = function() {
            that.updateImg();
        }
    }
    needLoadImgs.prototype.updateImg = function() {
        var i = 0,
            l = this._imgs.length,
            imgs = this._imgs,
            cimg = "",
            _i = null,
            windowHeight = document.all ? document.getElementsByTagName("html")[0].offsetHeight : window.innerHeight,
            scrollY = document.documentElement.scrollTop || document.body.scrollTop; //滚动条距离顶部高度
        for (; i < l; i++) {
            _i = imgs[i];
            cimg = _i.getAttribute("data-source");
            if (cimg) { //判断图片是否在可视区域,如果在可视区域加载
                if (getAbsoluteTop(_i) + _i.offsetHeight / 4 < windowHeight + scrollY) {
                    _i.src = cimg; //设置源图片地址
                    imgs.splice(i, 1); //删除已经设置过图片的对象
                    l = this._imgs.length;
                }
            }
        }
    }
    return new needLoadImgs(loads);
})();

function getAbsoluteTop(_e) { //获取元素的绝对top
    var _top = _e.offsetTop,
        _current = _e.offsetParent;
    while (_current !== null) {
        _top += _current.offsetTop;
        _current = _current.offsetParent;
    }
    return _top;
}
/*============图片分批加载========*/
needLoadImgs.initImgs();