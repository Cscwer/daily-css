// login-page.js
let http = require('../http.client'); 

function loginPage(){
	return new Promise((loginRes, loginRej) => {
		var checker = {
			'r-username': name => {
				if (name.length < 4) {
					return {
						valid: false, 
						msg: '用户名太短, 至少 4 个字'
					}
				} else {
					return { valid: true }
				}
			}, 
			'r-pwd': function(pwd){
				if (pwd.length < 5) {
					return {
						valid: false, 
						msg: '密码太短, 至少 5 个字'
					}
				} else {
					return { valid: true }
				} 
			}, 
			'r-cpwd': pwd => {
				let f = $('.r-pwd').val(); 

				if (f !== pwd) {
					return {
						valid: false, 
						msg: '两次输入不一致'
					}
				} else {
					return { valid: true }
				}
			}
		}

		$('.to-register').click(nav2Register); 

		function nav2Register(){
			$('.register-container').css('left', '0%'); 
			$('.login-container').css('left', '-100%'); 
		}

		function nav2Login(){
			$('.register-container').css('left', '100%'); 
			$('.login-container').css('left', '0%'); 
		}

		$('.input-container input').on('keyup', function(){
			let $next = $(this).next(); 
			let method = $(this).attr('class'); 
			let val = $(this).val(); 

			if (checker[method]){
				let res = checker[method](val); 

				console.log(res)

				if (!res.valid) {
					$next.html(res.msg) 
				} else {
					$next.html('') 
				}
			}
		});

		$('.confirm-register').click(function(){
			var toCheck = Object.keys(checker); 

			var results = toCheck.map(e => {
				let val = $('.' + e).val(); 
				return {
					val: val, 
					res: checker[e](val)
				}
			}); 

			var getVal = className => $('.' + className).val(); 
			
			var isOk = results.every(e => e.res.valid); 

			if (!isOk){
				alert('输入有误请重试'); 
			} else {
				http.post('/register', {
					username: getVal('r-username'), 
					pwd: getVal('r-pwd'), 
					reconfirmpwd: getVal('r-cpwd'), 
					email: getVal('r-mail'), 
					blog: getVal('r-blog')
				}, false).then(suc => {
					console.log(suc); 

					if (suc.code === 200){
						alert('请前往邮箱确认后方可登录'); 
						nav2Login();
						loginRes(); 
					}
				}, err => {
					console.log(err)
				}); 
			}
		})
	})
}

module.exports = loginPage; 
