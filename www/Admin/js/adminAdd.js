function Check(){this.AdminNameflag=!1,this.LoginNameflag=!1,this.Psw1flag=!1,this.Psw2flag=!1,this.checkAdminName=function(i){var n=new RegExp("[一-龥_a-zA-Z]"),e=document.getElementsByName(i)[0].value;""!=e?n.test(e)?($(".adminNameTip").html("√"),$(".adminNameTip").css({"font-size":"16px",color:"green"}),this.AdminNameflag=!0):($(".adminNameTip").html("格式为汉字或英文字母"),$(".adminNameTip").css({"font-size":"12px",color:"red"}),this.AdminNameflag=!1):($(".adminNameTip").html("真实姓名不能为空"),$(".adminNameTip").css({"font-size":"12px",color:"red"}),this.AdminNameflag=!1)},this.tipEmpty=function(i){var n=document.getElementsByClassName(i)[0];$(n).html("")};var i=this;this.checkLoginName=function(){var n=new RegExp("[a-zA-Z0-9]"),e=$("input[name=loginName]").val();""!=e?n.test(e)?$.ajax({url:"http://localhost:8080/ipet/checkLoginNameIsExist",type:"POST",data:{loginName:$("input[name=loginName]").val()},success:function(n){1==parseInt(n)?($(".loginNameTip").html("√"),$(".loginNameTip").css({"font-size":"16px",color:"green"}),i.LoginNameflag=!0):($(".loginNameTip").html("该登录名已存在"),$(".loginNameTip").css({"font-size":"12px",color:"red"}),i.LoginNameflag=!1)}}):($(".loginNameTip").html("格式为数字或英文字母"),$(".loginNameTip").css({"font-size":"12px",color:"red"}),this.LoginNameflag=!1):($(".loginNameTip").html("登录名不能为空"),$(".loginNameTip").css({"font-size":"12px",color:"red"}),this.LoginNameflag=!1)},this.checkPassword=function(){var i=new RegExp("^(?![a-zA-z]+$)(?![0-9]+$)(?![!@#$%^&*]+$)[a-zA-Z0-9!@#$%^&*]{6,20}$"),n=$("input[name=loginPwd1]").val();""!=n?i.test(n)?($(".loginpw1Tip").html("√"),$(".loginpw1Tip").css({"font-size":"16px",color:"green"}),this.Psw1flag=!0):($(".loginpw1Tip").html("密码至少包含字母、数字、特殊符号三种格式的两种，长度为6-20位"),$(".loginpw1Tip").css({"font-size":"12px",color:"red"}),this.Psw1flag=!1):($(".loginpw1Tip").html("密码不能为空"),$(".loginpw1Tip").css({"font-size":"12px",color:"red"}),this.Psw1flag=!1)},this.confirmPsw=function(){var i=$("input[name=loginPwd1]").val(),n=$("input[name=loginPwd2]").val();""!=n?i==n?($(".loginpw2Tip").html("√"),$(".loginpw2Tip").css({"font-size":"16px",color:"green"}),this.Psw2flag=!0):($(".loginpw2Tip").html("两次密码输入不一致"),$(".loginpw2Tip").css({"font-size":"12px",color:"red"}),this.Psw2flag=!1):($(".loginpw2Tip").html("请确认密码"),$(".loginpw2Tip").css({"font-size":"12px",color:"red"}),this.Psw2flag=!1)},this.submit=function(){this.AdminNameflag&&this.LoginNameflag&&this.Psw1flag&&this.Psw2flag&&$.ajax({url:"http://localhost:8080/ipet/addAdminServlet",type:"POST",data:{adminName:$("input[name=adminName]").val(),adminTypeId:$("select").val(),loginName:$("input[name=loginName]").val(),loginPwd1:$("input[name=loginPwd1]").val()},success:function(i){alert(i),window.location.href="adminManage.html"}})}}function cancel(){window.history.go(-1)}$.ajax({url:"http://localhost:8080/ipet/returnAdminTypeServlet",type:"POST",success:function(i){4!=JSON.parse(i).adminType&&(window.location.href="error.html")}});var check=new Check;