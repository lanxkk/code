var openNewPage = function(e) {
    /*
             在原来的窗口中，直接跳转至目标页面
             window.location.href="将要跳转的页面";

             在新窗口中打开页面
             window.open('将要跳转的页面');
             window.history.back(-1);返回上一页

             通过指定的URL替换当前的页面及缓存内容，导致跳转页面后没有后退功能
             window.location.replace("将要跳转的页面")

             通过文档头META跳转： CONTENT 后面的阿拉伯数字是代表过几秒中钟转入目标网页，URL是目标地址
             <META HTTP-EQUIV="Refresh" CONTENT="0;URL= "将要跳转的页面">
             */
    e.onclick = function() {
        window.location.href = this.getAttribute('data-href'); //通过第一条的方式跳转页面
    }
}
openNewPage(document.getElementById("openNewPage"))