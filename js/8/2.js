/*
 * 方向变更捕获
 * */
var orientationCall = [], //方向改变事件待执行的函数队
    orientation = (function() { //移动设备方向改变事件
        var o = ""; //待遍历的对象键
        window.addEventListener("orientationchange", function(event) { //检测浏览器的方向改变
            for (o in orientationCall) {
                orientationCall[i](); //运行待执行的函数
            }
        }, false);
    })();
var addOrientation = function(callFun) { //增加方向变换的回调队列
    orientationCall[orientationCall.length] = callFun; //推入回调
},
    /*
     *区分移动设备屏幕的竖/横 屏
     * */
    orientation = "vertical", //默认垂直（vertical），横向（Horizontal）
    isOrientation = (typeof window.orientation == "number" && typeof window.onorientationchange == "object"), //检测是否支持window.orientation
    getOrientation = function() { //获取设备的方向
        if (this.isOrientation) { //如果支持 window.orientation
            orientation = window.orientation == 0 ? "vertical" : "Horizontal"; //0表示竖屏，正负90表示横屏（向左与向右）模式
        } else {
            this.orientation = window.innerWidth > window.innerHeight ? "Horizontal" : "vertical"; //根据高度与宽度判断是：横屏或竖屏
        }
        document.body.setAttribute("mob-orientation", this.orientation); //为body添加判断方向属性
    },
    updateorientation = function() { //更新屏幕的方向值
        getOrientation(); //更新方向
        addOrientation(getOrientation); //方向变更的时候，更新屏幕方向数值
    };