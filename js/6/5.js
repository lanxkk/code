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
        ;
        for (d in date) { //过滤日期标示符
            reg = new RegExp("[" + d + "]{1,}", "g"); //判断是否有待格式化的字符
            r = reg.test(f);
            if (r) //验证是否存在
            {
                _d = date[d]; //被替换的日期
                f = f.replace(reg, _d < 10 ? ("0" + _d) : _d);
            }
        }
        return f;
    }
}
var d = new Date(); //获取日期对象
/*待格式化的日期为当前日期，
         字符格式替换规则：“Y”被替换为年，“M”替换为，“D”替换为日期，“h”替换为小时，“m”替换为分钟，“s”替换为秒
         * */
dateFormat();
document.getElementById("formatTime1").innerHTML = "格式化日期1：" + d.format("YYYY-MM-DD h:m:s");
document.getElementById("formatTime2").innerHTML = "格式化日期2：" + d.format("YYYY/MM/DD h-m-s");
document.getElementById("formatTime3").innerHTML = "格式化日期3：" + d.format("Y:M:D h:m:s");