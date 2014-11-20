var setCss = function(_this, cssOption) { //设置元素样式
    //判断节点类型
    if (!_this || _this.nodeType === 3 || _this.nodeType === 8 || !_this.style) {
        return;
    }
    for (var cs in cssOption) { //遍历并且设置样式
        _this.style[cs] = cssOption[cs];
    }
    return _this;
},
    isIE = function() { //是否IE
        return !!window.ActiveXObject;
    },
    isIE6 = function() { //是否IE6
        return isIE() && !window.XMLHttpRequest;
    },
    isIE7 = function() { //是否IE7
        return isIE() && !isIE6() && !isIE8();
    },
    isIE8 = function() { //是否IE8
        return isIE() && !! document.documentMode;
    },
    /******************************
     * 水中倒影效果        start  *
     *******************************/
    shadows = null, //初始化
    shadowsLen = 0,
    shadowInWater = function() {
        shadowsSource = document.getElementById("shadowInWaterSrurce"); //水中倒影效果
        shadows = document.getElementById(shadowsSource.getAttribute("data-water"));
        if (isIE()) { //IE
            updateShadow();
            return;
        } else { //非IE
            canvasShadowInWater();
        }
    },
    canvasShadowInWater = function() { //canvas的水中倒影
        /*（1）配置及初始化数据，创建canvas*/
        var settings = {
            'speed': 1, //速度
            'scale': 1, //比例
            'waves': 10 //波幅度
        },
            waves = settings['waves'],
            speed = settings['speed'] / 4,
            scale = settings['scale'] / 2,
            ca = document.createElement('canvas'),
            c = ca.getContext('2d'), //获取画布的句柄
            img = shadowsSource;
        img.parentNode.insertBefore(ca, img); //canvas覆盖源图片
        var w,
            h,
            dw,
            dh,
            offset = 0,
            frame = 0,
            max_frames = 0, //最大数据帧率
            frames = []; //图片的帧数据
        c.save();
        c.canvas.width = shadowsSource.offsetWidth;
        c.canvas.height = shadowsSource.offsetHeight * 2; //因为要基于原图，进行倒影投射，所以必须是原图的2倍高度
        /*
         *绘制图形 --- context.drawImage(img,sx,sy,sw,sh,x,y,w,h)
         *（必须）img要使用的图片、视频、画布
         *（可选）sx开始剪切的x坐标
         *（可选）sy开始剪切的y坐标
         *（可选）sw被剪切图形的宽度
         *（可选）sh被剪切图形的高度
         *（必须）x在画布上放置图形的x位置
         *（必须）y在画布上放置图形的y位置
         *（可选）w将要使用图形的宽度
         *（可选）h将要使用图形的高度
         *在画布上绘制原图
         * */
        c.drawImage(shadowsSource, 0, 0);
        c.scale(1, -1); //垂直镜像转换
        c.drawImage(shadowsSource, 0, -shadowsSource.offsetHeight * 2);
        c.restore(); //返回之前保存过的路径状态和属性
        w = c.canvas.width;
        h = c.canvas.height;
        dw = w;
        dh = h / 2;
        /*
         * 复制画布上指定的矩形的像素数据 --- context.getImageData(x,y,w,h);
         * 以左上角为（0，0）原点
         * x代表开始的x位置
         * y代表开始的y位置
         * w欲复制的矩形区域宽度
         * h欲复制的矩形区域高度
         * 在被创建的第一个原图的基础上，进行绘制倒影的形象
         * */
        var id = c.getImageData(0, h / 2, w, h).data,
            end = false;
        c.save(); //状态保存起来
        while (!end) { //预先计算缓存的帧
            var odd = c.getImageData(0, h / 2, w, h),
                od = odd.data,
                pixel = 0;
            for (var y = 0; y < dh; y++) {
                for (var x = 0; x < dw; x++) {
                    var displacement = (scale * 10 * (Math.sin((dh / (y / waves)) + (-offset)))) | 0,
                        j = ((displacement + y) * w + x + displacement) * 4;
                    if (j < 0) { // 修复倒影与原图的水平线闪烁问题
                        pixel += 4;
                        continue;
                    }
                    var m = j % (w * 4), // 修复边缘波纹问题
                        n = scale * 10 * (y / waves);
                    if (m < n || m > (w * 4) - n) {
                        var sign = y < w / 2 ? 1 : -1;
                        od[pixel] = od[pixel + 4 * sign];
                        od[++pixel] = od[pixel + 4 * sign];
                        od[++pixel] = od[pixel + 4 * sign];
                        od[++pixel] = od[pixel + 4 * sign];
                        ++pixel;
                        continue;
                    }
                    if (id[j + 3] != 0) { //水影阵列计算
                        od[pixel] = id[j];
                        od[++pixel] = id[++j];
                        od[++pixel] = id[++j];
                        od[++pixel] = id[++j];
                        ++pixel;
                    } else {
                        od[pixel] = od[pixel - w * 4];
                        od[++pixel] = od[pixel - w * 4];
                        od[++pixel] = od[pixel - w * 4];
                        od[++pixel] = od[pixel - w * 4];
                        ++pixel;
                    }
                }
            }
            if (offset > speed * (6 / speed)) {
                offset = 0;
                max_frames = frame - 1;
                // frames.pop();
                frame = 0;
                end = true;
            } else {
                offset += speed;
                frame++;
            }
            frames.push(odd);
        }
        setCss(shadows, { //隐藏原图
            "display": "none"
        })
        setCss(shadowsSource, { //显示原图
            "display": "none"
        })
        c.restore(); //返回上一个状态
        setInterval(function() { //更新视图
            c.putImageData(frames[frame], 0, h / 2);
            // c.putImageData(frames[frame], 0, h/2);
            if (frame < max_frames) {
                frame++;
            } else {
                frame = 0;
            }
        }, 50);
    };
updateShadow = function() { //IE 动态更新倒影视图
    if (isIE6()) {
        return;
    }
    shadows.filters.wave.phase += 10;
    setTimeout("updateShadow()", 150);
}
shadowInWater();