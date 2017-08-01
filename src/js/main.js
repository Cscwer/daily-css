// main.js



// function drawDC(data){

	
	
// 	var dailyCSSList = `
// 		{{ get (item, idx) >>>> list2 }}
// 			<span> {{ item }} </span>
// 		{{ teg }}

// 		<ul>
// 			{{ get (item, idx) >>>> list }}
// 			<li> {{ item }} </li>
// 			{{ teg }}
// 		</ul>
// 	`; 

	

// 	var DCRender = tpl.fromStr(dailyCSSList); 

// 	var result = DCRender(data); 

// 	$('.container').html(result);

// }


$(document).ready(function(){

// 渲染daily-css
	function dailyCss(data){

		var dailyTem = `
			<p> {{ a }} </p>
		`;

		var dailyRender = tpl.fromStr(dailyTem);

		var result = dailyRender(data);

		$('.daily-css').html(result);
	}


	test = {
		a: '那Line-height行高属性。一般我们设置<br />设置line-height行高属性即可实现让ght行高属性即可实现让ght行高属性即自动换行文字排版均匀间隔'
	};

	dailyCss(test);

	// var aa = $('.main-container textarea').change(function(){
	// 	console.log(this.value.length);
	// });
});






















