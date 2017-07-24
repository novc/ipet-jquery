/*------------注册页js：表单验证------------*/

function InputValidate(){
  var reg_user = new RegExp("^[\\u4e00-\\u9fa5_a-zA-Z0-9-]{3,16}$");// 昵称格式：限16个字符，支持中英文、数字、减号或下划线
  var reg_psw  = new RegExp("^(?![a-zA-z]+$)(?![0-9]+$)(?![!@#$%^&*]+$)[a-zA-Z0-9!@#$%^&*]{6,20}$"); //字母或数字、特殊符号中的两种组成
  var reg_psw1  = new RegExp("^(?![a-zA-z]+$)(?![0-9]+$)(?![!@#$%^&*]+$)(?![a-zA-z0-9]+$)(?![a-zA-z!@#$%^&*]+$)(?![0-9!@#$%^&*]+$)[a-zA-Z0-9!@#$%^&*]+$");
  var reg_tel  = new RegExp("^1[34578][0-9]{9}$");//电话号码
  this.flag=[0,0,0,0,0];
  var that = this;
  var regNum;
  //账户名验证
  this.usernameValidate=function(){
    var username = $("input[name=username]").val();
    if(username!=""){
      if(reg_user.test(username)){
         $.ajax({
           url:"http://localhost:8080/ipet/checkNameExist",
           data:{ username:username },
           async:false, 
           type:"POST",
           success:function(msg){
             if(parseInt(msg)){
            	 $("input[name=username]").parent("div").addClass("success").removeClass("error");
            	 that.flag[0]=1;
             }
             else{
               $("input[name=username]").parent("div").addClass("error").removeClass("success");
               $(".userTip").html("账户名已存在");
               that.flag[0]=0;
             }
           }
         });
      }
      else{
        $("input[name=username]").parent("div").addClass("error").removeClass("success");
        this.flag[0]=0;
      }
    }else{
      $("input[name=username]").parent("div").addClass("error").removeClass("success");
      this.flag[0]=0;
    }
    this.allValidate();
  };
  //密码验证
  this.pswValidate=function(){
    var psw = $("input[name=psw]").val();
    $(".pswStrength b").removeClass("active");
    if(psw!=""){
      if(reg_psw.test(psw)){
        $("input[name=psw]").parent("div").addClass("success").removeClass("error");
        this.flag[1]=1;
        if(psw.length<=8){
          $(".strength1").addClass("active");
        }
        if(psw.length>8&&psw.length<=13){
          $(".strength1").addClass("active");
          $(".strength2").addClass("active");
        }
        if(psw.length>8&&reg_psw1.test(psw)){
          $(".strength1").addClass("active");
          $(".strength2").addClass("active");
          $(".strength3").addClass("active");
        }
      }
      else{
        $("input[name=psw]").parent("div").addClass("error").removeClass("success");
        this.flag[1]=0;
      }
    }else{
      $("input[name=psw]").parent("div").addClass("error").removeClass("success");
      this.flag[1]=0;
    }
    this.allValidate();
  };
  this.confirmPsw = function(){
	
    var psw = $("input[name=psw]").val();
    var psw2 = $("input[name=psw2]").val();
    if(psw2!=""&&psw===psw2){
      this.flag[2]=1;
      
      $("input[name=psw2]").parent("div").addClass("success").removeClass("error");
    }else{
      this.flag[2]=0;
      $("input[name=psw2]").parent("div").addClass("error").removeClass("success");
    }
    this.allValidate();
  };
  // 手机号码验证
  this.telValidate = function(){
    var tel = $("input[name=tel]").val();
    if(tel!=""){
      if(reg_tel.test(tel)){
        this.flag[3]=1;
       
        $("input[name=tel]").parent("div").addClass("success").removeClass("error");
      }else{
        $("input[name=tel]").parent("div").addClass("error").removeClass("success");
        this.flag[3]=0;
      }
    }else{
      this.flag[3]=0;
      $("input[name=tel]").parent("div").addClass("error").removeClass("success");
    }
    this.allValidate();
  };
  
this.sendYZ = function(){
	this.telValidate();
	regNum = parseInt((Math.random()+1)*100000);
	sRegNum = regNum.toString();
	if(this.flag[3]==1){
		var sPhoneNum = $("input[name=tel]").val();
		$.ajax({
			url:"http://localhost:8080/ipet/sendMessageServlet",
			type:"POST",
			data:{
				phoneNum:sPhoneNum,
				regNum:sRegNum
			},
			success:function(msg){
				console.log(msg);
			},
			error:function(res){
				console.log(res);
			}
		});
	}else{
		return;
	}
	
};
  this.telyzValidate = function( ){
     var telyz = parseInt($("input[name=telYZ]").val());
     if(telyz===regNum){
       this.flag[4]=1;
       $("input[name=telYZ]").parent("div").addClass("success").removeClass("error");
     }else{
       this.flag[4]=0;
       $("input[name=telYZ]").parent("div").addClass("error").removeClass("succces");
     }
     this.allValidate();
  };
  this.allValidate=function(){
    if(this.flag[0]==1&&this.flag[1]==1&&this.flag[2]==1&&this.flag[3]==1&&this.flag[4]==1&&$("input[name=read]").is(':checked')){
    	$(".reg-btn").addClass("reg-able").removeAttr("disabled");
    }else{
    	$(".reg-btn").removeClass("reg-able").attr("disabled","disabled");
    }
  };
  this.read=function(){
	  this.allValidate();
  };
  
}

var inputValidate = new InputValidate();
function register(){
	$.ajax({
		url:"http://localhost:8080/ipet/register",
		data:{
			tel:$("input[name=tel]").val(),
			username:$("input[name=username]").val(),
			psw:$("input[name=psw]").val()
		},
		success:function(msg){
			if(parseInt(msg)){
				window.location.href="index.html";
			}
			else{
				alert("注册失败，再试一次吧");
				window.location.reload(true);
			}
		}
	});
}

