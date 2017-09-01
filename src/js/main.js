let login = require('./login'); 
let home = require('./home'); 
let bg = require('./bg'); 

function enterDC(token){
	home.init(); 
}

$(function(){
	bg(); 

	login.check().then(
		enterDC,
		no => login.init().then(enterDC)
	); 
});
