/*
@功能：首页面js
@作者：diamondwang
@时间：2013年11月13日
*/
//首页的主体js文件 在该文件中要设置首页的js效果
//但是不用像之前那样手动的载入依赖文件 而是通过require来按需加载

//设置模块和文件的对应关系
require.config({
    baseUrl: "js",
    paths: {
        "jquery": "libs/jquery-1.8.3.min",
        "header": "header",
        "tab" : "modules/Tab"
    }
});

require(["jquery", "header", "tab"], function ($, H, T) {
    //右侧，话费、旅行、彩票、游戏切换效果
    // $(".service h2 span").mouseover(function () {
    //     $(this).addClass("on").siblings().removeClass("on");
    //     $(".service_wrap div").hide().eq($(this).index()).show();

    // });

    // //导购区域切换效果，疯狂抢购，热卖商品、推荐商品、新品上架，猜您喜欢
    // $(".guide_content h2 span").mouseover(function () {
    //     $(this).addClass("on").siblings().removeClass("on");
    //     $(".guide_wrap div").hide().eq($(this).index()).show();

    // });

    //各楼层区域切换
    $(".goodslist h2 span").mouseover(function () {
        $(this).addClass("on").siblings().removeClass("on");
        $(".goodslist_wrap div").fadeOut().eq($(this).index()).fadeIn();
    });

    Slide({
        container: ".slide",
        img_ls: ["images/index_slide1.jpg", "images/index_slide2.jpg", "images/index_slide3.jpg", "images/index_slide4.jpg"],
        width: 670,
        height: 400
    });

    T.tab(".service h2 span", ".service_wrap>div", "on");

    // console.log(T);
    T.tab(".guide_content h2 span", ".guide_wrap>div", "on");

    // T.tab(".goodslist h2 span", ".goodslist_wrap>div", "on");

});