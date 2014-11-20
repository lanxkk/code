/*
         Js解析JSON数据
         */
//去除字符串左右两边的空格
function trim(chars) {
    return (chars || "").replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "");
}

function parseJSON(jsonData) { //解析函数
    if (typeof jsonData === 'object') { //判断是否为对象
        return jsonData; //直接返回对象
    }
    if (window.JSON && window.JSON.parse) { //如果存在原生的JSON解析API，则使用原生的解析API
        return window.JSON.parse(jsonData); //解析JSON字符
    }
    if (typeof jsonData === "string") {
        jsonData = this.trim(jsonData); //简单的过滤字符，保证前后没有空格
        if (jsonData) { //如果不是空字符
            return (new Function("return " + jsonData))(); //利用Function的特性，构造 JSON 对象
        }
    }
}
/*
 *夸浏览器的Ajax（Js实现无刷新Ajax）
 * */
function ajax(options) {
    if (!options || !options.url) { //检测是否存在请求的URL
        return false; //ajax调用失败
    }
    /*
     * 数据初始化
     * */
    options.data = options.data || ""; //待传送的值
    options.method = (options.method || "GET").toUpperCase(); //传送类型，默认是GET
    options.async = options.async || true; //异步（true）或同步（false）
    /*
     *响应类型,如果请求的是xml文件，则默认类型为xml，否则默认为json，目前支持3种：text、xml、json
     * */
    options.responseType = options.responseType || (/xml/.test(options.url) ? "xml" : "json");
    options.successCall = options.successCall || false; //成功回调
    options.failureCall = options.failureCall || false; //失败回调
    var xmlhttp;
    if (window.XMLHttpRequest) // code for IE7+, Firefox, Chrome, Opera, Safari etc.
    {
        xmlhttp = new XMLHttpRequest();
    } else //IE6, IE5
    {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) //成功回调
        {
            if (options.successCall) {
                options.successCall(getResponseData(xmlhttp, options.responseType));
            }
        }
        if (xmlhttp.readyState == 4 && xmlhttp.status != 200) { //失败回调
            if (options.failureCall) {
                options.failureCall(xmlhttp, xmlhttp.status); //参数1---xml响应对象，参数2---状态码
            }
        }
    }
    xmlhttp.open(options.method, options.url + (options.method == "GET" ? "?" + options.data : ""), options.async);
    if (options.method != "GET" && options.data) {
        xmlhttp.send(options.data);
    } else {
        xmlhttp.send();
    }
    return true; //ajax调用成功
}

function getResponseData(xmlhttp, type) { //解析响应的ajax数据
    var resData = xmlhttp.responseText; //获得字符串形式的响应数据
    if (type === "json") { //因为默认值为json，而且现在json格式的流行度优于其它格式，因此将此放在第一位
        return parseJSON(resData);
    }
    if (type === "xml") {
        return xmlhttp.responseXML; //获得 XML 形式的响应数据
    }
    if (type === "text") {
        return resData;
    }
}
/*跨浏览器的XML读取代码---解决跨域问题*/
function getReqxml(urlXml, callFun) {
    ajax({ //加载xml文件
        "url": "../../API/reqxml.php",
        "data": "url=" + urlXml,
        "successCall": function(msg) { //成功回调
            if (callFun) {
                callFun({
                    "status": "ok", //请求成功状态码
                    "data": msg //成功的数据
                });
            }
        },
        "failureCall": function(xmlRes, resCode) { //失败回调
            if (callFun) {
                callFun({
                    "status": "error", //请求失败状态码
                    "data": "请求失败" //失败的数据
                });
            }
        }
    })
}
/*===========跨浏览器的XML读取代码========*/
getReqxml("http://1.qingjs.sinaapp.com/ajax.xml", function(xmlData) {
    console.log(xmlData.data);
});