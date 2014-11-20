/**
 * 获取鼠标在页面上的位置
 * _e       触发的事件
 * left:鼠标在页面上的横向位置, top:鼠标在页面上的纵向位置
 */
_mousepos = { //鼠标在页面上的位置
    "top": 0,
    "left": 0
}

function getMousePoint(_e) { //获取鼠标的坐标点
    var _body = document.body,
        _left = 0,
        _top = 0;
    //浏览器支持 pageYOffset, 那么可以使用pageXOffset 和 pageYOffset 获取页面和视窗之间的距离
    if (typeof window.pageYOffset != 'undefined') {
        _left = window.pageXOffset;
        _top = window.pageYOffset;
    }
    //如果浏览器指定了DOCTYPE并且支持compatMode
    else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
        _left = document.documentElement.scrollLeft;
        _top = document.documentElement.scrollTop;
    }
    //其他的如果浏览器支持document.body
    else if (typeof _body != 'undefined') {
        _left = _body.scrollLeft;
        _top = _body.scrollTop;
    }
    _left += _e.clientX;
    _top += _e.clientY;
    _mousepos.left = _left;
    _mousepos.top = _top;
    return _mousepos;
}

function setCss(_this, cssOption) { //设置元素样式
    //判断节点类型
    if (!_this || _this.nodeType === 3 || _this.nodeType === 8 || !_this.style) {
        return;
    }
    for (var cs in cssOption) { //遍历设置样式
        _this.style[cs] = cssOption[cs];
    }
    return _this;
}

function getAbsoluteLeft(_e) { //获取元素的绝对left
    var _left = _e.offsetLeft,
        _current = _e.offsetParent;
    while (_current !== null) { //遍历父节点累加left
        _left += _current.offsetLeft;
        _current = _current.offsetParent;
    }
    return _left;
}

function getAbsoluteTop(_e) { //获取元素的绝对top
    var _top = _e.offsetTop,
        _current = _e.offsetParent;
    while (_current !== null) { //遍历父节点累加top
        _top += _current.offsetTop;
        _current = _current.offsetParent;
    }
    return _top;
}
drawElement = null;
isDrawElement = false; //是否可拖动元素
startMousePos = { //鼠标按下的初始差值
    "left": 0,
    "top": 0
}
//绑定要滚动的元素
function bindDrawElement(e) {
    drawElement = e;
    var absoluteLeft = getAbsoluteLeft(e),
        absoluteTop = getAbsoluteTop(e);
    setCss(e, { //初始化样式
        "position": "absolute", //设置为绝对定位
        "left": absoluteLeft + "px",
        "top": absoluteTop + "px",
        "cursor": "move",
        "zIndex": 101
    });
    e.onmousedown = function(event) {
        event = event || window.event;
        var _pos = getMousePoint(event);
        isDrawElement = true; //开启移拖拽
        startDrawPos = { //设置差量，方便修正坐标
            "left": _pos.left - getAbsoluteLeft(this),
            "top": _pos.top - getAbsoluteTop(this)
        }
    }
    e.onmouseup = function() {
        isDrawElement = false;
    }
}

function moveDraw(event) { //拖动元素
    if (isDrawElement) { //如果开启滚轴
        event = event || window.event; //获取拖拽对象的坐标
        var _pos = getMousePoint(event);
        setCss(drawElement, {
            "left": (_pos.left - startDrawPos.left) + "px",
            "top": _pos.top - startDrawPos.top + "px"
        })
    }
}
//让层可以随意拖动
bindDrawElement(document.getElementById("bindDrawElement"));
document.body.onmousemove = function(e) {
    moveDraw(e); //让层可以随意拖动
}