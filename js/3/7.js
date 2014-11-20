getTypeElement = function(es, type) { //获取指定类型的节点集合
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
leftPics = [], //左侧数据图片堆叠
rightPics = []; //右侧数据图片堆叠
function cascadingShuffling(_options) {
    var child = this.getTypeElement(_options.e.childNodes, "li"), //获取指定的节点数据
        _child = [], //待缓存的一份初始化的数据 ,用于轮播层叠元素更新位置用
        childlen = child.length, //节点个数
        i = 0,
        baseLeft = 220, //距左边的基准参考值
        center = Math.floor((childlen - 1) / 2), //中心界点值
        vt = 50, //自由变量基准
        cvt = center * vt,
        centerPic = null; //中间的图片
    for (; i < childlen; i++) { //左、右及中间的堆叠数据初始化
        var childI = child[i];
        if (i === 0) {
            centerPic = child[i];
            _child[i] = {
                "style": { //初始化样式
                    "left": baseLeft + center * vt,
                    "top": (childI.offsetTop - vt),
                    "zIndex": childlen
                }
            };
        } else if (i <= center) {
            leftPics.push(child[i]);
            _child[i] = {
                "style": {
                    "left": baseLeft + cvt - vt * i,
                    "top": (childI.offsetTop - vt * (childlen - i) / childlen),
                    "zIndex": center - i
                }
            };
        } else {
            rightPics.push(child[i]);
            _child[i] = {
                "style": {
                    "left": baseLeft + cvt + vt * (i - center),
                    "top": (childI.offsetTop - vt * (childlen - i + center) / childlen),
                    "zIndex": childlen - (i - center)
                }
            };
        }
    }
    var updateUI = function(target, _target, callback) { //ui动画变换 参数---target为被变换的元素，_target变换的目标属性
        new animateManage({ //动画管理测试，点击元素会触发闪烁式动画
            "context": target, //被操作的元素
            "effect": "linear",
            "time": 200, //持续时间
            "starCss": { //元素的起始值偏移量
                "left": target.style.left || target.offsetLeft,
                "top": target.style.top || target.offsetTop,
                "zIndex": target.style.zIndex
            },
            "css": { //元素的结束值偏移量
                "left": _target.style.left || target.offsetLeft,
                "top": _target.style.top || target.offsetTop,
                "zIndex": _target.style.zIndex
            },
            "callback": function() {
                callback && callback();
            }
        }).init();
    }
    /*
     *所有的元素层叠变换
     * o1：参考对象1，当o1为_IM.leftPics，方向向左旋转
     * o2：参考对象2
     * type：与前面的第一个参数对应，当o1 为 leftPics的时候，对应的值必须为l，反之为"r"
     * */
    var rotate = function(o1, o2, type) {
        type = type || "l";
        o1.unshift(centerPic);
        var li = 0,
            leftLen = o1.length - 1
            _center = type == "r" && (center) || 0;
        for (; li < leftLen; li++) {
            if (li == 0) {
                updateUI(o1[li], _child[1 + _center]);
            } else {
                updateUI(o1[li], _child[li + 1 + _center]);
            }
        }
        o2.push(o1.pop());
        var ri = o2.length - 1;
        for (; ri >= 0; ri--) {
            if (ri == 0) {
                updateUI(o2[ri], _child[0]);
            } else {
                updateUI(o2[ri], _child[center + ri - _center]);
            }
        }
        centerPic = o2.shift();
    }
    var rotateID = -1, //间时调用的线程
        closeRotate = function() { //关闭间时调用
            clearInterval(rotateID);
        },
        openRotate = function() { //开启间时调用
            rotateID = setInterval(function() { //循环调用
                rotate(leftPics, rightPics);
            }, 2000);
        }
    rotate(leftPics, rightPics); //初始化所有层叠节点的位置样式
    openRotate(); //开启轮播
    _options.left.onclick = function() { //单击左按钮左旋转
        rotate(leftPics, rightPics);
    }
    _options.left.onmousemove = function() { //移入左按钮停止旋转
        closeRotate()
    }
    _options.left.onmouseout = function() { //移出左按钮开启旋转
        openRotate()
    }
    _options.right.onclick = function() { //单击左按钮右旋转
        rotate(rightPics, leftPics, "r");
    }
    _options.right.onmousemove = function() { //移入右按钮停止旋转
        closeRotate()
    }
    _options.right.onmouseout = function() { //移出右按钮开启旋转
        openRotate()
    }
}
cascadingShuffling({ //图片层叠轮播初始化
    "e": document.getElementById("cascadingShuffling"), //待旋转的父节点
    "left": document.getElementById("cascadingBtnLeft"), //向左旋转
    "right": document.getElementById("cascadingBtnRight") //向右旋转
});