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
// 用户的登录状态，true为已登录
	var userState = window.localStorage.getItem("userState");
// 首页请求时返回的数据
	var favourDC;
	var dailyCSS;
	var comments;
	var username;

	var username = window.localStorage.getItem("username");

	// function getRandomNum(min,max){
	// 	var range = max - min;
	// 	var randNum = Math.random();
	// 	return (min + Math.round(range * randNum));
	// }
	// $('.main').css("background-image","url(../images/background" + getRandomNum(0,10) + ".jpg)");

// 渲染首页时注册事件
	function reset(){
		// 渲染dc,参数为是否加图标
		drawDC(dailyCSS,$('.daily-css'),true);
		// 渲染收藏夹
		drawFavours(favourDC);
		// 首页按钮功能
		detailBtn = $('.detail-dc');
		deleteBtn = $('.favour-delete');
		favourDetailBtn = $('.favour-detail');
		favourBtn = $('.favour-dc');
		detailBtn.click(toDetail);
		favourDetailBtn.click(toDetail);

		deleteBtn.click(function(){
			deleteDC.call(this,favourDC);
		});
		// favourBtn.click(favourIt);
		favourBtn.click(() => {
			favourIt(dailyCSS,favourDC);
		});
	}
	// 用于判断当前的dc是否被收藏
	function favourState(){
		var favoured = favourDC.filter(e => {
				return e.id == dailyCSS.id;
			});
			if (favoured.length != 0){
				favourBtn.css("background-image","url(../images/favoured.jpg)");
			} else {
				favourBtn.css("background-image","url(../images/favour.png)");
			}
	}


	http.get('/',
		{},
		// 请求成功时的回调函数
		function(res){
			// if (res.favorite.length < 5) {
			// 	console.log(2222);
			// 	favourDC = res.favorite.reverse();
			// }
			favourDC = res.favorite.reverse();
			dailyCSS = res.dailyCss;
			// username = window.localStorage.getItem("username");
			console.log(username);
			reset();

			favourState();
			// drawUser(userState);

			// console.log(username);
		},
		// 请求失败的回调函数
		function(err){
			console.log('err',err);
		});



function addCover(){
	$('.nav').css('display','none');
	$('.main-container').addClass('hide-main');
}
function removeCover(){
	$('.nav').css('display','flex');
	$('.main-container').removeClass('hide-main');
}





// 当字数过多时，在显示时做隐藏
	function hideTxt(){
		if (dcTxt.text().length > 140) {
			dc.append('<div class="mask"></div>');
		}
	}



