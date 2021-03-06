var d = new Date(); //获取日期对象
//日期格式化成字符串
function dateFormat() {
    Date.prototype.format = function(f) {
        var date = { //获取对象中的日期
            "Y": this.getFullYear(), //获取年
            "M": (this.getMonth() + 1), //获取月
            "D": this.getDate(), //获取日
            "h": this.getHours(), //获取小时
            "m": this.getMinutes(), //获取分钟
            "s": this.getSeconds() //获取秒
        },
            d = "", //初始化接受日期变量的对象
            r = false, //判断是否存在待替换的字符
            reg = null, //正则
            _d = ""; //日期
        for (d in date) { //过滤日期标示符
            //判断是否有待格式化的字符
            reg = new RegExp("[" + d + "]{1,}", "g");
            r = reg.test(f);
            if (r) //验证是否存在
            {
                //被替换的日期
                _d = date[d];
                f = f.replace(reg, _d < 10 ? ("0" + _d) : _d);
            }
        }
        return f;
    }
}
dateFormat();
//对指定日期进行加减
function setXDate(date, xY, xM, xD, xh, xm, xs) {
    xY = xY || 0;
    xM = xM || 0;
    xD = xD || 0;
    xh = xh || 0;
    xm = xm || 0;
    xs = xs || 0;
    if (xY) { //如果存在年的差值，则计算
        date.setFullYear(date.getFullYear() + xY);
    }
    if (xM) { //如果存在月的差值，则计算
        date.setMonth(date.getMonth() + xM);
    }
    if (xD) { //如果存在日的差值，则计算
        date.setDate(date.getDate() + xD);
    }
    if (xh) { //如果存在时的差值，则计算
        date.setHours(date.getHours() + xh);
    }
    if (xm) { //如果存在分的差值，则计算
        date.setMinutes(date.getMinutes() + xm);
    }
    if (xs) { //如果存在秒的差值，则计算
        date.setSeconds(date.getSeconds() + xs);
    }
    return date.format("YYYY-MM-DD h:m:s")
}
//对指定日期进行加减
document.getElementById("setXDate1").innerHTML = "获取当前日期，增加7天：" + setXDate(d, 0, 0, 7);
document.getElementById("setXDate2").innerHTML = "获取当前日期，增加7年：" + setXDate(d, 7);