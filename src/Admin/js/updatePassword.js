var checkPassword_ = false;
function checkPassword() {
	var password = document.getElementById("password");
	var passwordDiv = document.getElementById("passwordDiv");
	if(password.value == "") {
		passwordDiv.innerHTML = "密码不能为空";
		checkPassword_ = false;
	} else {
		passwordDiv.innerHTML = "";
		checkPassword_ = true;	
	}
}
var checkRpassword_ = false;
function checkRpassword() {
	var rpassword = document.getElementById("rpassword");
	var password = document.getElementById("password");
	var rpasswordDiv = document.getElementById("rpasswordDiv");
	if(rpassword.value == "") {
		rpasswordDiv.innerHTML = "请再次输入密码";
		checkRpassword_ = false;
	} else if(password.value != rpassword.value){
		rpasswordDiv.innerHTML = "你输入的密码和上次不一致";
		checkRpassword_ = false;
	} else {
		rpasswordDiv.innerHTML = "";
		checkRpassword_ = true;
	}
}
function update() {
	var oForm = document.getElementsByTagName("form")[0];
	if(checkRpassword_ && checkPassword_) {
		var name = oForm.name.value;
		var password = oForm.password.value;
		var rpassword = oForm.rpassword.value;
		$.ajax({
			url:"http://localhost:8080/ipet/adminUpdatePassword",
			type:"POST",
			data:{
				name:name,
				password:password,
				rpassword:rpassword
			},
			success:function(res){
				if(res){
					alert("修改成功,请记住新密码!");
					window.location.href="admin.html";
				}else{
					return;
				}
			}
		});
	} else{
		checkPassword();
		checkRpassword();
	}
}

$(document).ready(function(){
	$.ajax({
		url:"http://localhost:8080/ipet/returnAdminTypeServlet",
		type:"POST",
		success:function(msg){
			var nName = JSON.parse(msg).loginName;
			$("input[name=name]").val(nName);
		}
	});
});