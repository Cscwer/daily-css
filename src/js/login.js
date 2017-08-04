// login.js

//明文密码插件初始化
$(function(){
	$('#password').togglePassword({
		el: '#togglePassword'
	});

});

//用JS原生方法实现JQuery的toggle()方法
function hasClass(obj, cls) {  
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
}  
  
function addClass(obj, cls) {  
    if (!this.hasClass(obj, cls)) obj.className += " " + cls;  
}  
  
function removeClass(obj, cls) {  
    if (hasClass(obj, cls)) {  
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
        obj.className = obj.className.replace(reg, ' ');  
    }  
}  
  
function toggleClass(obj,cls){  
    if(hasClass(obj,cls)){  
        removeClass(obj, cls);  
    }else{  
        addClass(obj, cls);  
    }  
}  
  
function toggleClassTest(){  
    var obj = document. getElementById('togglePassword');  
    toggleClass(obj,"icon-yanjing");  
}  

//异步方法处理数据
function getUser() {
	var name = $(".login-user").val();
	var pwd = $(".login-pass").val();	
	if(name.length === 0) {
		// alert("请输入用户名！");
		$(".login-prove").html("请输入用户名");
		$(".login-prove").css("display","block");
		return false;
	}
	if(pwd.length === 0) {
		// alert("请输入密码！");
		$(".login-prove").html("请输入密码");
		$(".login-prove").css("display","block");
		return false;
	}
	return {
		username: name,
		pwd: pwd
	}
}

function login() {
	var user = getUser();
	if(!user) {
		return;
	}
	http.login(
		user,
		function(res) {
			if(res.code === 403) {
				$(".login-prove").css("display","block");
				$(".login-user").val("");
				$(".login-pass").val("");
			}
		},
		function(xhr, err, type) {
			console.log(xhr);
			console.log(err);
			console.log(type);
		}
	)
}

$(".login-log").click(login);

//点击输入框label标签内文字变色
function changeColor(input) {
  input.focus(function() {
    input.prev().css("color","#000000");
  });
  input.blur(function() {
    input.prev().css("color","#b0b0b0");
  })
}

changeColor($(".register-user"));
changeColor($(".register-pass"));
changeColor($(".register-sec-pass"));
changeColor($(".register-email"));
changeColor($(".register-blog"));

//注册表单验证
var oName = document.getElementsByClassName('register-user')[0];
var oPass = document.getElementsByClassName('register-pass')[0];
var oSecPass = document.getElementsByClassName('register-sec-pass')[0];
var oEmail = document.getElementsByClassName('register-email')[0];
var oBlog = document.getElementsByClassName('register-blog')[0];
var count = document.getElementsByClassName('register-count')[0];
var tip = document.getElementsByClassName('register-tip')[0];
var userHint = document.getElementsByClassName('user-hint')[0];
var passwordHint = document.getElementsByClassName('password-hint')[0];
var confirmHint = document.getElementsByClassName('confirm-hint')[0];
var emailHint = document.getElementsByClassName('email-hint')[0];
var blogHint = document.getElementsByClassName('blog-hint')[0];
var liArray = document.getElementsByClassName('power')[0].getElementsByTagName('li');
var powerTip = document.getElementsByClassName('register-power')[0];
var oNameLength = 0;

//定义一个函数，用于获取输入框内输入字符的长度并把汉字转化为双字符。
function getLength(str){
  // \x00-xff代表单字节字符。
  return str.replace(/[^\x00-\xff]/g, "xx").length;
}

//提示输入字符个数
oName.onkeyup = function() {
     oNameLength = getLength(this.value);
     count.innerHTML = oNameLength + '个字符'; 
     if (oNameLength == 0) {
        count.innerHTML = '';
     } 
     console.log(oNameLength);
}

//user
oName.onblur = function() {
  oNameLength = getLength(this.value);
  if(oNameLength > 0 && oNameLength < 11){
    userHint.innerHTML = "&#10004";
    userHint.style.color = "#99FF00";
  }
  else {
    userHint.innerHTML = "&#10006";
    userHint.style.color = "#FF6600";   
  }
}

// password
function test(){

}

oPass.onkeyup = function() {
  if(oPass.value.length > 5 && oPass.value.length <= 9) {
    liArray[0].style.display = "block";
    powerTip.innerHTML = "很弱";
    powerTip.style.color = "#E60012";
  }
  if(oPass.value.length <= 5)  {
    liArray[0].style.display = "none";
    powerTip.innerHTML = "";
    powerTip.style.color = "";
  }
  if(oPass.value.length > 9 && oPass.value.length < 12) {
      liArray[1].style.display = "block";
      powerTip.innerHTML = "弱";
      powerTip.style.color = "#E67700";
  }
  if(oPass.value.length > 5 && oPass.value.length <= 9)  {
    liArray[1].style.display = "none";
    powerTip.innerHTML = "";
    powerTip.style.color = "";
  }
  // if(oPass.value.length > 13) {
  //     liArray[2].style.display = "block";
  //     powerTip.innerHTML = "中";
  //     powerTip.style.color = "#E6D300";
  // }
  // else {
  //   liArray[2].style.display = "none";
  //   powerTip.innerHTML = "";
  //   powerTip.style.color = "";
  // }
  // if(oPass.value.length >= 15) {
  //     liArray[3].style.display = "block";
  //     powerTip.innerHTML = "强";
  //     powerTip.style.color = "#A8E600";
  // }
  // else {
  //   liArray[3].style.display = "none";
  //   powerTip.innerHTML = "";
  //   powerTip.style.color = "";
  // }
}

oPass.onblur = function() {
  var reg = /^[a-zA-Z]\w{5,15}$/;
  if(reg.test(this.value)) {
    passwordHint.innerHTML = "&#10004";
    passwordHint.style.color = "#99FF00";  
  }
  else{
    passwordHint.innerHTML = "&#10006";
    passwordHint.style.color = "#FF6600";  
  } 
}

// confirm
oSecPass.onblur = function() {
  if(oPass.value != '' && oPass.value === oSecPass.value) {
    confirmHint.innerHTML = "&#10004";
    confirmHint.style.color = "#99FF00";  
  }
  else{
    confirmHint.innerHTML = "&#10006";
    confirmHint.style.color = "#FF6600";  
  } 
}

// email
oEmail.onblur = function() {
  var conReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/; 
  if(conReg.test(this.value)) {
    emailHint.innerHTML = "&#10004";
    emailHint.style.color = "#99FF00";  
  }
  else{
    emailHint.innerHTML = "&#10006";
    emailHint.style.color = "#FF6600";  
  } 
}

// blog
oBlog.onblur = function() {
  var bloReg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/; 
  if(bloReg.test(this.value)) {
    blogHint.innerHTML = "&#10004";
    blogHint.style.color = "#99FF00";  
  }
  else{
    blogHint.innerHTML = "&#10006";
    blogHint.style.color = "#FF6600";  
  } 
}

$(".remember-next").click(function() {
  $(".remember-hidden").slideToggle('slow');
})