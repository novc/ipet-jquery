$(document).ready(function() {
    $(".top").load("header.html", function() {
        topFun();
    });
    $(".footer").load("footer.html");


    $.ajax({
        url: "http://localhost:8080/ipet/getNavTypeName",
        success: function(msg) {
            var res = JSON.parse(msg);
            for (var i in res) {
                var oLi = "<li class='cate_list" + i + "'><h3><span></span><a href='goodsList.html?typeId=" + res[i].superTypeId + "'>" + res[i].superTypeName + "<i></i></a></h3></li>"
                $(".catelist ul").append(oLi);
            }
        }
    });
    /**---------------轮播图BEGIN--------------*/
    var mySwiper = new Swiper('.swiper-container', {
        autoplay: 5000,
        loop: true,
        effect: "fade",
        paginationClickable: true,
        pagination: '.swiper-pagination'
    }); //轮播图END


    $.ajax({
        url: "http://localhost:8080/ipet/getGoodsSpecial",
        data: {
            type: 0 //特价商品
        },
        success: function(msg) {
            var oData = JSON.parse(msg);
            var oEpetBlock = "<div class='special-block w-max w mt30'></div>";
            $(".renew").append(oEpetBlock);
            var oEpetfoodTit = "<div class='epetfood-tit ft20'><span>特价商品</span></div>";
            var oProWrap = "<div class='clearfix'><div class='food-pro'></div></div>";
            $(".special-block:last").append(oEpetfoodTit).append(oProWrap);
            var oPro = "<div class='libconbox'><div class='pro-list'><ul></ul></div></div>";
            $(".food-pro:last").append(oPro);
            for (var i in oData) {
                var oImgBox = "<li><div class='imgbox'><a href='goodsDetail.html?goodsId=" + oData[i].goodsId + "'><img class='hoverup' src='img/" + oData[i].indexImg + "' /></a></div>";
                var oTitle = "<p><a href=''>" + oData[i].goodsTitle + "</a></p>";
                var oPrice = "<div class='img-foot'><span class='old-price'>" + oData[i].price + "</span><span class='price'>" + oData[i].nowPrice + "</span>";
                var oCollect = "<span class='collect'>❤ <i> " + oData[i].collectNum + "</i></span></div>";
                var oAddCart = "<a class='cart-add' href='javascript:addCart(" + oData[i].goodsId + ")'>加入购物车</a></li>";
                var oAll = oImgBox + oTitle + oPrice + oCollect + oAddCart;
                $(".food-pro:last .libconbox ul").append(oAll);
            }
        }
    });
    $.ajax({
        url: "http://localhost:8080/ipet/getGoodsSpecial",
        data: {
            type: 1 //特别推荐商品
        },
        success: function(msg) {
            var oData = JSON.parse(msg);
            var oEpetBlock = "<div class='special-block w-max w mt30'></div>";
            $(".renew").append(oEpetBlock);
            var oEpetfoodTit = "<div class='epetfood-tit ft20'><span>特别推荐</span></div>";
            var oProWrap = "<div class='clearfix'><div class='food-pro'></div></div>";
            $(".special-block:last").append(oEpetfoodTit).append(oProWrap);
            var oPro = "<div class='libconbox'><div class='pro-list'><ul></ul></div></div>";
            $(".food-pro:last").append(oPro);
            for (var i in oData) {
                var oImgBox = "<li><div class='imgbox'><a href='goodsDetail.html?goodsId=" + oData[i].goodsId + "'><img class='hoverup' src='img/" + oData[i].indexImg + "' /></a></div>";
                var oTitle = "<p><a href=''>" + oData[i].goodsTitle + "</a></p>";
                var oPrice = "<div class='img-foot'><span class='old-price'>" + oData[i].price + "</span><span class='price'>" + oData[i].nowPrice + "</span>";
                var oCollect = "<span class='collect'>❤ <i> " + oData[i].collectNum + "</i></span></div>";
                var oAddCart = "<a class='cart-add' href='Javascript:addCart(" + oData[i].goodsId + ")'>加入购物车</a></li>";
                var oAll = oImgBox + oTitle + oPrice + oCollect + oAddCart;
                $(".food-pro:last .libconbox ul").append(oAll);
            }
        }

    });
    //	商品分类展示
    $.ajax({
        url: "http://localhost:8080/ipet/GetIndexGoodsServlet",
        success: function(msg) {
            var res = JSON.parse(msg);
            var oData = formmatData(res);
            for (var i in oData) {
                var oEpetBlock = "<div class='epetfoodblock w-max w mt30' cate=" + i + "></div>";
                $(".renew").append(oEpetBlock);
                var oEpetfoodTit = "<div class='epetfood-tit ft20'><i class='title-icon'><img src='img/" + oData[i].superTypeIcon + "' /></i><span>" + oData[i].superTypeName + "</span></div>";
                var oProWrap = "<div class='clearfix'><div class='food-pro'></div></div>";
                $(".epetfoodblock:last").append(oEpetfoodTit).append(oProWrap);
                var oPro = "<div class='lib-menu abs'><ul></ul></div><div class='libconbox'><div class='pro-list'><ul></ul></div></div>";
                $(".food-pro:last").append(oPro);

                var subLIst = oData[i].subList;
                for (var j in subLIst) {
                    var oMenuActive = "<li class='active' type='' cate=" + subLIst[j].subTypeId + "><p></p><span>" + subLIst[j].subTypeName + "</span></li>";
                    var oMenu = "<li type='' cate=" + subLIst[j].subTypeId + "><p></p><span>" + subLIst[j].subTypeName + "</span></li>";
                    if (j == 0) {
                        $(".food-pro:last .lib-menu ul").append(oMenuActive);
                    } else {
                        $(".food-pro:last .lib-menu ul").append(oMenu);
                    }
                }
                var goodsData = oData[i].subList[0].goods;
                for (var k in goodsData) {
                    if (k < 10) {
                        var oImgBox = "<li><div class='imgbox'><a href='goodsDetail.html?goodsId=" + goodsData[k].goodsId + "'><img class='hoverup' src='img/" + goodsData[k].indexImg + "' /></a></div><p><a href=''>" + goodsData[k].goodsTitle + "</a></p><span class='price'>" + goodsData[k].nowPrice + "</span></li>";
                        $(".food-pro:last .libconbox ul").append(oImgBox);
                    }
                }
            }
            $(".lib-menu li").mouseenter(function() {
                var subTypeId = $(this).attr("cate");
                $(this).parent("ul").children("li").removeClass("active");
                $(this).addClass("active");
                var $ul = $(this).parents(".food-pro").children(".libconbox").children(".pro-list").children("ul");
                $ul.empty();
                for (var i in oData) {
                    var oSup = oData[i].subList;
                    for (var j in oSup) {
                        var oSub = oSup[j];
                        if (oSub.subTypeId == subTypeId) {
                            var goodsData = oSub.goods;
                            for (var k in goodsData) {
                                if (k < 10) {
                                    var oImgBox = "<li><div class='imgbox'><a href='goodsDetail.html?goodsId=" + goodsData[k].goodsId + "'><img class='hoverup' src='img/" + goodsData[k].indexImg + "' /></a></div><p><a href=''>" + goodsData[k].goodsTitle + "</a></p><span class='price'>" + goodsData[k].nowPrice + "</span></li>";
                                    $ul.append(oImgBox);
                                }
                            }
                        }
                    }
                }
            });
        }

    });
});

