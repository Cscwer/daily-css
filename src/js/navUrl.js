// navUrl.js

var navs = [
	{
		url: 'https://eczn.coding.me',
		icon: 'http://localhost/lib/asd.jpg',
		name: 'eczn 个人博客'
	}, 
	{
		url: 'https://github.com/eczn',
		icon: 'https://avatars2.githubusercontent.com/u/13131724',
		name: 'eczn github'
	},
	{
		url: 'https://eczn.coding.me',
		icon: 'http://localhost/lib/asd.jpg',
		name: 'eczn 个人博客'
	}, 
	{
		url: 'https://eczn.coding.me',
		icon: 'http://localhost/lib/asd.jpg',
		name: 'eczn 个人博客'
	}
]; 


module.exports = function(){
	var time = 500; 
	var temp = websiteTplRender({
		navs: navs, 
		time: time / 1000 
	}); 

	var $website =  $(temp); 

	$('.container').append($website); 

	return new Promise((res, rej) => {
		setTimeout(_ => {
			$website.removeClass('website-hidden'); 

			$website.find('.item').each((i, dom) => {
				setTimeout(_ => {
					$(dom).removeClass('website-item-hidden'); 
				}, Math.random() * 200 + 100); 
			})

			setTimeout(() => {
				// next 
				res(); 
			}, time)
		}, 150); 
	}); 
}
