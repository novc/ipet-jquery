function login() {
	var sName = document.getElementById("name").value;
	var sPassword = document.getElementById("password").value;
	if(sName != "") {
		if(sPassword != ""){
			$(".message").html("");
			$.ajax({
				url:"http://localhost:8080/ipet/adminLoginServlet",
				data:{
					name:$("input[name=name]").val(),
					password:$("input[name=password]").val()
				},
				success:function(res){
					var msg = parseInt(res);
					switch(msg){
					case -2:
						$(".message").html("登录名不存在");
						break;
					case -1:
						$(".message").html("密码错误");
						break;
					case 0:
						$(".message").html("登录失败");
						break;
					case 1:
						window.location.href="pages/admin.html";
						break;
					case 2:
						$(".message").html("该账号已经登录");
						default:
							break;
					}
					
				}
			});
		}else{
			$(".message").html("密码不能为空");
		}
	}else{
		$(".message").html("登录名不能为空");
	}
}
