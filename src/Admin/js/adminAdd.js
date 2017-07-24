$.ajax({
	url:"http://localhost:8080/ipet/returnAdminTypeServlet",
	type:"POST",
	success:function(msg){
		var nType = JSON.parse(msg).adminType;
		if(nType==4){
			return;
		}else{
			window.location.href="error.html";
		}
	}
});
function Check(){
	this.AdminNameflag = false;
	this.LoginNameflag = false;
	this.Psw1flag = false;
	this.Psw2flag = false;
	
	this.checkAdminName=function(elementName){
		var reg_name = new RegExp("[\u4e00-\u9fa5_a-zA-Z]");
		var val = document.getElementsByName(elementName)[0].value;
		if(val!=""){
			if(reg_name.test(val)){
				$(".adminNameTip").html("√");
				$(".adminNameTip").css({"font-size":"16px","color":"green"});
				this.AdminNameflag = true;
			}else{
				$(".adminNameTip").html("格式为汉字或英文字母");
				$(".adminNameTip").css({"font-size":"12px","color":"red"});
				this.AdminNameflag = false;
			}
		}else{
			$(".adminNameTip").html("真实姓名不能为空");
			$(".adminNameTip").css({"font-size":"12px","color":"red"});
			this.AdminNameflag = false;
		}
		
	};
	this.tipEmpty = function(className){
		var node = document.getElementsByClassName(className)[0];
		$(node).html("");
	};
	var that = this;
	this.checkLoginName=function(){
		var reg_username = new RegExp("[a-zA-Z0-9]");
		var val = $("input[name=loginName]").val();
		if(val!=""){
			if(reg_username.test(val)){
				$.ajax({
					url:"http://localhost:8080/ipet/checkLoginNameIsExist",
					type:"POST",
					data:{
						loginName:$("input[name=loginName]").val()
					},
					success:function(msg){
						//可用1 不可用0
						var res = parseInt(msg);
						if(res==1){
							$(".loginNameTip").html("√");
							$(".loginNameTip").css({"font-size":"16px","color":"green"});
							
							that.LoginNameflag = true;
						}else{
							$(".loginNameTip").html("该登录名已存在");
							$(".loginNameTip").css({"font-size":"12px","color":"red"});
							that.LoginNameflag = false;
						}
					}
				})
			}else{
				$(".loginNameTip").html("格式为数字或英文字母");
				$(".loginNameTip").css({"font-size":"12px","color":"red"});
				this.LoginNameflag = false;
			}
		}else{
			$(".loginNameTip").html("登录名不能为空");
			$(".loginNameTip").css({"font-size":"12px","color":"red"});
			this.LoginNameflag = false;
		}
		
		
	}
	
	this.checkPassword = function(){
		var reg_psw = new RegExp("^(?![a-zA-z]+$)(?![0-9]+$)(?![!@#$%^&*]+$)[a-zA-Z0-9!@#$%^&*]{6,20}$")
		var val = $("input[name=loginPwd1]").val();
		if(val!=""){
			if(reg_psw.test(val)){
				$(".loginpw1Tip").html("√");
				$(".loginpw1Tip").css({"font-size":"16px","color":"green"});
				this.Psw1flag = true;
			}else{
				$(".loginpw1Tip").html("密码至少包含字母、数字、特殊符号三种格式的两种，长度为6-20位");
				$(".loginpw1Tip").css({"font-size":"12px","color":"red"});
				this.Psw1flag = false;
			}
		}else{
			$(".loginpw1Tip").html("密码不能为空");
			$(".loginpw1Tip").css({"font-size":"12px","color":"red"});
			this.Psw1flag = false;
		}
	};
	this.confirmPsw=function(){
		var psw1 = $("input[name=loginPwd1]").val();
		var psw2 = $("input[name=loginPwd2]").val();
		if(psw2!=""){
			if(psw1==psw2){
				$(".loginpw2Tip").html("√");
				$(".loginpw2Tip").css({"font-size":"16px","color":"green"});
				this.Psw2flag = true;
			}else{
				$(".loginpw2Tip").html("两次密码输入不一致");
				$(".loginpw2Tip").css({"font-size":"12px","color":"red"});
				this.Psw2flag = false;
			}
		}else{
			$(".loginpw2Tip").html("请确认密码");
			$(".loginpw2Tip").css({"font-size":"12px","color":"red"});
			this.Psw2flag = false;
		}
		
	}
	this.submit=function(){
		
		if(this.AdminNameflag && this.LoginNameflag && this.Psw1flag && this.Psw2flag){
			$.ajax({
				url:"http://localhost:8080/ipet/addAdminServlet",
				type:"POST",
				data:{
					adminName:$("input[name=adminName]").val(),
					adminTypeId:$("select").val(),
					loginName:$("input[name=loginName]").val(),
					loginPwd1:$("input[name=loginPwd1]").val()
				},
				success:function(msg){
					alert(msg);
					window.location.href="adminManage.html";
				}
				
			})
		}
			
			
	}
}

var check = new Check();

function cancel(){
	window.history.go(-1);
}
