// makeItdraggable

// config 
// xy 
// w, H 

function down(e) {
	if (e.target === this.target){
		
		console.log('!')
		this.hold = true; 
		this.offsetX = e.offsetX;
		this.offsetY = e.offsetY; 
	}
}

function up(e, style) {
	if (e.target === this.target){
		this.hold = false; 
		let { left, top } = style; 

		this.newXy && this.newXy({
			left, top
		}); 
	}
}

function moving(e, style){
	if (this.hold && e.target === this.target){
	// if (this.hold){
		var perx = (e.clientX - this.offsetX) / window.innerWidth; 
		var pery = (e.clientY - this.offsetY) / window.innerHeight; 

		style.left = perx * 100 + '%'; 
		style.top = pery * 100 + '%'; 
	}
}

module.exports = {
	drag, angle
}

function drag($root, config){
	var dragger = {
		hold: false,
		offsetX: config.W / 2,
		offsetY: config.H / 2,
		newXy: config.newXy, 
		$root: $root,
		target: $root[0]
	}

	$root.bind('mousedown', e => down.call(dragger, e));

	$root.bind('mouseup', function(e){
		up.call(dragger, e, this.style); 
	}); 

	$root.bind('mousemove', function(e){
		moving.call(dragger, e, this.style); 
	})
}

var vec2deg = vec => {
	var d = Math.atan(vec[1] / vec[0]) + Math.PI / 2; 
	
	return (d / Math.PI) * 360; 
}

function angle($root, config){
	
	var angler = {
		hold: false,
		W: config.W / 2,
		H: config.H / 2,
		newAngle: config.newAngle
	}

	$root.bind('mousedown', function(e){

		angler.W = $(this).width()
		angler.H = $(this).height(); 
		angler.hold = true; 
		// down.call(angler, e)
		return false; 
	});

	$root.bind('mouseup', function(e){

		angler.hold = false; 

		let { W, H } = angler; 
		let { offsetX, offsetY } = e; 
		
		var deg = vec2deg([
			offsetX - W/2, 
			offsetY - H/2	 
		]); 
		
		angler.newAngle(deg); 


		return false; 
	}); 


	$root.bind('mousemove', function(e){

		if (angler.hold){
		
			let { W, H } = angler; 
			let { offsetX, offsetY } = e; 
			
			var deg = vec2deg([
				offsetX - W/2, 
				offsetY - H/2	 
			]); 
			

			$root.find('.inside').css('transform', `rotate(${deg}deg`);
			
		
		}

		return false; 
	})
}
