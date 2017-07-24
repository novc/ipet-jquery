//返回上一页
function cancel(){
	window.history.go(-1);
}
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

function loginOut(){
	$.ajax({
		url:"http://localhost:8080/ipet/adminLogout",
		success:function(){
			window.location.href="http://localhost:8080/ipet/Admin/adminLogin.html";
		}
	})
}

/* 分页功能的实现 */
function pagerFilter(data){
	if (typeof data.length == 'number' && typeof data.splice == 'function'){	// is array
		data = {
			total: data.length,
			rows: data
		}
	}
	var dg = $(this);
	var opts = dg.datagrid('options');
	var pager = dg.datagrid('getPager');
	pager.pagination({
		onSelectPage:function(pageNum, pageSize){
			opts.pageNumber = pageNum;
			opts.pageSize = pageSize;
			pager.pagination('refresh',{
				pageNumber:pageNum,
				pageSize:pageSize
			});
			dg.datagrid('loadData',data);
		}
	});
	if (!data.originalRows){
		data.originalRows = (data.rows);
	}
	var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
	var end = start + parseInt(opts.pageSize);
	data.rows = (data.originalRows.slice(start, end));
	return data;
}//end of 分页

/*-------------行内编辑-----------*/

var editIndex = undefined;
function endEditing(){//判断是否处于编辑状态
	if (editIndex == undefined) { return true }
    if ($('#dg').datagrid('validateRow', editIndex)) {
        $('#dg').datagrid('endEdit', editIndex);
        editIndex = undefined;
        return true;
    } else {
        return false;
    }
}
//	进入编辑状态，或者因其他行正在编辑而只是选中
function BeginEdit(index){
	if (editIndex != index){
		if (endEditing()){
			$('#dg').datagrid('selectRow', index)
					.datagrid('beginEdit', index);
			editIndex = index;
		} else {
			$('#dg').datagrid('selectRow', editIndex);
		}
	}
	$("#dg").datagrid('beginEdit', index);
}
//	结束编辑
function endEditor(index){
	$('#dg').datagrid('endEdit',index);
	editIndex = undefined;
}
//	取消 编辑
function cancleEditor(index){
	$('#dg').datagrid('cancelEdit',index);
	editIndex = undefined;
}

/*---------------------------------------user--------------------------------------*/
//用户管理界面初始化
function initUserList(){
	$.ajax({
		url:"http://localhost:8080/ipet/returnAdminTypeServlet",
		type:"POST",
		success:function(msg){
			var nType = JSON.parse(msg).adminType;
			if(nType==3||nType==4){
				$("#dg").datagrid({
					view: detailview,
					url:"http://localhost:8080/ipet/getUserPagerServlet",
					fitColumns:true,
					striped:true,
					rownumbers:true,//显示带有行号的列
					pagination:true,
					title:"用户管理",
					toolbar:"#tb",
					loadFilter:pagerFilter,
					checkOnSelect:true,//点击行时不会选中select
					columns:[[
						{field:'ck',checkbox:"true"},
						{field:'id',title:'ID',align:'center',width:"30px"},
						{field:'name',title:'用户名',align:'center',width:"90px"},
						{field:'email',title:'邮箱',align:'center',width:"140px"},
						{field:'trueName',title:'收件人',align:'center',width:"80px"},
						{field:'sex',title:'性别',align:'center',width:"30px"},
						{field:'birthday',title:'生日',align:'center',width:"100px"},
						{field:'address',title:'地址',align:'center',width:"180px"},
						{field:'postcode',title:'邮编',align:'center',width:"80px"},
						{field:'phone',title:'电话号码',align:'center',width:"90px"},
						{field:'mphone',title:'手机号码',align:'center',width:"100px"},
						{field:'flag4',align:'center',width:"60px",formatter: function(f2,res){
							return "<a href='userUpdate.html?userid="+res.id+"'>修改</a>";
						}},
						{field:'flag5',align:'center',width:"60px",formatter: function(f1,res){
							return "<a href='javascript:deleteUser("+res.id+")' >删除</a>";
						}}
					]],
					detailFormatter:function(index,row){
						return '<div style="padding:2px"><table class="det" id="ddv-' + index + '"></table></div>';
					},
					onExpandRow: function(index,row){
						$('#ddv-'+index).empty();
						$('#ddv-'+index).append("<div><span class='tit'>密码：</span><span>"+row.password+"</span></div>");
						$('#ddv-'+index).append("<div><span class='tit'>密保问题：</span><span>"+row.question+"</span></div>");
						$('#ddv-'+index).append("<div><span class='tit'>密保答案：</span><span>"+row.answer+"</span></div>");
						$('#ddv-'+index).append("<div><span class='tit'>积分：</span><span>"+row.score+"</span></div>");
						$("span.tit").css({"font-weight":700,"display":"inline-block","width":"70px","margin":"3px"});
						$('#dg').datagrid('fixDetailRowHeight',index);
					}
				});	
			}else{
				window.location.href="error.html";
			}
			
		}
	});
	
}//end of initUserList
//批量删除
function deleteUsers(){
	var ids = [];
	var rows = $('#dg').datagrid('getSelections');
	if(rows){
		for(var i=0; i<rows.length; i++){
			ids.push(rows[i].id);
		}
		deleteUser(ids.toString());
	}else{
		alert("请选中要删除的项目");
	}
}// end of deleteUsers

