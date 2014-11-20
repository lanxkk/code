function getTypeElement(es, type) { //获取指定类型的节点
    var esLen = es.length,
        i = 0,
        eArr = [],
        esI = null;
    for (; i < esLen; i++) {
        esI = es[i];
        if (esI.nodeName.replace("#", "").toLocaleLowerCase() == type) {
            eArr.push(esI);
        }
    }
    return eArr;
}

function vote(e) { //等级星投票效果
    var votes = getTypeElement(e.childNodes, "div"),
        i = 0,
        m = null,
        k = 0,
        n = 0,
        allnum = 5,
        voteed = document.getElementById("voteed");
    for (; i < allnum; i++) {
        m = votes[i];
        m.setAttribute("data-num", i); //设置星星的级别
        m.onmouseover = function() { //鼠标移入
            k = 0;
            n = parseInt(this.getAttribute("data-num"), 10); //获取当前元素第几个
            voteed.innerHTML = "选取" + (n + 1) + "星级";
            for (; k < allnum; k++) {
                var v = votes[k];
                v.innerHTML = parseInt(v.getAttribute("data-num"), 10) <= n ? "★" : "☆";
            }
        }
    }
}
vote(document.getElementById("vote"));