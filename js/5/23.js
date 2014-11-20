//判断上一页的来源
function getPreviousPage() {
    /*
     *一般情况下一些浏览器会将document.referrer来源处理为空字符 ，假设场景为：由B页面，跳转至A页面
     *  1，在地址栏中直接输入A地址
     *  2，在B页面右击link A，在新窗口中打开
     *  3，在B页面右击link A，在新标签页中打开
     *  5，鼠标拖动link A至地址栏、标签栏
     *  6，修改window.location打开A页面(同域)
     *  7，利用window.open打开A页面
     *  8，通过单击flash打开A页面
     *  9， 后台（服务器）重定向至A页面
     * */
    return document.referrer;
}
//判断上一页的来源
document.getElementById("getPreviousPage").onclick = function() {
    document.getElementById("getPreviousPageView").innerHTML = "上一页来源：" + getPreviousPage();
}