//删除用户
function deleteUser(id){
	if(window.confirm("确认删除用户？")){
		$.ajax({
			url:"http://localhost:8080/ipet/deleteUser",
			type:"POST",
			data:{
				"ids":id
			},
			success:function(msg){
				window.alert(msg);
				window.location.reload(true);
			}
		});
		return;
	}
	
}//end of deleteUser
//用户信息详情
function DetailUserInit(){
	var sId = getUrlPara("id");
	var nId = parseInt(sId);
	$.ajax({
		url:"http://localhost:8080/ipet/getUserPagerServlet",
		type:"POST",
		data:{
			"id":nId
		},
		success:function(msg){
			var oUser = JSON.parse(msg)[0];
			$("input[name=userID]").val(oUser.id);
			$("input[name=userName]").val(oUser.name);
			$("input[name=password]").val(oUser.password);
			$("input[name=email]").val(oUser.email);
			$("input[name=trueName]").val(oUser.trueName);
			$("input[name=sex]").val(oUser.sex);
			$("input[name=birthday]").val(oUser.birthday);
			$("input[name=address]").val(oUser.address);
			$("input[name=postcode]").val(oUser.postcode);
			$("input[name=phone]").val(oUser.phone);
			$("input[name=mphone]").val(oUser.mphone);
			$("input[name=question]").val(oUser.question);
			$("input[name=answer]").val(oUser.answer);
			$("input[name=score]").val(oUser.score);
		}
	});
	return;
}//end of DetailUserInit
//修改用户信息
function updateUser(){
	$.ajax({
		url:"http://localhost:8080/ipet/adminUpdateUserServlet",
		type:"POST",
		data:{
			  "userID":$("input[name=userID]").val(),
			  "userName":$("input[name=userName]").val(),
			  "password":$("input[name=password]").val(),
			  "email":$("input[name=email]").val(),
			  "trueName":$("input[name=trueName]").val(),
			  "sex":$("input[name=sex]").val(),
			  "birthday":$("input[name=birthday]").val(),
			  "address":$("input[name=address]").val(),
			  "postcode":$("input[name=postcode]").val(),
			  "phone":$("input[name=phone]").val(),
			  "mphone":$("input[name=mphone]").val(),
			  "question":$("input[name=question]").val(),
			  "answer":$("input[name=answer]").val(),
			  "score":$("input[name=score]").val()
		},
		success:function(msg){
			alert(msg);
			window.location.href="userManage.html";
		}
		
	});
}//end of updateUser
//查询
function doSearch(){
	var sName = $("#key").val();
	$("#dg").datagrid("load",{
		name:sName
	});
	$("#dg").datagrid("reload");
}//end of doSearch

//查看所有
function reload (){
	$("#dg").datagrid("load",{
	});
}


/*---------------------------------------order--------------------------------------*/


