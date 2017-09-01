// clocker.js
var jClock = require('./jClock'); 
var ls = require('./ls'); 
var makeItdraggable = require('./makeItdraggable').drag; 
var clocker = {}

clocker.start = () => {
	var r = window.innerWidth * 0.15; 

	var xy = ls.get('clock-xy') || { left: '0%', top: '0%' }; 

	var d = clockerTplRender({
		clockId: 'clock',
		r: r, 
		xy: xy
	})

	// Insert 2 Dom Tree
	$('.container').append($(d));

	var $cc = $('.clock-container'); 
	
	makeItdraggable($cc, {
		W: r, 
		H: r, 
		newXy: xy => ls.save('clock-xy', xy)
	}); 

	// new 时钟 
	var myClock = new jClock({
		canvasId: 'clock', 
		clockHight: r,
		clockWidth: r
	});

	// 动画完成 
	return new Promise((res, rej) => {
		setTimeout(() => {
			$cc.removeClass('clock-hidden'); 
			res(); 
		}, 150); 
			
	})
}

module.exports = clocker; 
