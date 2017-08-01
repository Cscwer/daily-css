// bg.js
var urlList = new Array(4).fill(0).map((_, idx) => (
	`http://localhost/lib/[${idx + 1}]ARIA.jpg`
)); 

var getUrl = () => {
	var r = Math.floor(
		Math.random(urlList.length)
	); 
	return urlList[r]; 
}

function backgroundInit(){
	var time = 500; 
	var bgHTML = backgroundTplRender({
		url: getUrl(), 
		time: time / 1000, 
		bgc: 'rgba(0, 0, 0, .2)'
	}); 

	var $bg = $(bgHTML); 

	$('.container').append($bg); 

	return new Promise((res, rej) => {
		setTimeout(_ => {
			$bg.removeClass('bg-hidden'); 
			// it Works 
			
			setTimeout(_ => {
				res(); 
			}, time)
		}, 150); 
	})
}

// backgroundInit(); 

module.exports = backgroundInit; 