//订单管理界面初始化
function initOrderList(){
	$.ajax({
		url:"http://localhost:8080/ipet/returnAdminTypeServlet",
		type:"POST",
		success:function(msg){
			var nType = JSON.parse(msg).adminType;
			if(nType==2||nType==4){
				$("#dg").datagrid({
					view: detailview,
					url:"http://localhost:8080/ipet/getOrderServlet",
					fitColumns:true,
					striped:true,//条纹显示
					rownumbers:true,//显示带有行号的列
					pagination:true,//分页器
					title:"订单管理",
					toolbar:"#tb",
					loadFilter:pagerFilter,//分页
					onDblClickCell:BeginEdit,//双击单元格
					checkOnSelect:false,//点击行不选中复选框
					columns:[[
					    {field:'ck',checkbox:"true"},
						{field:'orderId',title:'订单ID',width:30,align:'center'},
						{field:'name',title:'用户名',width:45,align:'center'},
						{field:'recvName',title:'收货人',width:40,align:'center',editor:'textbox'},
						{field:'address',title:'收货地址',width:200,align:'center',editor:'textbox'},
						{field:'postcode',title:'邮编',width:40,align:'center',editor:'text'},
						{field:'orderDate',title:'下单时间',width:120,align:'center'},
						{field:'flag',title:'',width:40,align:'center',formatter: function(flag,res){
							if (flag==0){
								return ("<a href='javascript:sendOrder("+res.orderId+")'>发货</a>");
							} else {
								return ("<span>已完成</span>");
							} 
						}},
						{field:'flag1',width:40,align:'center',formatter: function(f,res,index){
								return "<a href='javascript:cancleEditor("+index+")'>取消</a>";
						}},
						{field:'flag2',width:40,align:'center',formatter: function(f1,res,index){
							return "<a href='javascript:endEditor("+index+")'>提交修改</a>";
						}},
						{field:'flag4',width:40,align:'center',formatter: function(f2,res){
								return "<a href='javascript:deleteOrder("+res.orderId+")' >删除</a>";
						}}
					]],
					onAfterEdit:function(rowIndex, rowData, changes){
						if($.isEmptyObject(changes)){
							alert("您没有做修改");
						}else{
							$.ajax({
								url:"http://localhost:8080/ipet/updateOrderInfoServlet",
								type:"POST",
								data:{
									orderId:rowData.orderId,
									recvName:rowData.recvName,
									address:rowData.address,
									postcode:rowData.postcode
								},
								success:function(msg){
									alert(msg);
									window.location.reload(true);
								}
							});
						}
						
					},
					detailFormatter:function(index,row){
						return '<div class="ddv" style="padding:2px 20px"></div>';
					},
					onExpandRow: function(index,row){
						$(".ddv").datagrid({
							url:"http://localhost:8080/ipet/getOneOrderServlet?orderId="+row.orderId,
							fitColumns:true,
							striped:true,//条纹显示
							onDblClickCell:BeginEdit,//双击单元格
							columns:[[
						          {field:'orderId',title:'订单项ID',width:70,align:'center'},
						          {field:'goodsId',title:'商品ID',width:50,align:'center'},
						          {field:'goodsTitle',title:'商品名称',width:100,align:'center'},
						          {field:'nowPrice',title:'单价',width:50,align:'center',editor:'numberbox'},
						          {field:'buyNum',title:'商品数量',width:70,align:'center',editor:'numberbox'},
							]],
							onLoadSuccess:function(){  
			                    setTimeout(function(){  
			                        $('#dg').datagrid('fixDetailRowHeight',index);//在加载爷爷列表明细（即：父列表）成功时，获取此时整个列表的高度，使其适应变化后的高度，此时的索引  
			                        $('#dg').datagrid('fixRowHeight',index);//防止出现滑动条  
			                    },10);  
			                } 
						});
						$('#dg').datagrid('fixDetailRowHeight',index);
					}
					
				});
			}else{
				window.location.href="error.html";
			}
		}
	});
	
}//end of initOrderList
//	删除订单
function deleteOrder(orderId) {
	if(window.confirm("确认删除该订单？")){
		$.ajax({
			url:"http://localhost:8080/ipet/deleteOrderServlet",
			type:"POST",
			data:{
				"orderId":orderId
			},
			success:function(msg){
				window.alert(msg);
				window.location.reload(true);
			}
		})
	}
	
};//end of 订单删除

