function getCountDown(Y, M, D, h, m, s) { //到指定日期时间的倒计时
    Y = Y || 0;
    M = M || 0;
    D = D || 0;
    h = h || 0;
    m = m || 0;
    s = s || 0;
    var date = new Date(Y, M - 1, D, h, m, s),
        //转换为时间戳，方便计算差值
        times = date.getTime() - new Date().getTime();
    //返回天数
    return Math.ceil(times / (1000 * 60 * 60 * 24));
}
//到指定日期时间的倒计时
document.getElementById("getCountDown").innerHTML = "2014年2月14日距离现在：" + getCountDown("2014", "2", "14") + "天";
//节日倒计时
document.getElementById("LabourDay").innerHTML = "劳动节距离现在：" + getCountDown("2014", "5", "1") + "天";
document.getElementById("NationalDay").innerHTML = "国庆节距离现在：" + getCountDown("2014", "10", "1") + "天";