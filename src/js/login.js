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
	// $.ajax({
	// 	url: "http://192.168.0.112:3000/login/login",
	// 	type: "POST",
	// 	data: user,
	// 	dataType: "json",
	// 	success: function(res) {
	// 		console.log(res);
	// 		if(res.code === 403) {
	// 			$(".login-prove").css("display","block");
	// 			$(".login-user").val("");
	// 			$(".login-pass").val("");
	// 		}
	// 	},
	// 	error: function(xhr, err, type) {
	// 		console.log(xhr);
	// 		console.log(err);
	// 		console.log(type);
	// 	}
	// })
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