/*
 *  jClock.js :  display time on canvas. 
 *
 *
 */

"use strict"; 
// function jClock(canvasId, width,height){
function jClock(config){
	var jClockTimeCore = new Date(),
		PI = Math.PI,
		domCanvas = document.getElementById(config.canvasId),
		// width = 300, 
		g = domCanvas.getContext('2d'),
		time = {
			hour: jClockTimeCore.getHours(),
			min: jClockTimeCore.getMinutes(), 
			sec: jClockTimeCore.getSeconds() 
		}; 

	var width = config.clockWidth,
		height = config.clockHight;

	domCanvas.width = width;
	domCanvas.height = height;

	function freshTime(){
		time.hour = jClockTimeCore.getHours();
		time.min = jClockTimeCore.getMinutes();
		time.sec = jClockTimeCore.getSeconds();
	}

	function setSize(new_width,new_height){
		if (new_width != undefined){
			width = new_width;
			domCanvas.width = width; 			
			// return 1; 
		}

		if (new_height != undefined){
			height = new_height; 
			domCanvas.height = height; 
			// return 1; 
		} 

		if (new_height == undefined && new_width == undefined){
			console.log("set up jClock's size without any value!"); 
			return 0; 
		}
	}

	function rad2deg(rad){
		// 输入弧度制返回度数制 
		// 十二点整的位置是零开始的地方

	}

	function getVec(rad,r){ // deg：12 点时值为0 
		// var trueDeg = deg - 90, // 真deg（跟x正方向夹角）
		return {
			x: r * Math.cos(rad),
			y: r * Math.sin(rad),
			r: r
		};
	}

	function jClocking(lastSec,time){
		var temp = new Date();
		var mySec = temp.getSeconds(),
			myMin = temp.getMinutes(), 
			myHour= temp.getHours(); 

		// console.log(temp.getTime());

		// if (time > 1030){
		if (lastSec != mySec){
			time = 0;
		}
		// console.log(time);
		var time1000 = time/1000; 
		paint(
			  (PI*((mySec+time1000)/30) )-PI/2,
			  (PI*( myMin+(mySec+time1000)/60)/30)-PI/2,
			  // (PI*(myHour+myMin/60)/30)-PI/2
			  -PI/2+PI*2 *(( myHour>12?myHour-12:myHour +myMin/60)/12)
			  // (myHour + myMin/60)
		); 

		// console.log(myHour); 
		// console.group("time"); 
		// 	console.log((PI*(myHour+myMin/60)/30)+PI/2); 
		// 	console.log((PI*((mySec+time1000)/30) )-PI/2);
		// console.groupEnd(); 
		setTimeout(function(){
			// jClocking(mySec,time+30);
			jClocking(mySec,time);
		},1000);
	}


	function paint(secRad,minRad,hourRad){
		g.clearRect(0,0,width,height); 
		// g.fillStyle = 'rgba(255,255,255,0.4)';
		// g.fillRect(0,0,width,height);
		
		// aPointer(getVec(minRad,120),undefined,3);
		aPointer(getVec(minRad,120/300 * width),'rgba(255,255,255,0.65)',3);
		// aPointer(getVec(hourRad,60),null,4);
		aPointer(getVec(hourRad,60/300 * width),'rgba(255,255,255,0.65)',4);
		// aPointer(getVec(secRad,140),"rgb(153,0,0)",2);
		aPointer(getVec(secRad,140/300 * width),"rgb(233,70,76)",2);
	}

	function aPointer(vec,color,lineWidth){
		if (color){
			g.strokeStyle = color; 
		} else {
			g.strokeStyle = "#000"
		}

		if (lineWidth){
			g.lineWidth = lineWidth;
		} else {
			g.lineWidth = 2; 
		}

		g.beginPath();
		g.moveTo(width/2,height/2);
		g.lineTo(width/2 + vec.x , height/2 + vec.y); 
		g.moveTo(width/2,height/2);
		g.lineTo(width/2 - 15*vec.x/vec.r , height/2 - 15*vec.y/vec.r);
		g.stroke(); 
		g.closePath();
	}

	jClocking(new Date().getSeconds(), 0);
	this.jClocking = jClocking;
	this.setSize = setSize;
	this.jClocking = jClocking; 
}

function mapple(x){
	console.log(x); 
	return 0.3 * x; 
}


// export
module.exports = jClock; 
