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
					<div class="{{ addMask item.theContent }}"></div>
					<div class="favour-delete"></div>
					<div class="favour-detail"></div>
				</div>
			{{ teg }}
		`
		var favoursRender = tpl.fromStr(favourTem);

		var result = favoursRender({
			list: favorite,
			// 判断收藏夹内单条dc的长度，大于42则加模糊
			addMask: str => str.length > 42 ? 'favour-mask' : ''
		});

		$('.dc-favours').html(result);

	}
	var fuck = [
		{
			theContent: '哦哦哦哦哦哦哦哦fs jk fsj哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦oooo哦',
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









// 渲染详情页的评论
function drawComment(comments){
	var commentTem = `
		{{ get (item, idx) >>>> list }}
			<div class="{{ judge item.commentator username }}">
				<div class="user-pic"></div>
				<div class="user-comment"> {{ item.comment }} </div>
			</div>
		{{ teg }}
	`
	var commentRender = tpl.fromStr(commentTem);
	var result = commentRender({
		list: comments,
		judge: (commentator,username) => commentator === username ? 'comment-self' : 'comment-others'
	});
	$('.comment-container').html(result);
}


var check = {
    "code": 200,
    "data": [
        {
            "_id": "5982955c00d6960df4180b73",
            "id": "1f1e862e-7b29-46e5-834b-e6f3ec3d21bf",
            "commentator": "321",
            "comment": "荣耀大傻逼",
            "date": "2017-08-03 11:15:40",
            "author": "zxc111",
            "status": "1"
        },{
            "_id": "5982951700d6960df4180b71",
            "id": "1f1e862e-7b29-46e5-834b-e6f3ec3d21bf",
            "commentator": "zxc111",
            "comment": "我要吃鸡腿",
            "date": "2017-08-03 11:14:31",
            "author": "zxc111",
            "status": "1"
        },
        {
            "_id": "5982955500d6960df4180b72",
            "id": "1f1e862e-7b29-46e5-834b-e6f3ec3d21bf",
            "commentator": "1233",
            "comment": "gtt",
            "date": "2017-08-03 11:15:33",
            "author": "zxc111",
            "status": "1"
        },
        {
            "_id": "5982951700d6960df4180b71",
            "id": "1f1e862e-7b29-46e5-834b-e6f3ec3d21bf",
            "commentator": "zxc111",
            "comment": "啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
            "date": "2017-08-03 11:14:31",
            "author": "zxc111",
            "status": "1"
        },{
            "_id": "5982951700d6960df4180b71",
            "id": "1f1e862e-7b29-46e5-834b-e6f3ec3d21bf",
            "commentator": "zxc11d1",
            "comment": "大傻逼啊",
            "date": "2017-08-03 11:14:31",
            "author": "zxc11d1",
            "status": "1"
        },{
            "_id": "5982951700d6960df4180b71",
            "id": "1f1e862e-7b29-46e5-834b-e6f3ec3d21bf",
            "commentator": "zxc111",
            "comment": "哦",
            "date": "2017-08-03 11:14:31",
            "author": "zxc111",
            "status": "1"
        }
    ],
    "dailyCss": {
        "_id": "5982941b00d6960df4180b6b",
        "username": "zxc111",
        "content": "现在是中午",
        "date": "2017-08-03 11:10:19",
        "id": "1f1e862e-7b29-46e5-834b-e6f3ec3d21bf"
    },
    "msg": "成功查看评论"
};
// var username = check.dailyCss.username;
// tpl.push({
// 	username: username
// }); 
// drawComment(check.data);
// tpl.pop(); 



$(document).ready(function(){

// 渲染daily-css	
	function drawDC(data,where,hasIcon){
		var dailyTem = `
			<p class="init-text"> {{ a }} </p>

			{{ if hasIcon }}
			<span class="favour-dc"></span>
			<span class="detail-dc"></span>
			{{ else }}

			{{ fi }}
		`;

		var dailyRender = tpl.fromStr(dailyTem);

		var copy = JSON.stringify(data); 
		copy = JSON.parse(copy); 
		copy.hasIcon = hasIcon; 

		var result = dailyRender(copy);

		$(where).html(result);
	}


	test = {
		a: '解好回复都受到世界各地是个电视剧世界各地是个电是个电视剧解不开高速公路上你了离开国欢可能你也好回复都受到世界各地是个电视剧解不开高速公路上你了离开国欢可能你也好回复都受到世界各地是个电视剧解不开高速公路上你了离开国欢可能你也好回复都受到世界各地是个电视剧到世界各地是个电视剧解不开高速公路上你了离开国欢可能你也好回复都受到世界各地是个电视剧',
		b: 'fsfsfs'
	};

// true or false是判断是否加图标的参数
	drawDC(test,$('.daily-css'),true);

	drawDC(test,$('.show-dc'),false);

// 整个主界面
	var dcContainer = $('.main-container');
// 主界面的dc
	var dc = $('.daily-css');
// 主界面的收藏夹
	var dcFavour = $('.dc-favours');
// 主界面的书签
	var nav = $('.nav');

	var textarea = $('.main-container textarea');
	var submitBtn = $('.submit-btn');
	var dcTxt = $('.daily-css p');
// 详情页
	var detail = $('.show-detail');

// 主界面中dc的两个按钮
	var favourBtn = $('.favour-dc');
	var detailBtn = $('.detail-dc');

// 收藏夹中的两个按钮
	var deleteBtn = $('.favour-delete');
	var favourDetailBtn = $('.favour-detail');

// 详情页中发送评论的按钮
	var commentBtn = $('.submit-comment');


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
		showInput(hideTxt,toMain);
	});


// 由输入界面返回主界面
	function toMain(){
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



	// 主界面跳转至详情页
	function toDetail(){
		// 隐藏主界面
		dcContainer.addClass('hide-main');
		nav.addClass('hide-nav');
		// 显示详情页
		detail.removeClass('hide-detail');
		// 渲染评论
		var username = check.dailyCss.username;
		tpl.push({
			username: username
		}); 
		drawComment(check.data);
		tpl.pop();
	}
	favourDetailBtn.click(toDetail);

	// 评论区中将滚动条拉至底部
	function scroll(){
		$('.comment-container').scrollTop($('.comment-container').height());
	}


	// 详情页中发送评论
	function comment(){
		var commentTxt = $('.show-input').val();
		scroll();
	}
	commentBtn.click(comment);
	// console.log($('.comment-container').scrollTop);

});






















