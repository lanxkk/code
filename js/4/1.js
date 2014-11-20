var setCss = function(_this, cssOption) { //设置元素样式
    //判断节点
    if (!_this || _this.nodeType === 3 || _this.nodeType === 8 || !_this.style) {
        return;
    }
    for (var cs in cssOption) {
        _this.style[cs] = cssOption[cs];
    }
    return _this;
},
    _mousepos = { //鼠标在页面上的位置
        "top": 0,
        "left": 0
    },
    /**
     * 获取鼠标在页面上的位置
     * _e       触发的事件
     * left:鼠标在页面上的横向位置, top:鼠标在页面上的纵向位置
     */
    getMousePoint = function(_e) {
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
    },
    //参数---e被绑定的节点；tooltipMsg显示信息的节点
    tooltip = function(e, tooltipMsg) {
        var trE = e.rows, //获取被遍历的tr节点对象
            trLen = trE.length, //获取被遍历的节点长度
            i = 0;
        for (; i < trLen; i++) { //遍历被提示的对象
            var trEi = trE[i],
                dataTooltip = trEi.getAttribute("data-tooltip"); //获取数据
            if (dataTooltip) { //如果存在 data-tooltip 数据则绑定响应的事件
                trEi.onmousemove = function(event) { //显示提示信息
                    event = event || _W.event;
                    var _pos = getMousePoint(event);
                    tooltipMsg.innerHTML = this.getAttribute("data-tooltip"); //修正提示信息的坐标
                    setCss(tooltipMsg, {
                        "left": _pos.left + "px",
                        "top": (_pos.top + 18) + "px",
                        //显示信息
                        "display": "inline"
                    })
                }
                trEi.onmouseout = function() { //隐藏提示信息
                    setCss(tooltipMsg, { //隐藏信息
                        "display": "none"
                    })
                }
            }
        }
    };
tooltip(document.getElementById("tooltip"), document.getElementById("tooltipMsg"));