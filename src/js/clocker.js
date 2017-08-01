// clocker.js
var jClock = require('./jClock'); 
var ls = require('./ls'); 
var clocker = {}

clocker.start = () => {
	var r = window.innerWidth * 0.15; 

	var xy = ls.get('clock-xy') || { left: '0%', top: '0%' }; 

	

	var d = clockerTplRender({
		clockId: 'clock',
		r: r, 
		xy: xy
	})

	var $clock = $(d); 

	$('.container').append($clock);

	var $cc = $('.clock-container'); 
			
	window.$cc = $cc; 

	let hold = false; 
	let offsetX = r / 2; 
	let offsetY = r / 2; 
	$cc.bind('mousedown', function(e){
		hold = true; 
		// 解构 
		offsetX = e.offsetX;
		offsetY = e.offsetY; 
	});

	$cc.bind('mouseup', function(){
		hold = false; 
		let { left, top } = this.style; 
		// Store To LS 
		console.log(left, top); 
		ls.save('clock-xy', {
			left,
			top
		}); 
	}); 

	$cc.bind('mousemove', function(e){
		if (hold){
			var perx = (e.clientX - offsetX) / window.innerWidth; 
			var pery = (e.clientY - offsetY) / window.innerHeight; 

			this.style.left = perx * 100 + '%'; 
			this.style.top = pery * 100 + '%'; 
		}
	})

	var myClock = new jClock({
		canvasId: 'clock', 
		clockHight: r,
		clockWidth: r
	});

	return new Promise((res, rej) => {
		
		setTimeout(() => {
			$cc.removeClass('clock-hidden'); 

			res(); 
		}, 150); 
			
	})
}

module.exports = clocker; 
