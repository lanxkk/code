//网页将不能被另存为
document.getElementById("banOnPage").onclick = function() {
    var _win = window.open('', '', ''); //打开新的窗口
    _win.opener = null; //设置打开窗口的opener = null
    /*兼容性有待验证，ie6~8，Chrome版本也会支持
            //向新的窗口填充HTML：加入iframe框架，设置src为坏链接*/
    _win.document.write('<html><head><meta http-equiv="Content-Type" ' + +'content="text/html; charset=utf-8"><title>禁止用“另存为”</title>' + +'</head><body>禁止另存为的代码<noscript>禁止另存为' + +'<iframe scr="*.htm"></iframe></noscript></body></html>');
}