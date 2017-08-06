// mask.js
var mask = {}; 

module.exports = mask; 

mask.alert = (config = {}) => {
	let { msg } = config; 
	
	var h = alertTplRender(config); 

	$('.mask').html(h)

	setTimeout(() => {
		$('.mask .alert').attr('show', '√'); 
	}, 150);
	// console.log($alert)
}

mask.globalize = () => {
	window.mask = mask; 
}

