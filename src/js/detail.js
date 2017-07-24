//获取地址栏传递的参数 name 是目标参数名
function getUrlPara(name){
	var paraStr = window.location.search.substr(1);
	var arr = paraStr.split("&");
	var res = {};
	for (var i in arr){
		var para =  arr[i].split("=");
		var name = para[0];
		res[name]=para[1]
	}
	if(res[name]){
		return res[name];
	}else{
		return;
	}
	
}// end of getUrlPara
var goodsId = getUrlPara("goodsId");
$.ajax({
	url:"http://localhost:8080/ipet/GetGoodsDetailServlet",
	data:{
		goodsId:goodsId
	},
	success:function(msg){
		var res = JSON.parse(msg);
		
		$(".img-big").attr("src","img/"+res.bigImg).attr("alt",res.goodsTitle);
		$(".small-box ul").append("<li><img src='img/"+res.smallImg+"' alt='"+res.goodsTitle+"'></li>");
		$(".brandName").html(res.brandName);
		$(".goods-name").html(res.goodsTitle);
		$(".goods-spec").html(res.spec);
		$(".goods-intro").html(res.introduce);
		$(".price").html(res.nowPrice);
		$(".measure").html(res.measure);
		var sDetailImg = res.goodsDetailImg;
		var aDetailImg = sDetailImg.split(",");
		for (var i in aDetailImg){
			$(".detail-img").append("<img src='img/"+aDetailImg[i]+"' alt='"+aDetailImg[i]+"' />")
		}
		
	}
});

//加入购物车
$(document).ready(function(){
	$(".top").load("header.html",function(){
		topFun();
	});
	$(".footer").load("footer.html");
	$(".buy-button").click(function(){
		
		$.ajax({
			url:"http://localhost:8080/ipet/Addcart",
			data:{
				GoodsId:goodsId,
				GoodsNum:$("input[name=goodsNum]").val()
			},
			success:function(msg){
				if(msg=="nologin"){
					alert("您还未登录");
					window.location.href="login.html";
				}else{
					if(Boolean(msg)){
						window.location.href="cart.html";
					}else{
						alert("添加失败");
					}
				}
				
			}
		});
	});
});