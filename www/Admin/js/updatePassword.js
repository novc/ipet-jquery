function checkPassword(){var e=document.getElementById("password"),a=document.getElementById("passwordDiv");""==e.value?(a.innerHTML="密码不能为空",checkPassword_=!1):(a.innerHTML="",checkPassword_=!0)}function checkRpassword(){var e=document.getElementById("rpassword"),a=document.getElementById("password"),s=document.getElementById("rpasswordDiv");""==e.value?(s.innerHTML="请再次输入密码",checkRpassword_=!1):a.value!=e.value?(s.innerHTML="你输入的密码和上次不一致",checkRpassword_=!1):(s.innerHTML="",checkRpassword_=!0)}function update(){var e=document.getElementsByTagName("form")[0];if(checkRpassword_&&checkPassword_){var a=e.name.value,s=e.password.value,r=e.rpassword.value;$.ajax({url:"http://localhost:8080/ipet/adminUpdatePassword",type:"POST",data:{name:a,password:s,rpassword:r},success:function(e){e&&(alert("修改成功,请记住新密码!"),window.location.href="admin.html")}})}else checkPassword(),checkRpassword()}var checkPassword_=!1,checkRpassword_=!1;$(document).ready(function(){$.ajax({url:"http://localhost:8080/ipet/returnAdminTypeServlet",type:"POST",success:function(e){var a=JSON.parse(e).loginName;$("input[name=name]").val(a)}})});