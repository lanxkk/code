var forElementArr = function(_elementArr, callBack) { //遍历节点
    var arr = _elementArr, //所有节点对象
        self = this //外层环境
        ;
    if (!(_elementArr instanceof Array)) { //如果不是数组，变成数组对象方便处理
        arr = [_elementArr];
    };
    for (var i = 0, arrLen = arr.length; i < arrLen; i++) { //遍历数组
        var arrI = arr[i];
        if (typeof arrI == "string") { //判断是否为字符串
            arrI = document.getElementById(arrI);
        }
        callBack && callBack(i, arrI); //如果存在回调则执行回调
    }
},
    showRemainingCharacters = function(_nums, _remainingCharacters) {
        if (_remainingCharacters.search(",") != -1) { //是否存在,
            _remainingCharacters = _remainingCharacters.split(","); //英文字符串分割
        }
        forElementArr(_remainingCharacters, function(_index, _this) { //遍历元素
            _this.innerHTML = (_nums && _nums.toString()) || "0";
        });
    },
    remainingCharacters = document.getElementById("remainingCharacters"), //获取限制对象
    clearNonumber = function(tThis) { //清除数字
        var _v = tThis.value,
            _vLen = _v.length,
            dataLength = tThis.getAttribute("data-length"),
            remainingCharacters = tThis.getAttribute("data-remainingCharacters"); //如果有实时显示的属性，则在指定元素上显示
        /*区分中英文前                if(_v.length > dataLength) tThis.value = _v.substr(0, dataLength);*/
        var dataModel = tThis.getAttribute("data-model"); //区分中英文后
        var subLen = dataLength; //获取数据长度
        if (dataModel == "Ch") { //判断模式
            _vLen = strLen(_v, dataModel);
            var vv = _v.match(/[\u4e00-\u9fa5]/g); //匹配中午
            subLen = dataLength - (!vv ? 0 : vv.length);
        }
        if (_vLen > dataLength) tThis.value = _v.substr(0, subLen);
        if (remainingCharacters) {
            showRemainingCharacters(!_vLen ? dataLength : (_vLen > dataLength ? 0 : dataLength - _vLen), remainingCharacters);
        }
    };
remainingCharacters.onfocus = function() { //获取焦点
    clearNonumber(this);
}
remainingCharacters.onkeyup = function() { //键盘事件
    clearNonumber(this);
}
remainingCharacters.onblur = function() { //失去焦点
    clearNonumber(this);
}