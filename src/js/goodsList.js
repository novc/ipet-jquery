$(document).ready(function(){
	$(".top").load("header.html",function(){
		topFun();
	});
	$(".footer").load("footer.html");
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
	var typeId = getUrlPara("typeId");
	$.ajax({
		url:"http://localhost:8080/ipet/GetGoodsList",
		data:{
			typeId:typeId
		},
		success:function(msg){
			var res = JSON.parse(msg);
			for(var i in res){
				var oImgBox = "<li><div class='imgbox'><a href='goodsDetail.html?goodsId="+res[i].goodsId+"'><img class='hoverup' src='img/"+res[i].indexImg+"' /></a></div>";
				var oTitle = "<p><a href='goodsDetail.html?goodsId="+res[i].goodsId+"'>"+res[i].goodsTitle+"</a></p>";
				var oPrice = "<p class='p2'><span class='price'>"+res[i].nowPrice+"</span><span class='lab fr'>已售：<span class='sallNum'>"+res[i].sellNum+"</span></span></p>";
				var oFoot = "<div class='foot'><a href='javascript:addCart("+res[i].goodsId+")'>加入购物车</a></div></li>";
				var oAll = oImgBox+oTitle+oPrice+oFoot;
				$(".goods-list ul").append(oAll);
			}
		}
	});
});

function addCart(goodsId){
	$.ajax({
		url:"http://localhost:8080/ipet/Addcart",
		data:{
			GoodsId:goodsId,
			GoodsNum:1
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
}