function formmatData(res) {
    var sSuperTypeName = "";
    var sSubTypeName = "";
    var aGoods = new Array();
    var aGoodsSub = new Array();
    var aSubGoods = new Array();
    var aData = new Array();

    var oGoodsSub = {};
    var oGoodsSup = {};
    for (var i in res) { //将所有商品的列表按照子类型分类

        if (sSubTypeName != res[i].subTypeName) {
            sSubTypeName = res[i].subTypeName;
            aGoods = [];
            aGoods.push(res[i]);

            oGoodsSub = {};
            oGoodsSub.subTypeName = res[i].subTypeName;
            oGoodsSub.subTypeId = res[i].subTypeId;
            oGoodsSub.superTypeName = res[i].superTypeName;
            oGoodsSub.superTypeId = res[i].superTypeId;
            oGoodsSub.superTypeIcon = res[i].superTypeIcon;
            oGoodsSub.subTypeList = aGoods;

            aGoodsSub.push(oGoodsSub);

        } else {
            aGoods.push(res[i]);
        }
    }
    for (var j in aGoodsSub) { //将所有数据按照SuperType分类整理
        var oSubGoods = {};
        var oGoodsSup = {};
        if (sSuperTypeName != aGoodsSub[j].superTypeName) { //换种类第一次
            sSuperTypeName = aGoodsSub[j].superTypeName;
            aSubGoods = [];
            oSubGoods.subTypeName = aGoodsSub[j].subTypeName;
            oSubGoods.subTypeId = aGoodsSub[j].subTypeId;
            oSubGoods.goods = aGoodsSub[j].subTypeList;
            aSubGoods.push(oSubGoods);

            oGoodsSup.superTypeName = aGoodsSub[j].superTypeName;
            oGoodsSup.superTypeId = aGoodsSub[j].superTypeId;
            oGoodsSup.superTypeIcon = aGoodsSub[j].superTypeIcon;

            oGoodsSup.subList = aSubGoods;
            aData.push(oGoodsSup);
        } else {

            oSubGoods.subTypeName = aGoodsSub[j].subTypeName;
            oSubGoods.subTypeId = aGoodsSub[j].subTypeId;
            oSubGoods.goods = aGoodsSub[j].subTypeList;
            aSubGoods.push(oSubGoods);
        }
    }
    return aData;
}
//添加购物车
function addCart(goodsId) {
    $.ajax({
        url: "http://localhost:8080/ipet/Addcart",
        data: {
            GoodsId: goodsId,
            GoodsNum: 1
        },
        success: function(msg) {
            if (msg == "nologin") {
                alert("您还未登录");
                window.location.href = "login.html";
            } else {
                if (Boolean(msg)) {
                    window.location.href = "cart.html";
                } else {
                    alert("添加失败");
                }
            }

        }
    });
}