// 渲染daily-css	
	function drawDC(data,where,hasIcon){
		var dailyTem = `
			<p class="init-text"> {{ content }} </p>
			<div class="choose"></div>
			{{ if hasIcon }}
			<span data-id="{{ id }}" class="favour-dc"></span>
			<span data-id="{{ id }}" class="detail-dc"></span>
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






	// 渲染收藏夹
	function drawFavours(favorite){
		var favourTem = `
			{{ get (item, idx) >>>> list }}
				<div class="favour-container">
					<div class="dc-favour"> {{ item.content }} </div>
					<div class="{{ addMask item.content }}"></div>
					<div data-id="{{ item.id }}" class="favour-delete"></div>
					<div data-id="{{ item.id }}" class="favour-detail"></div>
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





// 渲染详情页的评论
function drawComment(comments){
	var commentTem = `
		{{ get (item, idx) >>>> list }}
			<div class="{{ judge item.commentator username }}">
				<div class="user-pic"></div>
				<div class="user-comment">{{ item.comment }}</div>
			</div>
		{{ teg }}
	`
	var commentRender = tpl.fromStr(commentTem);
	var result = commentRender({
		list: comments,
		username: username,
		judge: (commentator,username) => {
			console.log(username);
			return commentator === username ? 'comment-self' : 'comment-others'
		}
	});
	$('.comment-container').html(result);
}



// 收藏dc
function favourIt(data,favourite) {
	http.get(
		"/user/dailycss/collect",
		"id=" + data.id,
		function(res){
			if (res.code === 200) {
				favourite.unshift(data);
				drawFavours(favourite);
				// 在收藏之后刷新变量，并需要重新注册点击事件
				deleteBtn = $('.favour-delete');
				favourDetailBtn = $('.favour-detail');
				// 再次注册点击事件
				deleteBtn.click(function(){
					deleteDC.call(this,favourDC);
				});
				favourDetailBtn.click(toDetail);
				// 点击收藏后收藏图标变化
				favourState();
			} else {
				alert("已收藏");
			}
		},
		function(err){
			console.log(res.code);
		}
	);
}

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
	function deleteDC(favourite){
		var whichFavour = $(this).parent('.favour-container');
		var deleted = find($(this).attr('data-id'),favourite);
		http.get(
			"/user/dailycss/delete",
			"id=" + $(this).attr('data-id'),
			function(res){
				if (res.code === 200) {
					whichFavour.addClass('delete-dc');
					whichFavour.bind('webkitTransitionEnd',e => {
						whichFavour.remove();
						deleteBtn = $('.favour-delete');
						favourDetailBtn = $('.favour-detail');
					});
					// 利用查找到的索引值来删除数据
					favourite.splice(deleted,1);
					// 删除后收藏按钮颜色变化
					favourState();
				}
			},
			function(err){
				console.log(err.code);
			}
		);

	}





// 提交daily css
	function submit(){
		var val = textarea.val();
		console.log(username);
		http.post(
			"/user/dailycss/submit",
			{
				dailycss: val
			},
			function(res){
				if (res.code === 200) {
					toMain();
					textarea.val('');
				}
			},
			function(err){
				console.log(err.code);
			}
		);
	}

	submitBtn.click(submit);




// 主界面右上角的登录状态
	function drawUser(state){
		var userTem = `
			{{ if state }}
				<span class="image"></span>
				<span class="txt">{{ username }}</span>
				<span class="news">您收到评论（0）</span>
			{{ else }}
				<span class="login-in">登录／注册</span>
			{{ fi }}
		`
		var userRender = tpl.fromStr(userTem);
		var result = userRender({
			username: username,
			state: userState
		});


		// if (state) {
		// 	// <span class="triangle"></span>
		// 	var userTem = `
		// 		<span class="image"></span>
		// 		<span class="txt">{{ username }}</span>
		// 		<span class="news">您收到评论（0）</span>
		// `
		// }else{
		// 	var userTem = `
		// 	<span class="login-in">登录／注册</span>
		// `
		// }

		$('.user-container').html(result);
	}
	drawUser(userState);








// 显示输入界面
	function showInput(CB1,CB2){
			var more = $('.choose');
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
			var more = $('.choose');
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
		var id = $(this).attr('data-id');
		http.get(
			"/user/comment",
			"id=" + id,
			function(res){
				if (res.code === 200) {
				comments = res.data;
				console.log(res);
				drawDC(res.dailyCss,$('.show-dc'),false);
				// 隐藏主界面
				addCover();
				// 显示详情页
				detail.removeClass('hide-detail');
				// 保证先删除类名，再加类名才可以触发transition
				setTimeout(e => detail.addClass('slide-to-detail'),20);
				$('.show-detail').after('<div class="cover "></div>');
				// 渲染评论
				drawComment(comments);
				commentBtn.attr("data.id",id);

				// tpl.pop();
				scroll();
				}
			},
			function(err){
				console.log(err.code);
			}
		);

	}







// 详情页跳转至主界面
	function detail2main(){
		dcContainer.removeClass('hide-main');
		nav.removeClass('hide-nav');
		detail.removeClass('slide-to-detail');
		$('.cover').remove();
		removeCover();
		commentBtn.attr("data.id","");
// 发送评论后清空输入框
		$('.show-input').val('');
	}
	cross.click(detail2main);






// 评论区中将滚动条拉至底部
	function scroll(){
		$('.comment-container').scrollTop(999999);
	}



// 详情页中发送评论
	function comment(){
		var commentTxt = $('.show-input').val();
		var id = commentBtn.attr("data.id");
		var comment = {};
		http.post(
			"/user/comment/add" + "?id=" + id,
			{
				comment: commentTxt,
				id: id
			},
			function(res){
				if (res.code === 200) {
					// 输入内容为空时退出函数
					// 正则表达式，当内容全为空格时退出
					var reg = /^\s+$/g;
					if (reg.test(commentTxt) || commentTxt == '') {
						return false;
					}
					// 将所发评论push到数据中并重新渲染
					comment = {
						commentator: username,
						comment: commentTxt
					}
					console.log(username);
					comments.push(comment);
					console.log(comments);
					drawComment(comments);
					// 发送评论后将评论框拉至底部
					scroll();
					// 发送评论后清空输入框
					$('.show-input').val('');
				}
			},
			function(err){
				console.log(err.code);
			}
		);
	}

	commentBtn.click(comment);

	$('.show-input').keydown(function(){
		if (event.which == 13) {
			event.preventDefault();
			comment();
		}
	});