//	批量删除订单
function deleteOrders(){
	var orderids = [];
	var rows = $('#dg').datagrid('getSelections');
	if(rows){
		for(var i=0; i<rows.length; i++){
			orderids.push(rows[i].orderId);
			var sOrderids = orderids.join(",");
		}
		deleteOrder(sOrderids);
	}else{
		alert("请选中要删除的项目");
	}
}
//发货
function sendOrder(orderId){
	$.ajax({
		url:"http://localhost:8080/ipet/adminSendOrderServlet",
		type:"POST",
		data:{
			orderId:orderId
		},
		success:function(msg){
			window.alert(msg);
			window.location.reload(true);
		}
	})
}//end of 发货

//按照订单编号查询
function doOrderSearch(){
	var sId = $("#key").val();
	$("#dg").datagrid("load",{
		orderId:sId,
	});
	$("#dg").datagrid("reload");
}
//查看所有订单
function seeAll(){
	$("#dg").datagrid("load",{
		
	});
}
//查看已发货订单
function searchSendOrders(){
	$("#dg").datagrid("load",{
		flag:1,
	});
	$("#dg").datagrid("reload");
}
//	查看未发货订单
function searchNotSendOrders(){
	$("#dg").datagrid("load",{
		flag:0,
	});
	$("#dg").datagrid("reload");
}

/*---------------------------------------inform--------------------------------------*/

function initInform(){
	$("#dg").datagrid({
		url:"http://localhost:8080/ipet/getInformServlet",
		fitColumns:true,
		striped:true,
		rownumbers:true,
		pagination:true,
		title:"公告管理",
		loadFilter:pagerFilter,
		toolbar:"#tb",
		onDblClickCell:BeginEdit,//双击单元格
		checkOnSelect:false,//点击行不选中复选框
		columns:[[
		    {field:'ck',checkbox:"true"},
			{field:'informId',title:'公告ID',width:60,align:'center'},
			{field:'informTitle',title:'公告标题',width:150,align:'center',editor:'textbox'},
			{field:'informContent',title:'公告内容',width:300,align:'center',editor:'textarea'},
			{field:'informTime',title:'发布时间',width:110,align:'center'},
			{field:'flag1',width:40,align:'center',formatter: function(f,res,index){
					return "<a href='javascript:cancleEditor("+index+")'>取消</a>";
			}},
			{field:'flag2',width:60,align:'center',formatter: function(f1,res,index){
				return "<a href='javascript:endEditor("+index+")'>提交修改</a>";
			}},
			{field:'flag4',width:40,align:'center',formatter: function(f2,res){
				return "<a href='javascript:deleteInform("+res.informId+")' >删除</a>";
			}}
		]],
		onAfterEdit:function(rowIndex, rowData, changes){
			if($.isEmptyObject(changes)){
				alert("您没有做修改");
			}else{
				var date = new Date();
				var sYear = date.getFullYear();
				var sMonth = date.getMonth();
				var sDat = date.getDate();
				var da = sYear+"-"+sMonth+"-"+sDat;
				$.ajax({
					url:"http://localhost:8080/ipet/updateInformServlet",
					type:"POST",
					data:{
						informId:rowData.informId,
						informTitle:rowData.informTitle,
						informContent:rowData.informContent,
						informTime:da
					},
					success:function(msg){
						alert(msg);
						window.location.reload(true);
					}
				});
			}
			
		}
	});
}

//按照公告ID查询
function doInformSearch(){
	var sId = $("#key").val();
	$("#dg").datagrid("load",{
		informId:sId,
	});
	$("#dg").datagrid("reload");
}
//删除公告
function deleteInform(informId){
	alert(informId);
	$.ajax({
		url:"http://localhost:8080/ipet/deleteInformServlet",
		type:"POST",
		data:{
			informId:informId
		},
		success:function (msg){
			window.alert(msg);
			window.location.reload(true);
		}
	});
}//end of deleteInform

