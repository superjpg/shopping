define(["jquery"], function ($) {
    function Tab(path1, path2, clsname) {
        var tab = new Tab.fn.init(path1, path2, clsname);
        tab.bindEvent();
    }

    Tab.fn = Tab.prototype = {

        constructor: Tab,

        init: function (path1, path2, clsname) {
            //接收参数并设置全局属性
            this.path1 = path1;
            this.path2 = path2;
            this.clsname = clsname;
            //初始化声明一下属性
            this.lis;
            this.divs;
        },

        bindEvent: function () {
            this.lis = Array.from(document.querySelectorAll(this.path1)),
                this.divs = Array.from(document.querySelectorAll(this.path2));
            //给标题循环绑定事件
            this.lis.forEach(function (li, index) {
                li.onmouseenter = function () {
                    //去除所有的样式
                    this.hideAll();
                    //高亮当前选中的标题
                    li.classList.add(this.clsname);
                    //显示标题对应的内容
                    this.divs[index].style.display = "block";
                }.bind(this);
            }, this);
        },

        hideAll: function () {
            this.lis.forEach(function (li, index) {
                //去除指定类样式 "last active" => "last"
                li.classList.remove(this.clsname);
                this.divs[index].style.display = "none";
            }, this)
        },
    };

    Tab.fn.init.prototype = Tab.fn;

    return {
        tab : Tab,
    }
});