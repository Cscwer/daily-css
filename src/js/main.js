window.onload = function(){
	var bg = require('./bg');
	var navUrl = require('./navUrl'); 
	var clocker = require('./clocker'); 
	var todo = require('./todo'); 
	var mask = require('./mask'); 

	mask.globalize(); 

	mask.alert({
		msg: 'hello'
	})

	bg().then(finish => {
		console.log('背景加载完成'); 

		// 该加载其他模块了 
		navUrl().then(finish => {
			console.log('导航完成了'); 
		}); 

		clocker.start(); 
	}); 

	todo.init(); 
}


