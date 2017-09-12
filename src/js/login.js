// login.js

//明文密码插件初始化
$(function(){
	$('#password').togglePassword({
		el: '#togglePassword'
	});

});

$(function(){
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

//异步方法处理登录数据
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
	console.log(user);
	http.login(
		user,
		function(res) {
			console.log(res);
			if(res.code === 40010 || res.code === 40011) {
				$(".login-prove").css("display","block");
				$(".login-user").val("");
				$(".login-pass").val("");
			}
			 
			if(res.code === 200) {
				removeCover();
				$('.cover').remove();
				$('.login').css('display','none');
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

//注册提交数据
function getPost() {
	var name = $(".register-user").val();
	var pwd = $(".register-pass").val(); 
	var reconfirmpwd = $(".register-sec-pass").val(); 
	var email = $(".register-email").val(); 
	var blog = $(".register-blog").val(); 
	return {
		username: name,
		pwd: pwd,
		reconfirmpwd: reconfirmpwd,
		email: email,
		blog: blog
	}
}

//忘记密码提交数据
function getRemember() {
	var username = $(".remember-user").val();
	var email = $(".remember-email").val(); 
	return {
		username: username,
		email: email
	}
}

//验证码数据提交
function getCode() {
	var username = $(".remember-user").val();
	var email = $(".remember-email").val(); 
	var code = $(".remember-prove").val(); 
	return {
		username: username,
		email: email,
		code: code
	}
}

//重置密码数据提交
function getPass() {
	var pwd = $(".reset-new").val();
	var reconfirmpwd = $(".sec-reset").val(); 
	return {
		pwd: pwd,
		reconfirmpwd: reconfirmpwd
	}
}

// //用户名重复检验
// function getRepeat() {
// 	var pwd = $(".register-tip").val();
// 	var reconfirmpwd = $(".sec-reset").val(); 
// 	return {
// 		pwd: pwd,
// 		reconfirmpwd: reconfirmpwd
// 	}
// }

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
function form() {
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
	var oNameLength = 0;
	var stateOne = false;
	var stateTwo = false;
	var stateThree = false;
	var stateFour = false;
	var stateFive = false;

	//定义一个函数，用于获取输入框内输入字符的长度并把汉字转化为双字符。
	function getLength(str) {
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
		if(oNameLength > 0 && oNameLength < 11) {
			userHint.innerHTML = "&#10004";
			userHint.style.color = "#99FF00";
			stateOne = true;
		}
		else {
			userHint.innerHTML = "&#10006";
			userHint.style.color = "#FF6600"; 
			stateOne = false; 
		}
	}

	// password
	//密码强度提示函数封装
	function passWord(li) {
		if($(this).val().length > 5) {
			li[0].style.display = "block";
		}
		else {
			li[0].style.display = "none";
		}
		if($(this).val().length > 8)  {
			li[1].style.display = "block";
		}
		else {
			li[1].style.display = "none";
		}
		if($(this).val().length > 11) {
			li[2].style.display = "block";
		}
		else {
			li[2].style.display = "none";
		}
		if($(this).val().length > 14) {
			li[3].style.display = "block";
		}
		else {
			li[3].style.display = "none";
		}
	}

	var power = $('.power li');
	var secPower = $('.sec-power li');

	$('.register-pass').keyup(function() {
			passWord.call(this, power);
	});

	$('.reset-new').keyup(function() {
			passWord.call(this, secPower);
	});

	//检查密码格式
	oPass.onblur = function() {
		var reg = /^[a-zA-Z]\w{5,15}$/;
		if(reg.test(this.value)) {
			passwordHint.innerHTML = "&#10004";
			passwordHint.style.color = "#99FF00";  
			stateTwo = true;
		}
		else{
			passwordHint.innerHTML = "&#10006";
			passwordHint.style.color = "#FF6600";  
			stateTwo = false;
		} 
	}

	// confirm
	oSecPass.onblur = function() {
		if(oPass.value != '' && oPass.value === oSecPass.value) {
			confirmHint.innerHTML = "&#10004";
			confirmHint.style.color = "#99FF00"; 
			stateThree = true;
		}
		else{
			confirmHint.innerHTML = "&#10006";
			confirmHint.style.color = "#FF6600";  
			stateThree = false;
		} 
	}

	// email
	oEmail.onblur = function() {
		var conReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/; 
		if(conReg.test(this.value)) {
			emailHint.innerHTML = "&#10004";
			emailHint.style.color = "#99FF00"; 
			stateFour = true;
		}
		else{
			emailHint.innerHTML = "&#10006";
			emailHint.style.color = "#FF6600"; 
			stateFour = false; 
		} 
	}

	// blog
	oBlog.onblur = function() {
		if($(this).val().length ==   0) {
			blogHint.innerHTML = "&#10006";
			blogHint.style.color = "#FF6600";
			stateFive = false;
		}
		else {
			blogHint.innerHTML = "&#10004";
			blogHint.style.color = "#99FF00"; 
			stateFive = true;
		}
	}

	//重置密码检验
	var resetNew = document.getElementsByClassName('reset-new')[0];
	var secPasswordHint = document.getElementsByClassName('sec-password-hint')[0];
	var secReset = document.getElementsByClassName('sec-reset')[0];
	var secConfirmHint = document.getElementsByClassName('sec-confirm-hint')[0];
	var resetCompare = document.getElementsByClassName('reset-compare')[0];
	var stateSix = false;
	var stateSeven = false;

	resetNew.onblur = function() {
		var reg = /^[a-zA-Z]\w{5,15}$/;
		if(reg.test(this.value)) {
			secPasswordHint.innerHTML = "&#10004";
			secPasswordHint.style.color = "#99FF00";
			stateSix = true;
		}
		else{
			secPasswordHint.innerHTML = "&#10006";
			secPasswordHint.style.color = "#FF6600";
			stateSix = false; 
		} 
	}

	secReset.onblur = function() {
		if(resetNew.value != '' && secReset.value === resetNew.value) {
			secConfirmHint.innerHTML = "&#10004";
			secConfirmHint.style.color = "#99FF00"; 
			resetCompare.style.display = "none";
			stateSeven = true;
		}
		else{
			secConfirmHint.innerHTML = "&#10006";
			secConfirmHint.style.color = "#FF6600";
			resetCompare.style.display = "block";
			stateSeven = false;
		} 
	}

	//各个界面之间切换
	var clickNumber = 1; 
	$(".remember-next").click(function() {
		if(clickNumber == 1) {
			$(".remember-next").addClass('add');
			$(".remember-hidden").css('display','block');
			clickNumber++;
		}
		else {
			var data = getCode();
			console.log(data);

			http.post(
				'/lost/verifycode',
				data, 
				function(res){
					if(res.code === 200){
						window.localStorage.setItem('vericode', res.auth);

						$(".remember").css("display","none");
						$(".remember-reset").css("display","block");
						console.log('fgfgf');						
					}
					if(res.code === 100013){
						$(".remember-error").css("display","block");						
					}
					if(res.code === 100014){
						$(".remember-error").html("验证信息过期");
						$(".remember-error").css("display","block");						
					}
				},
				function(err){
					console.log(err)
				}
			)
		}
	});

	$(".login-register").click(function() {
		$(".login").css("display","none");
		$(".register").css("display","block");
	});

	$(".register-sure").click(function() {
		if(stateOne == true && stateTwo == true && stateThree == true && stateFour == true && stateFive == true) {
			var data = getPost();
			console.log(data);
			http.post(
				'/register',
				data, 
				function(res){
					if(res.code === 200){
						$(".register").css("display","none");
						$(".login").css("display","block"); 						
						http.get(
		'/',
		{},
		// 请求成功时的回调函数
		function(res){
			favourDC = res.favorite;
			dailyCss = res.dailyCss;
			console.log(res);
			// 渲染dc
			drawDC(dailyCss,$('.daily-css'),true);
			drawDC(dailyCss,$('.show-dc'),false);
			// 渲染收藏夹
			drawFavours(favourDC);
			// 首页按钮
			detailBtn = $('.detail-dc');
			deleteBtn = $('.favour-delete');
			favourDetailBtn = $('.favour-detail');
			favourBtn = $('.favour-dc');

			detailBtn.click(toDetail);
			favourDetailBtn.click(toDetail);

			deleteBtn.click( function(){
				deleteDC.call(this,favourDC);
			});

			favourBtn.click(() => {
				favourIt(dailyCss,favourDC);
			});

		},
		// 请求失败的回调函数
		function(err){
			console.log('err',err);
		});
					}
				},
				function(err){
					console.log(err)
				}
			)
		} else {
			return false;
		}
	});

	$('.remember-next').click(function() {
		var data = getRemember();
		console.log(data);

		http.post(
			'/lost/verifyuser',
			data, 
			function(res){
				if(res.code === 100010 || res.code === 100011){
					$(".remember-tip").css("display","block");						
				}
			},
			function(err){
				console.log(err)
			}
		)
	})

	$('.remember-send').click(function() {
		var data = getRemember();
		console.log(data);

		http.post(
			'/lost/sendcode',
			data, 
			// function(res){
			// 	if(res.code === 100010 || res.code === 100011){
			// 		$(".remember-tip").css("display","block");						
			// 	}
			// },
			function(err){
				console.log(err)
			}
		)
	})

	$(".login-found").click(function() {
		$(".login").css("display","none");
		$(".remember").css("display","block");
	});

	$(".reset-confirm").click(function() {
		var data = getPass();
		var vericode = window.localStorage.getItem('vericode');
		data.auth = vericode;

		console.log(data);

		http.post(
			'/lost/updatepwd',
			data, 
			function(res){
				if(res.code === 200){
					window.localStorage.clear();
					$(".remember-reset").css("display","none");
					$(".login").css("display","block");						
				}
			},
			function(err){
				console.log(err)
			}
		)
	});
}

form();


//登录注册界面消失

function addCover(){
	$('.nav').css('display','none');
	$('.main-container').addClass('hide-main');
}
function removeCover(){
	$('.nav').css('display','flex');
	$('.main-container').removeClass('hide-main');
}

$('.login-in').click(function() {
	addCover();
	$('.show-detail').after('<div class="cover "></div>');
	$('.login').css('display','block');
})

$('.icon-Delete').click(function() {
	removeCover();
	$('.cover').remove();
	$('.login').css('display','none');
	$('.register').css('display','none');
	$('.remember').css('display','none');
	$('.remember-reset').css('display','none');
})
});


