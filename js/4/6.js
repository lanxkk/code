var bodyEvents = function() { //body 事件 ，将所有的body事件都放在一个函数内---拖拽事件
    document.body.onmousemove = function(e) { //body的鼠标移动事件
        bodyTableDrawmove(e); //表格内容拖拽效果
    }
    document.body.onmouseup = function(e) { //body鼠标按键up事件
        bodyTableDrawmouseup(e);
    }
},
    getAbsoluteLeft = function(_e) { //获取元素的绝对left
        var _left = _e.offsetLeft,
            _current = _e.offsetParent;
        while (_current !== null) { //遍历所有父层计算left
            _left += _current.offsetLeft;
            _current = _current.offsetParent;
        }
        return _left;
    },
    getAbsoluteTop = function(_e) { //获取元素的绝对top
        var _top = _e.offsetTop,
            _current = _e.offsetParent;
        while (_current !== null) { //遍历所有父层计算top
            _top += _current.offsetTop;
            _current = _current.offsetParent;
        }
        return _top;
    },
    setCss = function(_this, cssOption) { //设置元素样式
        //判断节点类型
        if (!_this || _this.nodeType === 3 || _this.nodeType === 8 || !_this.style) {
            return;
        }
        for (var cs in cssOption) { //遍历设置样式
            _this.style[cs] = cssOption[cs];
        }
        return _this;
    },
    pointCheck = function(_event, _e, options) { //碰撞检测
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
    };
drawContent = null; //拖拽绑定
drawing = false; //是否开启拖拽
startDrawTd = null; //开始拖拽的td元素
drawTd = null; //进入到指定td元素
startDrawPos = { //鼠标起始位置
    "left": 0,
    "top": 0
};
drawTds = []; //拖拽的所有Td元素
drawTdsLen = 0; //拖拽的所有Td元素个数
var tableDraw = function(table, tableDrawContent) {
    drawContent = tableDrawContent;
    var r = table.rows,
        rl = r.length,
        i = 0,
        c = [],
        cl = 0,
        l = 0;
    for (; i < rl; i++) {
        c = r[i].cells;
        cl = c.length;
        l = 0;
        for (; l < cl; l++) {
            drawTds.push(c[l]);
        }
    }
    drawTdsLen = drawTds.length;
    tableDrawing();
},
    openTableDraw = function(event) { //开启拖拽
        event = event || window.event;
        var _pos = getMousePoint(event);
        this.drawing = open;
        startDrawPos = { //起始偏移值
            "left": _pos.left - this.getAbsoluteLeft(drawContent),
            "top": _pos.top - this.getAbsoluteTop(drawContent)
        };
    },
    closeTableDraw = function() { //关闭拖拽
        this.drawing = false;
        setCss(drawContent, {
            "left": "0px",
            "top": "0px",
            "position": "static"
        });
        drawTd.style.backgroundColor = "#fff";
    },
    tableDrawing = function() {
        drawContent.onmousedown = function(e) {
            startDrawTd = this.parentNode;
            openTableDraw(e);
        }
    },
    bodyTableDrawmoveTd = function(event) {
        var i = 0,
            _drawTdsI = null;
        for (; i < drawTdsLen; i++) {
            _drawTdsI = drawTds[i];
            if (pointCheck(event, _drawTdsI)) { //检测是否选择当前元素
                if (drawing) { //进入元素
                    drawTd = _drawTdsI; //设置选中的元素
                }
            } else {
                _drawTdsI.style.backgroundColor = "#fff"; //恢复没有被选中的颜色
            }
        }
        drawTd.style.backgroundColor = "#E7AB83"; //被选中的显示颜色
    },
    bodyTableDrawmove = function(event) { //表格拖拽body的move事件
        event = event || window.event; //获取拖拽对象的坐标
        var _pos = getMousePoint(event);
        //如果不存在被拖拽的对象，禁止拖拽
        if (!drawContent || !drawing) return false;
        //进入哪一个td --- 由于拖拽的元素覆盖td，所以事件绑定有碰撞检测担任
        bodyTableDrawmoveTd(event);
        setCss(drawContent, { //设置元素的位置
            "left": (_pos.left - startDrawPos.left) + "px",
            "top": (_pos.top - startDrawPos.top) + "px"
        });
        if (drawContent.style.position != "absolute") { //修改元素的定位方式
            drawContent.style.position = "absolute";
        }
    },
    //表格拖拽body的mouseup事件
    bodyTableDrawmouseup = function() {
        //如果不存在被拖拽的对象，禁止拖拽
        if (!drawContent || !drawTd || !drawing) return false;
        drawTd.innerHTML = ""; //设置被拖入的区域为空
        drawTd.appendChild(drawContent); //将被拖拽的内容追加在拖入的区域元素内
        var _html = startDrawTd.innerHTML; //内容替换，防止被拖拽的内容覆盖
        if (_html.search("等待被拖入元素") == -1 && _html.search("被拖拽的内容") == -1) {
            startDrawTd.innerHTML = "等待被拖入元素";
        }
        closeTableDraw(); //关闭拖拽
    };
tableDraw(document.getElementById("tableDraw"), document.getElementById("tableDrawContent"));
bodyEvents();