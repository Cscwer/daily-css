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




 // $.ajax({
	//   url: "http://192.168.0.104:3000/index",
	//   type: "GET",
	//   data: {id:"f8fa3dbb-3d9b-4690-a33a-3fc0fab16207"},
	//   dataType: "json",
	//   success: function(res) {
	//    console.log(res);
	//    drawCollect(res.favorite)
	//   },
	//   error: function(xhr, err, type) {
	//    console.log(xhr);
	//    console.log(err);
	//    console.log(type);
	//   }
	//  })





// 渲染收藏夹
	function drawFavours(favorite){
		var favourTem = `
			{{ get (item, idx) >>>> list }}
				<div class="favour-container">
					<div class="dc-favour"> {{ item.theContent }} </div>
					<div></div>
					<div class="favour-delete"></div>
					<div class="favour-detail"></div>
				</div>
			{{ teg }}
		`
		var favoursRender = tpl.fromStr(favourTem);

		var result = favoursRender({
			list: favorite
		});

		$('.dc-favours').html(result);



		// 判断收藏夹内单条dc的字数

		var favour = $('.dc-favour');
		// favour.each((idx) => {
		// 	console.log(idx);
		// 	console.log(fuck[idx].theContent.length);
		// 	if (fuck[idx].theContent.length > 42) {
		// 		$(this).next().addClass('favour-mask');
		// 	}
		// });

		for (var i = 0; i < fuck.length; i++) {
			if (fuck[i].theContent.length > 42) {
				$(favour[i]).next().addClass('favour-mask');
			}
		}

	}
	var fuck = [
		{
			theContent: '哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦oooo哦',
		}, 
		{
			theContent: '哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦'
		},{
			theContent: '哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦oooo哦',
		}, 
		{
			theContent: 2
		},{
			theContent: 1,
		}, 
		{
			theContent: 2
		},{
			theContent: 1,
		}, 
		{
			theContent: 2
		}
	]
	drawFavours(fuck);









$(document).ready(function(){

// 渲染daily-css
	function drawDC(data){

		var dailyTem = `
			<p class="init-text"> {{ a }} </p>
			<span class="favour-dc"></span>
			<span class="detail-dc"></span>
		`;

		var dailyRender = tpl.fromStr(dailyTem);

		var result = dailyRender(data);

		$('.daily-css').html(result);
	}


	test = {
		a: '解好回复都受到世界各地是个电视剧世界各地是个电是个电视剧解不开高速公路上你了离开国欢可能你也好回复都受到世界各地是个电视剧解不开高速公路上你了离开国欢可能你也好回复都受到世界各地是个电视剧解不开高速公路上你了离开国欢可能你也好回复都受到世界各地是个电视剧',
		b: 'fsfsfs'
	};

	drawDC(test);






	var dc = $('.daily-css');
	var dcFavour = $('.dc-favours');
	var textarea = $('.main-container textarea');
	var submitBtn = $('.submit-btn');
	var dcTxt = $('.daily-css p');

// 主界面中dc的两个按钮
	var favourBtn = $('.favour-dc');
	var detailBtn = $('.detail-dc');



// 当前textarea的状态，false说明尚未展开成输入界面
	var dcState = false;


// 当字数过多时，在显示时做隐藏
	function hideTxt(){
		if (dcTxt.text().length > 140) {
			dc.append('<div></div>');
		}
	}

// 显示输入界面
	function showInput(CB1,CB2){
		if (dcState == false) {
			dcFavour.addClass('hide-favours');
			dc.addClass('final-dc');
			textarea.addClass('final-textarea');
			dcTxt.removeClass();
			dcTxt.addClass('final-text');
			submitBtn.removeClass('hide-ele');
			favourBtn.removeClass();
			detailBtn.removeClass();
			dcState = true;
			CB1();
// 失去焦点时判断输入框的值是否为空
			textarea.blur(() => {
				if (textarea.val() == "") {
					CB2();
					console.log('fuck');
				}else{}
			});
// 点击更多的图标返回主界面并清空输入框
			if ($('.daily-css div')) {
				$('.daily-css div').click(() => {
					console.log('fuck');
					CB2();
					textarea.val('');
				});
			}else{}
		}
	}

// 输入框被点击时展开成输入界面
	textarea.click(function(){
		showInput(hideTxt,back);
	});


// 由输入界面返回主界面
	function back(){
		console.log(dcState);
		if (dcState == true) {
			submitBtn.addClass('hide-ele');
			textarea.removeClass('final-textarea');
			dcTxt.addClass('init-text');
			dc.removeClass('final-dc');
			favourBtn.addClass('favour-dc');
			detailBtn.addClass('detail-dc');
			dcFavour.removeClass('hide-favours');
			if ($('.daily-css div')) {
				$('.daily-css div').remove();
			}else{}
			dcState = false;
		}
	}

});






















