function login (){
	var reg_user = new RegExp("^[\\u4e00-\\u9fa5_a-zA-Z0-9-]{3,16}$");// 昵称格式：限16个字符，支持中英文、数字、减号或下划线
	var reg_psw  = new RegExp("^(?![a-zA-z]+$)(?![0-9]+$)(?![!@#$%^&*]+$)[a-zA-Z0-9!@#$%^&*]{6,20}$"); //字母或数字、特殊符号中的两种组成
	var name = $("input[name=name]").val();
	var password = $("input[name=password]").val();
	
	if(name!=""&&password !=""){
		if(reg_user.test(name)){
			if(reg_psw.test(password)){
				$.ajax({
					url:"http://localhost:8080/ipet/login",
					type:"POST",
					data:{
						name:name,
						password:password
					},
					success:function (msg){
						var res = parseInt(msg);
						if(res===1){
							window.location.href = "index.html"
						}else if (res === 0){
							$(".message").html("此账号已登录");
						}else if(res === 2){
							$(".message").html("此账号不存在");
						}else if(res === 3){
							$(".message").html("密码错误");
						}else{
							return;
						}
					}
				
				})
			}else{
				$(".message").html("密码错误");
			}
		}else{
			$(".message").html("用户名不存在");
		}
	}else{
		$(".message").html("请填写用户名和密码");
	}
}