//	批量删除公告
function deleteInforms(){
	var informids = [];
	var rows = $('#dg').datagrid('getSelections');
	if(rows){
		for(var i=0; i<rows.length; i++){
			informids.push(rows[i].informId);
			var sInformids = informids.join(",");
		}
		alert(sInformids);
		deleteInform(sInformids);
	}else{
		alert("请选中要删除的项目");
	}
}//end of deleteInforms
//发布公告
function addInform(informId){
	$.ajax({
		url:"http://localhost:8080/ipet/addInformServlet",
		type:"POST",
		data:{
			"informTitle":$("input[name=informTitle]").val(),
			"informContent":$("textarea[name=informContent]").val()
		},
		success:function (msg){
			window.alert(msg);
			window.location.href="informManage.html";
		}
	});
}//end of addInform

/*---------------------------------------note--------------------------------------*/	
function initNoteList(){
	$("#dg").datagrid({
		url:"http://localhost:8080/ipet/getNoteServlet",
		fitColumns:true,
		striped:true,
		rownumbers:true,
		pagination:true,
		title:"留言管理",
		pageSize:10,
		loadFilter:pagerFilter,
		rownumbers:"true",
		columns:[[
			{field:'id',title:'留言ID',width:60,align:'center'},
			{field:'title',title:'标题',width:150,align:'center'},
			{field:'author',title:'作者',width:300,align:'center'},
			{field:'content',title:'内容',width:200,align:'center'},
			{field:'ly_time',title:'留言时间',width:200,align:'center'},
			
			{field:'flag4',width:100,align:'center',formatter: function(f2,res){
					return "<a href='javascript:deleteNote("+res.id+")' >删除</a>";
			}}
		]]
		
	});
}
	
function deleteNote(id){
	$.ajax({
		url:"http://localhost:8080/ipet/deleteNoteServlet",
		type:"POST",
		data:{
			"noteId":id
		},
		success:function(msg){
			window.alert(msg);
			window.location.reload(true);
		}
	})
}

/*---------------------------------------admin--------------------------------------*/
function initAdminList(){
	$.ajax({
		url:"http://localhost:8080/ipet/returnAdminTypeServlet",
		type:"POST",
		success:function(msg){
			var nType = JSON.parse(msg).adminType;
			if(nType==4){
				$("#dg").datagrid({
					url:"http://localhost:8080/ipet/getAdminServlet",
					fitColumns:true,
					striped:true,
					rownumbers:true,
					pagination:true,
					title:"管理员管理",
					toolbar:"#tb",
					loadFilter:pagerFilter,
					columns:[[
					    {field:'id',width:150,title:'管理员ID',align:'center'},
						{field:'adminType',width:150,title:'管理员类别',align:'center',
					    	formatter:function(index,row){
					    		switch(row.adminType){
					    		case 1:
					    			return ("商品管理员");
					    			break;
					    		case 2:
					    				return ("订单管理员");
					    			break;
					    		case 3:
					    			return ("会员管理员");
					    			break;
					    		case 4:
					    				return ("系统管理员");
					    			break;
					    		}
					    	}
					    },
						{field:'loginName',width:200,title:'登录名',align:'center'},
						{field:'loginPwd',width:200,title:'密码',align:'center'},
						{field:'adminName',width:200,title:'管理员姓名',align:'center'},
						{field:'flag1',align:'center',formatter: function(f21,res){
							return "<a href='adminUpdate.html?id="+res.id+"' >修改</a>";
						}},
						{field:'flag4',align:'center',formatter: function(f2,res){
							return "<a href='javascript:deleteAdmin("+res.id+")' >删除</a>";
						}}
					]]
				});
			}else{
				window.location.href="error.html";
			}
		}
	});
}
	
function deleteAdmin(id){
	if(window.confirm("确认删除管理员？")){
		$.ajax({
			url:"http://localhost:8080/ipet/deleteAdmin",
			type:"POST",
			data:{
				"adminIds":id
			},
			success:function(msg){
				window.alert(msg);
				window.location.reload(true);
			}
		});
	}
	
}

function seeGoodsAdmins(){
	$("#dg").datagrid('load',{
		adminType:1
	});
}

