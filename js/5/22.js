//查看网页源代码
document.getElementById("viewDocumentSource").onclick = function() {
    var source = window.open("index.html", "", "menubar=no,location=no,scrollbars=yes,resizable=yes");
    //根据window.XMLHttpRequest对象是否存在使用不同的创建方式
    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest(); //FireFox、Opera等浏览器支持的创建方式
    } else {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); //IE浏览器支持的创建方式
    }
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4) { //请求数据成功
            source.document.write("<textarea cols='1000' rows='1000'>" + xmlHttp.responseText + "</textarea>");
        }
    };
    xmlHttp.open("GET", "index.html", true); //get形式请求数据
    xmlHttp.send(null);
}