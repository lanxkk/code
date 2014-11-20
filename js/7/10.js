var isOpen = false;//雪花启动的开关

        function flutterChar(){

            if(isOpen){//是否开启过
                return;
            }
            isOpen = true;

            var allChar = [],//创建文字
                    maxSnowflake = 90, //雪花的最大数目
                    maxleft = (document.body.clientWidth || document.documentElement.clientWidth)-100, //最大的left值
                    maxTop = -1,//最高高度
                    i = 0,//遍历计数器
                    snowflake = [//雪花类型
                        '❉',
                        '❈',
                        '*',
                        '✲',
                        '❀',
                        '❃'
                    ],
                    snowflakeColor = [   //颜色库
                        "red",
                        "green",
                        "#ccc123",
                        "#345232",
                        "#231111",
                        "#ab2322"
                    ],
                    s = 0,  //计数雪花---类型与颜色

                    createCharr = function(){//创建雪花
                        var d = document.createElement("div");
                        s++;//修改颜色与雪花值
                        s = s > 5 ? 0 : s;
                        d.innerHTML = snowflake[s];//填充值
                        d.style.left = Math.round(Math.random()*maxleft+0) + "px";//设置雪花的left值
                        d.style.top = (-1 * Math.round(Math.random()*100+0)) + "px";//设置雪花的top值
                        d.style.position = "absolute";//绝对定位
                        d.style.zIndex = "999";//Z轴设置
                        d.style.color = snowflakeColor[s]; //设置颜色
                        d.setAttribute("data-v", Math.round(Math.random()*5+2));//随机雪花速度
                        d.setAttribute("data-time", "0");//雪花的漂浮时间
                        document.body.appendChild(d);
                        return d;//返回雪花对象
                    },

                    moveChar = function(e){//移动雪花
                        maxTop = document.body.scrollHeight-50;
                        var l = parseInt(e.style.left, 10),
                                t = parseInt(e.style.top, 10),
                                v = parseInt(e.getAttribute("data-v"), 10),//当时速度
                                time = parseInt(e.getAttribute("data-time"), 10),  //时间  ]
                                _time = time + 50,
                                _l = l + v,
                                _t =  0.5 * 9 * _time * _time * 0.001 * 0.001 * v,//落体位移的路程，加入修正值v
                                top = _t >= maxTop ? 0 : _t,
                                _time = _t >= maxTop ? 0 : _time;

                        e.style.top =  top + "px";
                        e.style.left = ( _l >= maxleft ? 0 : _l) + "px";
                        e.setAttribute("data-time", _time);
                    };



            var createS = setInterval(function(){//雪花运动
                //创建很多雪花
                var length = allChar.length,
                        l =  length + 10;
                for(; i <  l ; i++){
                    allChar.push(createCharr());
                }
                if(allChar.length > maxSnowflake){
                    clearInterval(createS);
                }
            }, 1000)

            setInterval(function(){//雪花运动
                var ll = allChar.length;
                for(i = 0 ; i < ll ; i++){
                    moveChar(allChar[i]);
                }
            }, 50)
        }
        document.getElementById("startFlutterCharacter").onclick = function(){//页面五颜六色的雪花
            this.value = "已开始下雪，请等待";
            flutterChar();
        }