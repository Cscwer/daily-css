// login.js
var login = {}; 
var ls = require('../ls'); 
var sys = require('../sys'); 
var loginPage = require('./login-page'); 

login.check = () => {
	return new Promise((res, rej) => {
		let token = ls.get('token'); 

		if (token) {
			res(token); 
		} else {
			rej(false); 
		}
	}); 
}

login.init = () => {
	let s = loginTplRender({
		loginWidth: `${sys.w * 0.3}px`, 
		loginHeight: `${sys.h * 0.7}px`, 
		marginTop: `${sys.h * 0.1}px`
	}); 

	$('.container').append(s); 

	loginPage().then(suc => {
		
	})

	return new Promise((res, rej) => {

	})
}

module.exports = login; 
