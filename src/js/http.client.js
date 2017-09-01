// http.client.js
let http = {}; 
let ls = require('./ls'); 
let BASE_URL = 'http://localhost:3000'; 

function getToken(){
	return ls.get('token');
}

http.send = (method, url, data = {}, needToken = true) => {
	url = BASE_URL + url; 

	let token = getToken(); 

	if (token || needToken) {
		var headers = {
			auth: token
		}
	} else {
		var headers = {}; 
	}

	return new Promise((res, rej) => {
		$.ajax({
			url: url, 
			type: method, 
			headers: headers, 
			data: data, 
			dataType: "json",
			success: res, 
			error: rej
		}); 
	}); 
}

[
	'get', 
	'post'
].forEach(method => {
	http[method] = (url, data, needToken) => {
		return http.send(method, url, data, needToken);
	}
}); 

module.exports = http; 
