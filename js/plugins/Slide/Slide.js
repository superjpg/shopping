(function (A) {
    /**
     * 面向对象的轮播图
     * @param {mixed} container 页面接入轮播的容器
     * @param {array} img_ls    带路径的图片列表
     * @param {mixed} width     轮播区域的高度 可以是数值或者带单位
     * @param {mixed} height    轮播区域的高度 可以是数值或者带单位
     */
    function Slide(conf) {
        var slide = new Slide.fn.init(conf);
        slide.render();
        slide.bindEvent();
        slide.timeToDo();
    }

    Slide.fn = Slide.prototype = {

        construtor: Slide,

        init: function (conf) {
            this.setConf(conf);
            //指针移动位置
            this.index = 0;
            //其他声明的全局数据
            this.wrap; //轮播封装容器
            this.lis; //图片列表区域
            this.as; //翻页按钮区域
            this.spans; //图标按钮区域
            this.timer; //当前定时器
        },

        setConf: function (conf) {
            //将配置参数写入实例对象
            Object.assign(this, conf);
            //参数验证
            if (!this.container.nodeType)
                this.container = document.querySelector(this.container);

            if (!this.img_ls instanceof Array) {
                throw new Error("图片需要设置数组")
            }
        },

        render: function () {
            //创建封装容器
            this.wrap = document.createElement("div");
            this.wrap.id = "my_slide";
            this.wrap.style.cssText = `width : ${this.width}px;
                    height : ${this.height}px;`;

            //生成图片内容
            var ul = document.createElement("ul");
            this.img_ls.forEach(function (source, idx) {
                ul.innerHTML +=
                    `<li ${idx == 0 ? "style='display:block'" : ""}>
                    <img src="${source}" alt="" />
                </li>`;
            });
            this.wrap.appendChild(ul);

            //创建翻页按钮
            var div = document.createElement("div");
            div.innerHTML =
                `<a href="javascript:;">&lt;</a>
    <a href="javascript:;">&gt;</a>`;
            this.wrap.appendChild(div);

            //创建图标区域
            var section = document.createElement("section");
            for (var i = 0; i < this.img_ls.length; i++) {
                section.innerHTML +=
                    `<span ${i == 0 ? "class='active'" : ""}>
                            ${i+1}</span> `;
            }
            this.wrap.appendChild(section);

            //将渲染出的完整轮播放入指定内容区
            this.container.appendChild(this.wrap);

        },

        bindEvent: function () {
            //初始化DOM元素
            this.lis = Array.from(this.wrap.querySelectorAll("ul li")),
                this.as = Array.from(this.wrap.querySelectorAll("div a")),
                this.spans = Array.from(this.wrap.querySelectorAll("section span"));

            //给封装容器绑定冒泡阶段的事件监听处理 - 执行事件代理
            this.wrap.addEventListener("click", function (event) {
                var evt = window.event || event,
                    origin = evt.target || evt.srcElement;
                //检测事件源DOM 通过标签名区分
                switch (origin.nodeName.toLowerCase()) {
                    case "a": //翻页按钮
                        this.as.indexOf(origin) > 0 ? this.index++ : this.index--;
                        break;
                    case "span": //图标按钮
                        //查看下标
                        this.index = this.spans.indexOf(origin);
                        break;
                }
                //重置定时器
                this.timeToDo();
                //执行该帧动画
                this.perFrame();
            }.bind(this), false);
        },

        perFrame: function () {
            if (this.index < 0) this.index = this.lis.length - 1;

            //将指针对应到图片下标
            var key = this.index % this.lis.length;

            //清除所有
            this.hideAll();

            //高亮图标
            this.spans[key].classList.add("active");

            //显示图片
            this.lis[key].style.display = "block";
        },

        hideAll: function () {
            this.spans.forEach(function (span, idx) {
                span.classList.remove("active");
                this.lis[idx].style.display = "none";
            }, this);
        },

        timeToDo: function () {
            if (this.timer) clearInterval(this.timer);
            this.timer = setInterval(this.nextFrame.bind(this), 3000);
        },

        nextFrame: function () {
            this.index++;
            this.perFrame();
        },
    };

    Slide.fn.init.prototype = Slide.fn;

    A.slide = A.Slide = Slide;

})(window);