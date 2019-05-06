//require不仅仅是用来加载js脚本文件
//它更注重的是模块的加载和管理
//模块可以看成一个功能组件 - 经过封装,就需要调用接口

//在require中 所有的模块载入 都要使用define来设置
define(["jquery"], function () {

    //动态载入公共头和尾部
    // var xhr = new XMLHttpRequest;
    // xhr.onreadystatechange = function () {
    //     if (this.readyState == this.DONE) {//完成
    //         if (this.statusText == "OK") {//成功
    //             // console.log(this.responseText);
    //             header.innerHTML = this.responseText;
    //             //头部效果设置
    //         } else {//失败

    //         }
    //     } else {//等待

    //     }
    // }
    // xhr.open("get", "html/header.html");
    // xhr.send(null);

    $("#header").load("html/header.html", function () {
        //搜索框，注意此处，获取文本框的默认值使用defaultValue属性，但是只能通过this.defaultValue，不能使用$(this).defalutValue。
        $(".search_form .txt").focus(function () {
            if ($(this).val() == this.defaultValue) {
                $(this).val("").css({
                    color: "#333"
                });
            }
        }).blur(function () {
            if ($(this).val() == "") {
                $(this).val(this.defaultValue).css({
                    color: "#999"
                });
            }
        });
        //头部用户
        // $(".user").mouseover(function () {
        //     $(this).find("dd").show();
        //     $(this).find("dt").addClass("on");
        // }).mouseout(function () {
        //     $(this).find("dd").hide();
        //     $(this).find("dt").removeClass("on");
        // });

        $(".user").mouseenter(function () {
            $(this).find("dt").addClass("on");
            $(this).find("dd").show();
        }).mouseleave(function () {
            $(this).find("dt").removeClass("on");
            $(this).find("dd").hide();
        })

        //购物车
        $(".cart").mouseover(function () {
            $(this).find("dd").show();
            $(this).find("dt").addClass("on");
        }).mouseout(function () {
            $(this).find("dd").hide();
            $(this).find("dt").removeClass("on");
        });

        //导航菜单效果
        $(".cat").hover(function () {
            $(this).find(".cat_detail").show();
            $(this).find("h3").addClass("on");
        }, function () {
            $(this).find(".cat_detail").hide();
            $(this).find("h3").removeClass("on");
        });

        //非首页，导航菜单显隐效果
        $(".cat1").hover(function () {
            $(".cat1 .cat_hd").addClass("on").removeClass("off");
            $(".cat1 .cat_bd").show();
        }, function () {
            $(".cat1 .cat_hd").addClass("off").removeClass("on");
            $(".cat1 .cat_bd").hide();
        });

    });

});