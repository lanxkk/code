function strDate(strDate, s1, s2) { //字符串转换为日期格式
    var d = strDate.split(" "), //以空格进行第一次日期分隔
        d1 = d[0], //年月日的数组
        d2 = d[1], //时分秒的数组
        D1 = d1.split(s1 || "-"), //分隔年月日为数组
        D2 = d2.split(s2 || ":"); //分隔为时分秒的数组
    return new Date(D1[0] || 0, D1[1] || 0, D1[2] || 1, D2[0] || 0, D2[1] || 0, D2[2] || 0)
}
//字符串转换为日期格式
document.getElementById("strDate").innerHTML = "2014-02-19 15:56:01转换为日期格式：" + strDate("2014-02-19 15:56:01");