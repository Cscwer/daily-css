


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


// 
function addCover(){
	$('.nav').css('display','none');
	$('.main-container').addClass('hide-main');
}
function removeCover(){
	$('.nav').css('display','flex');
	$('.main-container').removeClass('hide-main');
}




// $(document).ready(function(){

// 渲染daily-css	
	function drawDC(data,where,hasIcon){
		var dailyTem = `
			<p class="init-text"> {{ a }} </p>
			<div class="choose"></div>
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

	// true or false是判断是否加图标的参数
	drawDC(test,$('.daily-css'),true);
	drawDC(test,$('.show-dc'),false);









	// 渲染收藏夹
	function drawFavours(favorite){
		var favourTem = `
			{{ get (item, idx) >>>> list }}
				<div class="favour-container">
					<div class="dc-favour"> {{ item.theContent }} </div>
					<div class="{{ addMask item.theContent }}"></div>
					<div data-id="{{ item.id }}" class="favour-delete"></div>
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
		{	"id" : "1f1e862e-7b29-46e5-834b-e6f3ec3d2dbf", 
			"username" : "honor", 
			"author" : "zxc111", 
			"theContent" : "吃吃吃吃" 
		},{	"id" : "1f1e862e-7b29-46e5-834b-e6f3ec3d21bf", 
			"username" : "honor", 
			"author" : "zxc111", 
			"theContent" : "睡睡睡睡" 
		},{	"id" : "1f1e862e-7b29-46e5-834b-e6f3ecfs21bf", 
			"username" : "honor", 
			"author" : "zxc111", 
			"theContent" : "打码打码" 
		},{	"id" : "1f1e862e-7b29-46e5-834b-e6f3ec3d2bf", 
			"username" : "honor", 
			"author" : "zxc111", 
			"theContent" : "现在是中午" 
		},{	"id" : "1f1e862e-7b29-46e5-83sf4b-e6f3ec3d21bf", 
			"username" : "honor", 
			"author" : "zxc111", 
			"theContent" : "两款卷发倒海翻江了" 
		},{	"id" : "1f1e862e-7b29-46e5-8adddd34b-e6f3ec3d21bf", 
			"username" : "honor", 
			"author" : "zxc111", 
			"theContent" : "发送；阿里还是感动" 
		},{	"id" : "1f162e-7b29-46e5-834b-e6f3ec3d21bf", 
			"username" : "honor", 
			"author" : "zxc111", 
			"theContent" : "现在是中午现在是中午现在是中午现在是中午现在是中午现在是中午现在是中午现在是中午现在是中午现在是中午现在是中午现在是中午现在是中午现在是中午现在是中午现在是中午现在是中午现在是中午现在是中午现在是中午现在是中午现在是中午现在是中午现在是中午现在是中午现在是中午现在是中午现在是中午现在是中午现在是中午现在是中午现在是中午现在是中午现在是中午现在是中午现在是中午" 
		},
		
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
        },{
            "_id": "5982951700d6960df4180b71",
            "id": "1f1e862e-7b29-46e5-834b-e6f3ec3d21bf",
            "commentator": "zxc111",
            "comment": "fsdjsh哦",
            "date": "2017-08-03 11:14:31",
            "author": "zxc111",
            "status": "1"
        },{
            "_id": "5982951700d6960df4180b71",
            "id": "1f1e862e-7b29-46e5-834b-e6f3ec3d21bf",
            "commentator": "zxcs111",
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




// 收藏dc
function favourIt() {
	// 渲染时把id写在html里
	// 
	// 等下这里重写，根据id来查找收藏了哪条dc
	// 
	// 
	var ss = $(this).siblings('.init-text').text();
	var ccc = {
		'username': 'ssssss',
		'id': 'e6f3ec3d21bf',
		'author': 'dsada',
		'theContent': ss,
		'commentator': 'dsada'
	}
	fuck.unshift(ccc);
	drawFavours(fuck);
	// 在收藏之后刷新变量，并需要重新注册点击事件
	deleteBtn = $('.favour-delete');
	favourDetailBtn = $('.favour-detail');
	// 再次注册点击事件
	deleteBtn.click(deleteDC);
	favourDetailBtn.click(toDetail);
}

// 用户的登录状态，true为已登录
	var userState = true;




// 主界面右上角的登录状态
	function drawUser(state){
		if (state) {
			// <span class="triangle"></span>
			var userTem = `
				<span class="image"></span>
				<span class="txt">James</span>
				<span class="news">您收到评论（0）</span>
		`
		}else{
			var userTem = `
			<span class="login-in">登录／注册</span>
		`
		}
		$('.user-container').html(userTem);
	}
	drawUser(userState);






// 整个主界面
	var dcContainer = $('.main-container');
// 主界面的dc
	var dc = $('.daily-css');
// 主界面的收藏夹
	var dcFavour = $('.dc-favours');
// 主界面的书签
	var nav = $('.nav');

	var textarea = $('.main-container textarea');
// 发送dc的按钮
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
// 详情页右上角的x
	var cross = $('.cross');
// 详情页中发送评论的按钮
	var commentBtn = $('.submit-comment');
// 当前textarea的状态，false说明尚未展开成输入界面
	var dcState = false;


// 当字数过多时，在显示时做隐藏
	function hideTxt(){
		if (dcTxt.text().length > 140) {
			dc.append('<div class="mask"></div>');
		}
	}


	var more = $('.choose');

// 显示输入界面
	function showInput(CB1,CB2){
		if (dcState == false) {
			dc.removeClass('dc-background');
			dcFavour.addClass('hide-favours');
			dc.addClass('final-dc');
			textarea.addClass('final-textarea');
			dcTxt.removeClass();
			dcTxt.addClass('final-text');
			submitBtn.removeClass('hide-ele');
			favourBtn.removeClass();
			detailBtn.removeClass();
			more.addClass('more');
			dcState = true;
			CB1();
// 失去焦点时判断输入框的值是否为空
			textarea.blur(() => {
				if (textarea.val() == "") {
					CB2();
				}else{}
			});
// 点击更多的图标返回主界面并清空输入框
			if ($('.daily-css div')) {
				$('.daily-css div').click(() => {
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
		if (dcState == true) {
			submitBtn.addClass('hide-ele');
			textarea.removeClass('final-textarea');
			dcTxt.addClass('init-text');
			dc.removeClass('final-dc');
			dc.addClass('dc-background');
			favourBtn.addClass('favour-dc');
			detailBtn.addClass('detail-dc');
			dcFavour.removeClass('hide-favours');
			more.removeClass('more');
			if ($('.daily-css .mask')) {
				$('.daily-css .mask').remove();
			}else{}
			dcState = false;
		}
	}



// 主界面跳转至详情页
	function toDetail(){
		// 隐藏主界面
		// dcContainer.addClass('hide-main');
		// nav.addClass('hide-nav');
		addCover();
		// 显示详情页
		detail.removeClass('hide-detail');
		// 保证先删除类名，再加类名才可以触发transition
		setTimeout(e => detail.addClass('slide-to-detail'),2);


		$('.show-detail').after('<div class="cover "></div>');


		// 渲染评论
		var username = check.dailyCss.username;
		tpl.push({
			username: username
		}); 
		drawComment(check.data);
		tpl.pop();
		scroll();
	}
// 收藏夹中的详情按钮
	favourDetailBtn.click(toDetail);
// 主界面中的详情按钮
	detailBtn.click(toDetail);



// 详情页跳转至主界面
	function detail2main(){
		dcContainer.removeClass('hide-main');
		nav.removeClass('hide-nav');
		detail.removeClass('slide-to-detail');
		$('.cover').remove();
		removeCover();
// 发送评论后清空输入框
		$('.show-input').val('');
	}
	cross.click(detail2main);





// 查找被删除dc在数组中的索引
	function find(id,array){
		return array.reduce((acc,cur, idx) => {
			if (cur.id === id) {
				return idx;
			} else {
				return acc;
			}
		}, 0);
	}

// 删除收藏的dc
	function deleteDC(){
		var whichFavour = $(this).parent('.favour-container');
		whichFavour.addClass('delete-dc');
		whichFavour.bind('webkitTransitionEnd',e => {
			whichFavour.remove();
			deleteBtn = $('.favour-delete');
			favourDetailBtn = $('.favour-detail');
		});
// 利用查找到的索引值来删除数据
		var deleted = find($(this).attr('data-id'),fuck);
		fuck.splice(deleted,1);
	}
	deleteBtn.click(deleteDC);

// 评论区中将滚动条拉至底部
	function scroll(){
		$('.comment-container').scrollTop(999999);
	}


// 详情页中发送评论
	function comment(){
		var commentTxt = $('.show-input').val();

// 输入内容为空时退出函数
// 正则表达式，当内容全为空格时退出
		var reg = /^\s+$/g;
		if (reg.test(commentTxt) || commentTxt == '') {
			return false;
		}
		var comments = {
			'comment': commentTxt,
			'commentator': 'zxc111',
			'author': 'zxc111'
		}
// 将所发评论push到数据中
		check.data.push(comments);

		var username = check.dailyCss.username;
		tpl.push({
			username: username
		});
		drawComment(check.data);
		tpl.pop();
// 发送评论后将评论框拉至底部
		scroll();
// 发送评论后清空输入框
		$('.show-input').val('');
	}
	commentBtn.click(comment);

// 回车发送评论
	$('.show-input').focus(a => {
		$('.show-input').keydown(event => {
			if (event.which == 13) {
				event.preventDefault();
				comment();
			}
		});
	});

// 收藏dc
favourBtn.click(favourIt);




// });



