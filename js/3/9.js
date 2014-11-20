var isIE = function() { //是否IE
    return !!window.ActiveXObject;
},
    isIE6 = function() { //是否IE6
        return isIE() && !window.XMLHttpRequest;
    },
    transform = (function() { //先检测支持哪一种CSS3变换属性，如果为空则为IE的私有方法变换
        var _transform = '',
            _transforms = [ //待变换样式属性库
                "transform", "MozTransform", "webkitTransform", "OTransform", "msTransform"
            ],
            _transformsLen = _transforms.length,
            i = 0,
            _styles = document.createElement("div").style;
        for (; i < _transformsLen; i++) {
            if (_transforms[i] in _styles) {
                _transform = _transforms[i];
                break;
            }
        }
        return _transform;
    })();
//旋转图片
var rotateImg = function(img, degree) {
    if (isIE6()) {
        return;
    }
    //设置矩阵变换数据
    var cosa = (degree == 90 || degree == 270) ? 0 : Math.cos(degree * Math.PI / 180),
        sina = (degree == 180) ? 0 : Math.sin(degree * Math.PI / 180),
        newMatrix = {
            M11: cosa,
            M12: (-1 * sina),
            M21: sina,
            M22: cosa
        },
        name;
    if (transform == '') { //if IE
        /*
         *IE的滤镜语法：
         * filter: progid:DXImageTransform.Microsoft.Matrix( enabled= bEnabled , SizingMethod= sMethod , FilterType= sType , Dx= fDx , Dy= fDy , M11= fM11 , M12= fM12 , M21= fM21 , M22= fM22 )
         * 如果只是简单的实现一些旋转，可以用filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=degree)语法结构;
         * */
        img.style.filter = "progid:DXImageTransform.Microsoft.Matrix(SizingMethod='auto expand')";
        for (name in newMatrix) img.filters.item("DXImageTransform.Microsoft.Matrix")[name] = newMatrix[name];
    } else {
        /*
         *在最新的CSS3中，新增加了transform 属性，允许向元素应用 2D 或 3D 转换。该属性允许我们对元素进行旋转、缩放、移动或倾斜
         * matrix(n,n,n,n,n,n)对元素进行2D矩阵变换总共设置6个值
         * */
        img.style[transform] = "matrix(" + newMatrix.M11 + "," + (-newMatrix.M12) + "," + (-newMatrix.M21) + "," + newMatrix.M22 + ",0,0)"; //保持旋转的一致性，修正方向， matrix设置旋转属性
        /*transform:rotate(degree); 只要设置相应的旋转角度即可
                img.style[_IM.transform] = "rotate("+degree+"deg)";*/
    }
};
rotateImg(document.getElementById("rotated"), 30);