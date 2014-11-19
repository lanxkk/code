var getRegular = function(rstr) {
    var regData = {}; //正则数据存储域
    regData.rtrim = /^(\s|\u00A0)+|(\s|\u00A0)+$/g; // 去除空格的正则
    regData.Chinese = /[\u4e00-\u9fa5]/g; //中文
    regData.nonumber = /\D/g; //数字
    regData.nochinese = /[^\u4e00-\u9fa5]/g; //非中文
    regData.email = /^\s*[a-zA-Z0-9]+(([\._\-]?)[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([_\-][a-zA-Z0-9]+)*(\.[a-zA-Z0-9]+([_\-][a-zA-Z0-9]+)*)+\s*$/; //邮件
    regData.phone = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,})){0,}$/; //电话
    regData.decimalNumber = /^\d+(\.\d+)+$/; //带小数位的数字
    regData.htmlTags = /<[\/\!]*[^<>]*>/ig; //html
    return regData[rstr];
},
    forElementArr = function(_elementArr, callBack) {
        var arr = _elementArr,
            self = this;
        if (!(_elementArr instanceof Array)) {
            arr = [_elementArr];
        };
        for (var i = 0, arrLen = arr.length; i < arrLen; i++) {
            var arrI = arr[i];
            if (typeof arrI == "string") {
                arrI = self.getElement(arrI);
            }
            callBack && callBack(i, arrI);
        }
    },
    verification = function(str, reg) {
        return getRegular(reg).test(str);
    },
    setCss = function(_this, cssOption) {
        if (!_this || _this.nodeType === 3 || _this.nodeType === 8 || !_this.style) {
            return;
        }
        for (var cs in cssOption) {
            _this.style[cs] = cssOption[cs];
        }
        return _this;
    };
forElementArr([
    document.getElementById("regUser"),
    document.getElementById("regEmail"),
    document.getElementById("regPhone"),
    document.getElementById("regNumber")
], function(index, _this) {
    _this.onkeyup = function() {
        var _v = this.value.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, ""), //获取被处理的元素值
            _reg = this.getAttribute("data-reg"), //获取正则
            __reg = _reg.indexOf(",") > 0 ? _reg.split(",") : [_reg], //如果含有“,”则将其转换成多数组
            _regLen = __reg.length, //数组长度
            _emsg = this.getAttribute("data-emsg"), //错误信息显示
            _smsg = this.getAttribute("data-smsg"), //通过信息显示
            _target = document.getElementById(this.getAttribute("data-tmsg")), //获取显示信息的元素
            i = 0;
        for (; i < _regLen; i++) {
            if (!verification(_v, __reg[i])) {
                _target.innerHTML = _emsg;
                setCss(_target, {
                    "color": "red"
                })
                return;
            }
        }
        _target.innerHTML = _smsg;
        setCss(_target, {
            "color": "green"
        })
    }
});