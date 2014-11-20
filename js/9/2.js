/*============Js解析 XML 数据start============*/
var xmlStr = "<bookstore>" + "<book>" + "<title>Hello</title>" + "<author>J K. Rowling</author>" + "<year>2005</year>" + "</book>" + "</bookstore>",
    /*
         Js解析XML数据
         */
    parseXML = function(xmlData) { //解析函数
        var
        /*
         * 初始化数据
         * */
        xml = null, //默认为null
            domP;
        if (!xmlData || typeof xmlData !== "string") {
            return xml;
        }
        try {
            /*
             * 检测浏览器支持哪种xml解析方法
             * DOMParser 对象解析 XML 文本并返回一个 XML Document 对象,浏览器支持：Firefox, Mozilla, Opera, etc.
             * 目前在全球市场份额中，IE的整体占有率，在降低，因此将这个方法放在第一检测位置
             * */
            if (window.DOMParser) {
                domP = new DOMParser(); //构建加载对象
                xml = domP.parseFromString(xmlData, "text/xml"); //执行解析，加载文件
            } else { //IE支持的方法
                xml = new ActiveXObject("Microsoft.XMLDOM"); //构建IE浏览器的xml加载对象
                xml.async = "false"; //关闭异步加载，这样可确保在文档完整加载之前，解析器不会继续执行脚本
                xml.loadXML(xmlData); //执行解析，加载文件
            }
        } catch (e) {
            xml = "Parse failure"; //解析失败，返回提示性信息
        }
        if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
            new Error("损坏的XML: " + xmlData);
        }
        return xml;
    };
console.log(parseXML(xmlStr));