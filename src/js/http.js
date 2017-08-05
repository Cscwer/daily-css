var http = (function() {
	var http = {};
	var BASEURL = "http://192.168.0.112:3000";

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
		return function(url, data, sucCB, errCB) {
			$.ajax({
				url: BASEURL + url,
				type: method,
				header: {
					auth: getToken()
				},
				data: data,
				dataType: "json",
				success: function(res) {
					if(res.code === 40016) {
						reLogin(function() {
							http.get(url, data, sucCB, errCB)
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
		saveUser(user);
		this.post(
			"/login/login",
			user,
			function(res) {
				if(res.code === 200) {
					saveToken(res.auth);
				}
				sucCB(res);
			},
			function(xhr, err, type) {
				errCB(xhr, err, type);
			}
		)
	}

	return http;
})();