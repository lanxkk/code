//打开模式子窗口=======================
document.getElementById("opentChildWindow").onclick = function() {
    /*
     *  showModalDialog方法用来创建一个显示HTML内容的模态对话框，  object.showModalDialog(
     * '必选参数，类型：字符串。用来指定对话框要显示的文档的URL'
     * ,'可选，'
     * ,'可选')*/
    // 三个参数分别为：对话框加载的 HTML 页面的 URL、传入对话框页面的参数，控制对话框展现效果的参数
    window.showModalDialog("../index.html");
}