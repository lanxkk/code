var typewriterArr = [], //打字的数据库队列
    typewritering = false, //打字机的线程是否开启
    typewriterID = -1, //打字机的线程ID
    typewriterTime = 1000, //超时调用的时间
    typewriterEffect = function(e, str, color) { //增加显示的元素
        typewriterArr.push({
            "context": e, //目标元素上下文
            "str": str, //显示的元素
            "lening": 0, //截取的进度
            "maxLength": str.length //最大进度
        });
        e.style.color = color || "#000000"; //设置元素颜色
    },
    closeTypewriter = function() { //关闭间时调用
        clearTimeout(typewriterID); //清除线程
        typewritering = false; //改变状态
    },
    typewriterUi = function() { //间时调用显示Ui
        var i = 0,
            l = typewriterArr.length,
            eing = null;
        for (; i < l; i++) {
            eing = typewriterArr[i]
            /*判断中英文进行+2或+1操作
                递增，获取最新截取的长度*/
            eing.lening++;
            //如果截取的长度超过最大长度，则截取的长度设置为1
            if (eing.lening > eing.maxLength) eing.lening = 0;
            //显示截取的字符
            eing.context.innerHTML = eing.str.substring(0, eing.lening) + "_";
        }
        typewriterID = setTimeout(typewriterUi, typewriterTime);
    },
    //开启间时调用 ， 参数为设置超时调用的时间
    startTypewriter = function(typewriterTime) {
        if (!typewritering) { //如果没有开启，则开启
            typewriterTime = typewriterTime || typewriterTime;
            typewriterUi(); //开始超时调用
        }
    };
typewriterEffect(document.getElementById("typewriterEffect"), "我是打字机效果，有趣吧，哈哈！！！", "red");
typewriterEffect(document.getElementById("typewriterEffect2"), "《最实用的JS代码》有趣吧，另外对JavaScript感兴趣的朋友，请加QQ群：315238234，欢迎您的加入！！！", "green");
startTypewriter(100);