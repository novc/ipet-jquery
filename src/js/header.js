function search(){
	var value =encodeURIComponent($("input[name=search_value]").val());
	window.location.href="searchout.html?key="+value;
}
$("input[name=search_value]").keydown(function(e){
	if (!e) e = window.event;  
    if ((e.keyCode || e.which) == 13) {  
        search();
    }
});
function topFun() {

	
//	检查是否登录
	$.ajax({
		url:"http://localhost:8080/ipet/checkLogin",
		success:function(msg){
			var res = JSON.parse(msg);
			if(Boolean(res)){
				$(".header_tr").prepend("<li>欢迎您： "+res.name+"</li>");
				$("li[data-name=nologin]").css({"display":"none"});
			}else{
				$(".dropmn").css({"display":"none"});
			}
		}
	});

	$.ajax({
		url:"http://localhost:8080/ipet/GetCartServlet",
		success:function(msg){
			var res = JSON.parse(msg);
			if(res.length!=0){
				$(".cart_num").html(res.length);
				$(".prod_num").html(res.length);
			}else{
				$(".cart_num").html(0);
			}
		}
	});
	$.ajax({
		url:"http://localhost:8080/ipet/getHotGoodsNameServlet",
		success:function(msg){
			var res = JSON.parse(msg);
            var aLink = res;
            var aLinkLength = aLink.length;
            for (var i = 0; i < aLinkLength; i++) {
                $(".hotlink").append("<a href='goodsDetail.html?goodsId="+aLink[i].goodsId+"'>" + aLink[i].goodsTitle + "</a>");
            }
            $(".hotlink a:first").css({ "padding-left": "0px" });
            $(".hotlink a:last").css({ "border": "0px" });
		}
			
	});
    /**
     * 地区选择----------------------*/
	
    var nMainPlace = document.getElementsByClassName("main_place")[0];
    var nAreaBox = document.getElementsByClassName("area_box")[0];
    var nProvOpt = document.getElementsByClassName("province_opt")[0];
    var nCityOpt = document.getElementsByClassName("city_opt")[0];
    var nProvBox = document.getElementsByClassName("province_box")[0];
    var nCityBox = document.getElementsByClassName("city_box")[0];
    $(".area_box").css({ "left": $(".main_place").offset().left });
    nMainPlace.onmouseover = function() {
        $(".area_box").css({ "left": $(".main_place").offset().left });
        nAreaBox.style.display = "block";
    }
    nMainPlace.onmouseout = function() {
        nAreaBox.style.display = "none";
    }
    nAreaBox.onmouseover = function() {
        $(".area_box").css({ "left": $(".main_place").offset().left });
        this.style.display = "block";
    }
    nAreaBox.onmouseout = function() {
        this.style.display = "none";
    }
    nProvOpt.onclick = function() {
        nProvBox.style.display = "block";
        nCityBox.style.display = "none";
        nProvOpt.className = "active";
        nCityOpt.className = "unactive";
    }
    nCityOpt.onclick = function() {
        nCityBox.style.display = "block";
        nProvBox.style.display = "none";
        nCityOpt.className = "active";
        nProvOpt.className = "unactive";
    }

    $(".probox").css({ "left": "-145px" });

    /**
     * 获取当前地理位置
     */

    $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', function(_result) {
        if (remote_ip_info.ret == '1') {
            var prov = remote_ip_info.province;
            var city = remote_ip_info.city;
            document.getElementsByClassName("province_value")[0].innerHTML = prov;
            document.getElementsByClassName("province_opt")[0].innerHTML = prov;
            document.getElementsByClassName("city_opt")[0].innerHTML = city;

            /*-------------修改city内容---------------*/
            getCityBox(prov);
            // 标注当前城市
            var aProv = nProvBox.getElementsByTagName("span");
            aProvLength = aProv.length;

            if (prov != undefined) {
                for (var i = 0; i < aProvLength; i++) {
                    if (aProv[i].innerHTML == prov) {
                        $(".province_box span").removeClass("active");
                        aProv[i].style.backgroundColor = "#f60";
                        aProv[i].style.color = "#fff";
                    }
                }
            }
            // 将位置信息存储到本地
            if (window.localStorage) {
                localStorage.setItem("province", remote_ip_info.province);
                localStorage.setItem("city", remote_ip_info.city+"市");
            }
        } else {
            console.log('没有找到匹配的IP地址信息！');
            getCityBox("山东");
        }
    });

    function getCityBox(prov) {
//        $.getJSON("../json/area.json", function(oProvData) {
    	var oProvData = {
    		    "province": [
    		                 { "name": "北京", "citys": { "city": ["东城区", "西城区", "崇文区", "宣武区", "朝阳区", "丰台区", "石景山区", "海淀区", "门头沟区", "房山区", "通州区", "顺义区", "昌平区", "大兴区", "怀柔区", "平谷区", "密云县", "延庆县", "燕郊开发区"] }, "area": "华北" },
    		                 { "name": "天津", "citys": { "city": ["和平区", "河东区", "河西区", "南开区", "河北区", "红桥区", "塘沽区", "汉沽区", "大港区", "东丽区", "西青区", "津南区", "北辰区", "武清区", "宝坻区", "宁河县", " 静海县", "蓟县", "滨海新区" ] }, "area": "华北" },
    		                 { "name": "河北", "citys": { "city": ["石家庄市", "唐山市", "秦皇岛市", "邯郸市", "邢台市", "保定市", "张家口市", "承德市", "沧州市", "廊坊市", "衡水市"] }, "area": "华北" },
    		                 { "name": "山西", "citys": { "city": ["太原市", "大同市", "阳泉市", "长治市", "晋城市", "朔州市", "晋中市", "运城市", "忻州市", "临汾市", "吕梁市"] }, "area": "华北" },
    		                 { "name": "内蒙古", "citys": { "city": ["呼和浩特市", "包头市", "乌海市", "赤峰市", "通辽市", "鄂尔多斯市", "呼伦贝尔市", "巴彦淖尔市", "乌兰察布市", "兴安盟", "锡林郭勒盟", "阿拉善盟"] }, "area": "华北" },
    		                 { "name": "上海", "citys": { "city": ["黄浦区", "卢湾区", "徐汇区", "长宁区", "静安区", "普陀区", "闸北区", "虹口区", "杨浦区", "闵行区", "宝山区", "嘉定区", "浦东新区", "金山区", "松江区", "青浦区", "奉贤区", "崇明县"] }, "area": "华东" },
    		                 { "name": "江苏", "citys": { "city": ["南京市", "无锡市", "徐州市", "常州市", "苏州市", "南通市", "连云港市", "淮安市", "盐城市", "扬州市", "镇江市", "泰州市", "宿迁市"] }, "area": "华东" },
    		                 { "name": "浙江", "citys": { "city": ["杭州市", "宁波市", "温州市", "嘉兴市", "湖州市", "绍兴市", "金华市", "衢州市", "台州市", "丽水市", "舟山市"] }, "area": "华东" },
    		                 { "name": "安徽", "citys": { "city": ["合肥市", "蚌埠市", "淮南市", "淮北市", "铜陵市", "安庆市", "黄山市", "滁州市", "阜阳市", "宿州市", "巢湖市", "六安市", "亳州市", "池州市", "宣城市", "芜湖市", "马鞍山市"] }, "area": "华东" },
    		                 { "name": "福建", "citys": { "city": ["福州市", "厦门市", "莆田市", "三明市", "泉州市", "漳州市", "南平市", "龙岩市", "宁德市"] }, "area": "华东" },
    		                 { "name": "山东", "citys": { "city": ["济南市", "青岛市", "淄博市", "枣庄市", "东营市", "烟台市", "潍坊市", "济宁市", "泰安市", "威海市", "日照市", "莱芜市", "临沂市", "德州市", "聊城市", "滨州市", "菏泽市", "章丘市"] }, "area": "华东" },
    		                 { "name": "广东", "citys": { "city": ["广州市", "韶关市", "深圳市", "珠海市", "汕头市", "佛山市", "江门市", "湛江市", "茂名市", "肇庆市", "惠州市", "梅州市", "汕尾市", "河源市", "阳江市", "清远市", "东莞市", "中山市", "潮州市", "揭阳市", "云浮市"] }, "area": "华南" },
    		                 { "name": "广西", "citys": { "city": ["南宁市", "柳州市", "桂林市", "梧州市", "北海市", "防城港市", "钦州市", "贵港市", "玉林市", "百色市", "贺州市", "河池市", "来宾市", "崇左市"] }, "area": "华南" },
    		                 { "name": "海南", "citys": { "city": ["海口市", "三亚市", "五指山市", "琼海市", "儋州市", "文昌市", "万宁市", "东方市", "定安县", "屯昌县", "澄迈县", "临高县", "西南中沙群岛办事处", "白沙黎族自治县", "昌江黎族自治县", "乐东黎族自治县", "陵水黎族自治县", "保亭黎族苗族自治县", "琼中黎族苗族自治县", "三沙市"] }, "area": "华南" },
    		                 { "name": "江西", "citys": { "city": ["南昌市", "景德镇市", "萍乡市", "九江市", "新余市", "新余市", "鹰潭市", "赣州市", "吉安市", "宜春市", "抚州市", "上饶市"] }, "area": "华中" },
    		                 { "name": "河南", "citys": { "city": ["郑州市", "开封市", "洛阳市", "平顶山市", "安阳市", "鹤壁市", "新乡市", "焦作市", "濮阳市", "许昌市", "漯河市", "三门峡市", "南阳市", "商丘市", "信阳市", "周口市", "驻马店市", "济源市"] }, "area": "华中" },
    		                 { "name": "湖北", "citys": { "city": ["武汉市", "黄石市", "十堰市", "宜昌市", "襄阳市", "鄂州市", "荆门市", "孝感市", "荆州市", "黄冈市", "咸宁市", "随州市", "恩施土家族苗族自治州", "仙桃市", "潜江市", "天门市", "神农架林区", "洪湖市"] }, "area": "华中" },
    		                 { "name": "湖南", "citys": { "city": ["长沙市", "株洲市", "湘潭市", "衡阳市", "岳阳市", "常德市", "张家界市", "益阳市", "郴州市", "永州市", "怀化市", "娄底市", "湘西土家族苗族自治州", "邵阳市"] }, "area": "华中" },
    		                 { "name": "重庆", "citys": { "city": ["沙坪坝", "渝北区", "江北区", "渝中区", "九龙坡", "巴南区", "北碚区", "万州区", "涪陵区", "万盛区", "双桥区", "黔江区", "长寿区", "江津区", "合川区", "永川区", "南川区", "綦江县", "潼南县", "铜梁县", "大足县", "荣昌县", "璧山县", "梁平县", "城口县", "丰都县", "垫江县", "武隆县", "忠县", "开县", "云阳县", "奉节县", "巫山县", "巫溪县", "石柱", "秀山", "酉阳", "彭水", "南岸区", "大渡口区", "九龙坡区"] }, "area": "西南" },
    		                 { "name": "四川", "citys": { "city": ["成都市", "自贡市", "攀枝花市", "泸州市", "德阳市", "绵阳市", "广元市", "遂宁市", "内江市", "乐山市", "南充市", "眉山市", "宜宾市", "广安市", "达州市", "雅安市", "巴中市", "资阳市", "阿坝藏族羌族自治州", "甘孜藏族自治州", "凉山彝族自治州"] }, "area": "西南" },
    		                 { "name": "贵州", "citys": { "city": ["贵阳市", "六盘水市", "遵义市", "安顺市", "铜仁市", "黔西南布依族苗族自治州", "毕节市", "黔东南苗族侗族自治州", "黔南布依族苗族自治州"] }, "area": "西南" },
    		                 { "name": "云南", "citys": { "city": ["昆明市", "曲靖市", "玉溪市", "保山市", "昭通市", "丽江市", "普洱市", "临沧市", "楚雄彝族自治州", "红河哈尼族彝族自治州", "文山壮族苗族自治州", "西双版纳傣族自治州", "大理白族自治州", "德宏傣族景颇族自治州", "怒江傈僳族自治州", "迪庆藏族自治州"] }, "area": "西南" },
    		                 { "name": "西藏", "citys": { "city": ["拉萨市", "昌都市", "山南地区", "日喀则市", "那曲地区", "阿里地区", "林芝市"] }, "area": "西南" },
    		                 { "name": "陕西", "citys": { "city": ["西安市", "铜川市", "宝鸡市", "咸阳市", "渭南市", "延安市", "汉中市", "榆林市", "安康市", "商洛市"] }, "area": "西北" },
    		                 { "name": "甘肃", "citys": { "city": ["西安市", "铜川市", "宝鸡市", "咸阳市", "渭南市", "延安市", "汉中市", "榆林市", "安康市", "商洛市"] }, "area": "西北" },
    		                 { "name": "青海", "citys": { "city": ["西宁市", "海东市", "海北藏族自治州", "黄南藏族自治州", "海南藏族自治州", "果洛藏族自治州", "玉树藏族自治州", "海西蒙古族藏族自治州"] }, "area": "西北" },
    		                 { "name": "宁夏", "citys": { "city": ["银川市", "石嘴山市", "吴忠市", "固原市", "中卫市"] }, "area": "西北" },
    		                 { "name": "新疆", "citys": { "city": ["乌鲁木齐市", "克拉玛依市", "吐鲁番市", "哈密地区", "昌吉回族自治州", "博尔塔拉蒙古自治州", "巴音郭楞蒙古自治州", "阿克苏地区", "克孜勒苏柯尔克孜自治州", "喀什地区", "和田地区", "伊犁哈萨克自治州", "塔城地区", "阿勒泰地区", "石河子市", "阿拉尔市", "图木舒克市", "五家渠市"] }, "area": "西北" },
    		                 { "name": "辽宁", "citys": { "city": ["沈阳市", "大连市", "鞍山市", "抚顺市", "本溪市", "丹东市", "锦州市", "营口市", "阜新市", "辽阳市", "盘锦市", "铁岭市", "朝阳市", "葫芦岛市"] }, "area": "东北" },
    		                 { "name": "吉林", "citys": { "city": ["长春市", "吉林市", "四平市", "辽源市", "通化市", "白山市", "松原市", "白城市", "延边朝鲜族自治州"] }, "area": "东北" },
    		                 { "name": "黑龙江", "citys": { "city": ["哈尔滨市", "齐齐哈尔市", "鸡西市", "鹤岗市", "双鸭山市", "大庆市", "伊春市", "佳木斯市", "七台河市", "牡丹江市", "黑河市", "绥化市", "大兴安岭地区"] }, "area": "东北" },
    		                 { "name": "香港", "citys": { "city": [""] }, "area": "其他" },
    		                 { "name": "澳门", "citys": { "city": [""] }, "area": "其他" },
    		                 { "name": "台湾", "citys": { "city": [""] }, "area": "其他" },
    		                 { "name": "钓鱼岛", "citys": { "city": [""] }, "area": "其他" },
    		                 { "name": "南沙群岛", "citys": { "city": [""] }, "area": "其他" }

    		             ]
    		         }; 
            var ProvLength = oProvData.province.length;
            if (prov != undefined) {
                for (var i = 0; i < ProvLength; i++) {
                    if (prov == oProvData.province[i].name) {
                        $(".city_box").empty();
                        var aCitys = oProvData.province[i].citys.city;
                        var aCitysLength = aCitys.length;

                        for (var k = 0; k < aCitysLength; k++) {
                            $(".city_box").append("<span class='cityVal'>" + aCitys[k] + "</span>");
                        }
                        $(".city_box span").click(function() {
                            $(".city_opt").html(this.innerHTML);
                            if (window.localStorage) {
                                localStorage.setItem("city", this.innerHTML);
                            }
                            $(".area_box").css({ "display": "none" })
                        });
                    }
                }
            } else {
                $(".city_box").empty();
                var aCitysDefault = oProvData.province[18].citys.city;
                var aCitysDefaultLength = aCitysDefault.length;

                for (var k = 0; k < aCitysDefaultLength; k++) {
                    $(".city_box").append("<span class='cityVal'>" + aCitysDefault[k] + "</span>");
                }
            }
//        });
    }

    $(".province_box span").click(function() {
        getCityBox(this.innerHTML);
        $(".province_opt").html(this.innerHTML);
        $(".province_value").html(this.innerHTML);
        $(".city_opt").html("请选择");

        $(".province_box").css({ "display": "none" });
                $(".city_box").css({ "display": "block" });
                if (window.localStorage) {
                    localStorage.setItem("province", this.innerHTML);
                }
            });
            $(".city_box span").click(function() {
                $(".city_opt").html(this.innerHTML);
                if (window.localStorage) {
                    localStorage.setItem("city", this.innerHTML);
                }
                $(".area_box").css({ "display": "none" })
            });
}
