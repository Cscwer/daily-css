var http = (function() {
	var http = {};
	var BASEURL = "http://39.108.117.83:3000";

	function getUser() {
		return JSON.parse(
			window.localStorage.getItem("user")
		);
	}

	function saveUser(user) {
		var t = JSON.stringify(user);
		window.localStorage.setItem("user", t);
	} 

	function saveToken(auth) {
		var key = "auth";
		window.localStorage.setItem(key, auth);
	}
	function getToken() {
		console.log('gettoken');
		return window.localStorage.getItem("auth");
	}

	function reLogin(cb) {
		var user = getUser();
		if(!user) return;

		http.login(user, function(res) {
			if(res.code === 200) {
				saveToken(res.auth);
				console.log("自动重新登录成功");
				cb();
			}
		});
	}
	http.verb = function(method) {
		return function todo(url, data, sucCB, errCB) {

			$.ajax({
				url: BASEURL + url,
				type: method,
				headers: {
					// auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5pZ2h0IiwiaWF0IjoxNTA0OTQ3MTgwfQ.n-Ef4ALrZAQLsR2ul-FJFodTexdg_N3nEsMVxgWQ9pg'
					auth: getToken()
				},
				data: data,
				dataType: "json",
				success: function(res) {
					if(res.code === 40016) {
						reLogin(function() {
							todo(url, data, sucCB, errCB)
						});
					} else {
						console.log(`[${method} SUCCESS] data:`, data);
						console.log('RESULT:', res);
						sucCB(res);
					}
				},
				error: function(xhr, err, type) {
					console.log(xhr);
					console.log(err);
					console.log(type);
				}
			})
		}
	}

	http.get = http.verb('get');
	http.post = http.verb('post');

	http.login = function(user, sucCB, errCB) {

		this.post(
			"/user/login",
			user,
			function(res) {
				if(res.code === 200) {
					saveToken(res.auth);
					user.pwd = '******';
					user.auth = res.auth; 
					saveUser(user);
				}
				sucCB(res);
			},
			function(xhr, err, type) {
				errCB(xhr, err, type);
			}
		)
	}


	http.getUser = getUser;
	return http;
})();