/******************************
 * 移动鼠标图片放大镜   start  *
 *******************************/
var isMoveFocus = false, //是否移动焦点
    focusElement = null, //焦点对象
    magnifierElement = null, //放大镜
    magnifierWidth = 800, //放大镜宽度
    focusZindex = 100, //焦点的Z轴
    magnifierScale = 0, //比例尺
    magnifierZindex = 101, //放大镜的Z轴
    eMagnifierMages = null, //放大镜的对象
    focusArae = { //焦点的面积
        "width": 50,
        "height": 50
    },
    setCss = function(_this, cssOption) { //设置元素样式
        //判断节点类型
        if (!_this || _this.nodeType === 3 || _this.nodeType === 8 || !_this.style) {
            return;
        }
        for (var cs in cssOption) { //遍历节点与设置样式
            _this.style[cs] = cssOption[cs];
        }
        return _this;
    }
initMagnifierMages = function(_e) { //初始化图片管理相关元素
    /*
     * 初始化放大镜效果的一些数据
     * */
    focusElement = setCss(document.getElementById("focusPoint"), { //焦点对象
        "z-index": focusZindex,
        "width": focusArae.width,
        "height": focusArae.height
    });
    initMagnifierPos(_e);
    magnifierScale = magnifierWidth / _e.offsetWidth; //比例尺换算
    var _img = _e.getAttribute("data-maxImg"); //设置大图
    document.getElementById("magnifierImg").setAttribute("src", _img);
},
mouseMagnifier = function(_e) { //放大镜业务处理
    this.initMagnifierMages(_e); //初始化图片管理的的元素
    this.eMagnifierMages = _e; //移动
},
_mousepos = { //鼠标在页面上的位置
    "top": 0,
    "left": 0
}
/**
 * 获取鼠标在页面上的位置
 * _e       触发的事件
 * left:鼠标在页面上的横向位置, top:鼠标在页面上的纵向位置
 */
getMousePoint = function(_e) {
    var _body = document.body,
        _left = 0,
        _top = 0;
    if (typeof window.pageYOffset != 'undefined') { //浏览器支持 pageYOffset, 那么可以使用pageXOffset 和 pageYOffset 获取页面和视窗之间的距离
        _left = window.pageXOffset;
        _top = window.pageYOffset;
    } else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') { //如果浏览器指定了DOCTYPE并且支持compatMode
        _left = document.documentElement.scrollLeft;
        _top = document.documentElement.scrollTop;
    } else if (typeof _body != 'undefined') { //其他的如果浏览器支持document.body
        _left = _body.scrollLeft;
        _top = _body.scrollTop;
    }
    _left += _e.clientX;
    _top += _e.clientY;
    _mousepos.left = _left;
    _mousepos.top = _top;
    return _mousepos;
},
pointCheck = function(_event, _e, options) {
    var _pos = getMousePoint(_event),
        _w = options && options.width || _e.offsetWidth, //获取元素的宽度
        _h = options && options.height || _e.offsetHeight, //获取元素的高度
        _left = getAbsoluteLeft(_e),
        _top = getAbsoluteTop(_e);
    _pos.left += options && options.left || 0;
    //计算鼠标的top与left值，是否落入元素的left与top内即可
    if (_pos.left < (_left + _w) && _left < _pos.left && _pos.top > _top && _pos.top < (_top + _h)) {
        return true;
    }
    return false;
},
bodyMagnifiermousemove = function(event) {
    var _event = _event || window.event,
        _e = eMagnifierMages;
    if (pointCheck(_event, _e)) {
        isMoveFocus = true;
        focusStatus();
        if (!isMoveFocus) return; //是否关闭放大镜效果
        focusPos(_e, _event); //计算焦点的位置
        magnifierPos(_e, _event); //显示放大镜效果
    } else {
        isMoveFocus = false;
        focusStatus();
    }
},
focusPos = function(_e, _event) { //计算聚焦点位置
    var _pos = getMousePoint(_event),
        _top = _pos.top - focusArae.height / 2,
        _left = _pos.left - focusArae.width / 2;
    setCss(focusElement, {
        "top": _top,
        "left": _left
    })
},
focusStatus = function() { //焦点的状态
    isMoveFocus && (setCss(focusElement, {
        "display": "block"
    }) && setCss(magnifierElement, {
        "display": "block"
    })) || (setCss(focusElement, {
        "display": "none"
    }) && setCss(magnifierElement, {
        "display": "none"
    }));
},
initMagnifierPos = function(_e) { //初始化放大镜位置
    //放大镜位置初始化
    magnifierElement = setCss(document.getElementById("magnifier"), {
        "z-index": magnifierZindex,
        "top": getAbsoluteTop(_e),
        "left": getAbsoluteLeft(_e) + _e.offsetWidth + focusArae.width
    });
},
magnifierPos = function(_e, _event) { //计算放大镜中图片位置
    var _pos = getMousePoint(_event),
        _top = magnifierScale * (_pos.top - getAbsoluteTop(_e) - focusArae.height / 2),
        _left = magnifierScale * (_pos.left - getAbsoluteLeft(_e) - focusArae.width / 2);
    if (_top < 0 || _left < 0) return;
    setCss(document.getElementById("magnifierImg"), {
        "top": "-" + _top,
        "left": "-" + _left
    });
},
getAbsoluteLeft = function(_e) { //获取元素的绝对left
    var _left = _e.offsetLeft,
        _current = _e.offsetParent;
    while (_current !== null) {
        _left += _current.offsetLeft;
        _current = _current.offsetParent;
    }
    return _left;
},
getAbsoluteTop = function(_e) { //获取元素的绝对top
    var _top = _e.offsetTop,
        _current = _e.offsetParent;
    while (_current !== null) {
        _top += _current.offsetTop;
        _current = _current.offsetParent;
    }
    return _top;
}
eMagnifierMages = document.getElementById("imagesSource");
initMagnifierMages(eMagnifierMages);
document.body.onmousemove = function(e) { //body 移动事件
    bodyMagnifiermousemove(e);
}