//网页设置为首页=======================start
function setHomePage(val) {
    try {
        //设置或检索对象的DHTML行为
        document.body.style.behavior = 'url(#default#homepage)';
        document.body.setHomePage(val);
    } catch (e) {
        if (window.netscape) {
            try {
                //netscape.security.PrivilegeManager.enablePrivileg ，权限设置，有的浏览器需要用户配置浏览器安全属性才能执行
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            } catch (e) {
                alert("此操作被浏览器拒绝，请手动设置！");
            }
            //Components.classes 是一个被ContractID类索引的只读对象属性。
            var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
            prefs.setCharPref('browser.startup.homepage', val); //浏览器的偏好设置
        } else {
            alert("设置首页失败，请手动设置！");
        }
    }
}
document.getElementById("setHomePage").onclick = function() { //网页设置为首页
    setHomePage("http://qingjs.com");
};