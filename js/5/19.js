isIE = function() { //是否是IE
    return document.all ? true : false;
}
//将网页另存为
function webSave(page) {
    /*document.execCommand(指令参数[,交互方式, 动态参数])---document.execCommand 方法提供了对浏览器内置命令调用的接口
             交互方式参数如果是true，显示对话框，false，不显示对话框，动态参数一般为一可用值或属性值（如下例中的”page”）
             */
    //将该网页保存到本地盘的其它目录，如果是ie可以另存为成功，Chrome、火狐及其它一些浏览器可能会弹出网页另存失败
    var save = document.execCommand('saveas', 'true', page);
    if (!save && !this.isIE()) {
        alert("设置网页另存失败，请用Ctrl + S 或手动设置！");
    }
}
//将网页另存为
document.getElementById("webSave").onclick = function() {
    webSave('../index.html');
}