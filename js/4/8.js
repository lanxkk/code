function setCss(_this, cssOption) { //设置元素样式
    //判断节点类型
    if (!_this || _this.nodeType === 3 || _this.nodeType === 8 || !_this.style) {
        return;
    }
    for (var cs in cssOption) {
        _this.style[cs] = cssOption[cs];
    }
    return _this;
}

function autoNewline(e) {
    var str = "", //初始化接受字符串对象
        strContent = e.innerHTML, //被切割的字符
        allWidth = getTextWidth(e), //被绑定元素的所有字体宽度
        fontWidth = allWidth / strContent.length, //每个字体的宽度
        rowWidth = Math.floor(e.offsetWidth / fontWidth); //每行最多放多少字
    while (strContent.length > rowWidth) { //切割字符
        str += strContent.substr(0, rowWidth) + "<br />";
        strContent = strContent.substr(rowWidth, strContent.length);
    }
    str += strContent;
    e.innerHTML = str; //设置元素的字符结果
}

function getTextWidth(e) { //获取文字的宽度
    e = e.cloneNode(true); //深度克隆文字节点
    var textWidth = 0,
        _body = document.body;
    _body.appendChild(e); //追加在body元素上
    setCss(e, { //设置样式
        "width": "auto",
        "position": "absolute",
        "zIndex": -1
    });
    textWidth = e.offsetWidth; //获取宽度
    _body.removeChild(e); //释放节点
    return textWidth; //返回文字宽度
}
//英文字符串超出元素宽度自动换行
autoNewline(document.getElementById("autoNewline"));