function seeOrdersAdmins(){
	$("#dg").datagrid('load',{
		adminType:2
	});
}
function seeUsersAdmins(){
	$("#dg").datagrid('load',{
		adminType:3
	});
}
function seeSystemAdmin(){
	$("#dg").datagrid('load',{
		adminType:4
	});
}

function doAdminSearch(){
	$("#dg").datagrid("load",{
		"adminName":$("#key").val()
	});
	$("#dg").datagrid("reload");
}

function addAdmin(){
	window.location.href="adminAdd.html";
}


/*---------------------------------------goods--------------------------------------*/
function initGoodsList(){
	$.ajax({
		url:"http://localhost:8080/ipet/returnAdminTypeServlet",
		type:"POST",
		success:function(msg){
			var nType = JSON.parse(msg).adminType;
			if(nType==4||nType==1){
				$("#dg").datagrid({
					url:"http://localhost:8080/ipet/GetGoodsServlet",
					fitColumns:true,
					striped:true,
					rownumbers:true,
					pagination:true,
					title:"商品管理",
					toolbar:"#tb",
					loadFilter:pagerFilter,
					onDblClickCell:BeginEdit,//双击单元格
					columns:[[
					    {field:'goodsId',width:35,title:'商品ID',align:'center'},
					    {field:'indexImg',width:45,title:'商品图片',align:'center',
					    	formatter:function(index,row){
					    		return ("<img width=60px height:60px; src='../../img/"+row.indexImg+"' />");
					    	}
					    },
						{field:'superTypeId',width:25,title:'大类ID',align:'center',},
						{field:'subTypeId',width:25,title:'小类ID',align:'center'},
						{field:'goodsTitle',width:90,title:'商品名称',align:'center',editor:'textbox'},
						{field:'introduce',width:130,title:'商品介绍',align:'center',editor:'textbox'},
						{field:'brandName',width:35,title:'品牌',align:'center',editor:'textbox'},
						{field:'price',width:25,title:'价格',align:'center',editor:'textbox'},
						{field:'nowPrice',width:25,title:'现价',align:'center',editor:'textbox'},
						{field:'goodsNum',width:20,title:'库存',align:'center',editor:'textbox'},
						{field:'key',width:80,title:'关键字',align:'center',editor:'textbox'},
						{field:'sale',width:20,title:'特价',align:'center',
							formatter:function(index,row){
								if(row.sale){
									return "是";
								}else{
									return "否";
								}
								
							},editor:'textbox'
						},
						{field:'special',width:20,title:'推荐',align:'center',
							formatter:function(index,row){
								if(row.special){
									return "是";
								}else{
									return "否";
								}
								
							},editor:'textbox'	
						},
						{field:'flag1',width:20,align:'center',formatter: function(f,res,index){
							return "<a href='javascript:cancleEditor("+index+")'>取消</a>";
						}},
						{field:'flag2',width:40,align:'center',formatter: function(f1,res,index){
							return "<a href='javascript:endEditor("+index+")'>提交修改</a>";
						}},
						{field:'flag4',width:20,align:'center',formatter: function(f2,res){
								return "<a href='javascript:deleteGoods("+res.goodsId+")' >删除</a>";
						}}
					]],
					onAfterEdit:function(rowIndex, rowData, changes){
						console.log(changes);
						if($.isEmptyObject(changes)){
							alert("您没有做修改");
						}else{
							$.ajax({
								url:"http://localhost:8080/ipet/updateGoodsServlet",
								type:"POST",
								data:{
									goodsId:rowData.goodsId,
									goodsTitle:rowData.goodsTitle,
									introduce:rowData.introduce,
									brandName:rowData.brandName,
									price:rowData.price,
									nowPrice:rowData.nowPrice,
									goodsNum:rowData.goodsNum,
									key:rowData.key,
									sale:rowData.sale,
									special:rowData.special
								},
								success:function(msg){
									alert(msg);
									window.location.reload(true);
								}
							});
						}
						
					},
				});
			}else{
				window.location.href="error.html";
			}
		}
	});
}
function getAdmin(){
	$.ajax({
		url:"http://localhost:8080/ipet/returnAdminTypeServlet",
		type:"POST",
		success:function(msg){
			var nName = JSON.parse(msg).loginName;
			$(".admin span").html(nName);
		}
	});
}
