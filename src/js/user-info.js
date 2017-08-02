// user-info.js

// function getUser() {
// 	var name = $(".login-user").val();
// 	var pwd = $(".login-pass").val();	
// 	if(name.length === 0) {
// 		alert("请输入用户名！");
// 		return false;
// 	}
// 	return {
// 		username: name,
// 		pwd: pwd
// 	}
// }

// function login() {
// 	var user = getUser();
// 	if(!user) {
// 		return;
// 	}
// 	$.ajax({
// 		url: "http://192.168.0.112:3000/login/login",
// 		type: "POST",
// 		data: user,
// 		dataType: "json",
// 		success: function(res) {
// 			console.log(res);
// 			if(res.code === 403) {
// 				$(".login-prove").css("display","block");
// 				$(".login-user").val("");
// 				$(".login-pass").val("");
// 			}
// 		},
// 		error: function(xhr, err, type) {
// 			console.log(xhr);
// 			console.log(err);
// 			console.log(type);
// 		}
// 	})
// }

// $(".login-log").click(login);


/*渲染头像名字博客地址*/
function userInfoHeader(data){
	var t = `
            {{ get (item, idx) >>>> list1 }}

                <div class="user-info-header-head">
                    <div class="header-change">
                        <p>更换头像</p>
                    </div>
                </div>	
                <div class="user-info-header-name">{{item.name}}</div>
                <div class="user-info-header-blog"><a href="https://{{item.blog}}" target="_blank"><input value="{{item.blog}}" spellcheck="false"></a></div>

			{{ teg }}
	`; 

	var render = tpl.fromStr(t); 

	var result = render(data); 

	$('.user-info-header').html(result);
}
userInfoHeader({
    list1: [{
        name: 'Caster',
        head: 'url',
        blog: 'matteokjh.github.io'

    }]
})

//博客地址失焦
$('.user-info-header-blog input').attr("readOnly",'true');


//渲染memo备忘录.
function initUserMemo(data){
    var t = `
        {{ get (item, idx) >>>> list2}}
            <form todo-id="" class="paper{{idx}}" action ="" method="POST">
                <input class="memo-title" type="text" name="memo-title{{idx}}" value="{{ item.title }}" maxlength="4" spellcheck="false">
                <textarea type="text" name="memo-sheet{{idx}}" spellcheck="false" maxlength="60">{{item.content}}</textarea>
            </form>
        {{teg}}
    `;
    var render = tpl.fromStr(t); 

	var result = render(data); 

	$('.user-info-memo').html(result);

    $('.memo-title').change(function(){
        // check(); 
        var regC = /[^ -~]+/g; 
        var regE = /\D+/g; 
        var val = this.value; 

        if (regC.test(val)){
            this.value = this.value.slice(0, 2); 
        } else if (regE.test(val)){
            this.value = this.value.slice(0, 4); 
        } else {
            this.value = this.value.slice(0, 4); 
        }


    });
}

initUserMemo({
    list2: [
        {
            title: '周一', 
            content: '周二'
        },
        {
            title: '上午', 
            content: '下午'
        },
        {
            title: '我是', 
            content: '你爸爸'
        },
        {
            title: '铁狼', 
            content: '暴民'
        },
        {
            title: '自爆', 
            content: '指刀'
        }
    ]
})
var memoTitle = $('.user-info-memo form input');
var memoSheet = $('.user-info-memo form textarea');
memoTitle.attr("readOnly",'true');//初始状态
memoTitle.eq(0).addClass("title-press");
memoSheet.eq(0).addClass("text-show");


//单击事件
memoTitle.click(function(){
    $(this).addClass('title-press');
    $(this).parent('form').siblings().find("input").removeClass('title-press');//找的好辛苦.
    $(this).siblings().addClass('text-show');
    $(this).parent('form').siblings().find("textarea").removeClass('text-show');
})

//双击事件
memoTitle.dblclick(function(){
    $(this).removeAttr("readOnly");
});

//失焦事件
memoTitle.blur(function(){
    $(this).attr("readOnly",'true');
})



//渲染自己发过的6条daily css.
function initUserInfo(data){
	var t = `

            {{ get (item, idx) >>>> list3 }}
			<div class="user-info-article">{{item}}</div>
            <div class="user-info-article-mask"></div>
			{{ teg }}

	`; 

	var render = tpl.fromStr(t); 

	var result = render(data); 

	$('.user-info-post').html(result);
}
initUserInfo({
    list3: [
        'Sirius: But know this; the ones that love us never really leave us. And you can always find them in here.',
        'Remus Lupin: You"re blinded by hatred.',
        'Do not pity the dead, Harry. Pity the living. And above all, all those who live without love.',
        'Sirius Black: The world isn"t split into good people and Death Eaters. We"ve all got both light and dark inside us. What matters is the part we choose to act on. That"s who we really are.',
        'The last enemy that shall be destroyed is death.',
        '"After all this time?","Always",said Snape.'
          ]
})


/*消息提醒开关按钮*/
$('.switch-iphone').click(function(){
    $('.switch-circle').hasClass('btn-off') ? 
    ( $('.switch-circle').removeClass('btn-off') , $('.switch-iphone').removeClass('green-off') ) : 
    ( $('.switch-circle').addClass('btn-off') , $('.switch-iphone').addClass('green-off') )  ;
});

/*右下角设置按钮修改博客地址*/
$('.user-info-setting').click(function(){
    $('.user-info-header-blog a').attr('href','#');
    $('.user-info-header-blog a').attr('target','_self');
    $('.user-info-header-blog input').removeAttr("readOnly");
    $('.user-info-header-blog input').focus();
})//点击激活input并取消跳转
$('.user-info-header-blog input').blur(function(){
    var newBlog = 'https://'+$('.user-info-header-blog input').val();
    $(this).attr("readOnly",'true');
    $('.user-info-header-blog a').attr('href',newBlog);
    $('.user-info-header-blog a').attr('target','_blank');

})//失焦还原

/*在线人数*/

/*渲染*/
function onlineShow(data){
	var t = `
            {{ get (item, idx) >>>> list4 }}
                <div class="user-info-header-head-onlist"></div>	
                <div class="user-info-header-name-onlist">{{item.name}}</div>
                <div class="user-info-header-blog-onlist"><a href="https://{{item.blog}}" target="_blank">{{item.blog}}</a></div>
            {{ teg }}
	`; 

	var render = tpl.fromStr(t); 

	var result = render(data); 

	$('.online-list').html(result);
}
onlineShow({
    list4:[
        {
        name: 'Caster',
        head: 'url',
        blog: 'matteokjh.github.io'
    },
    {
        name: 'Caster',
        head: 'url',
        blog: 'matteokjh.github.io'
    },
    {
        name: 'Caster',
        head: 'url',
        blog: 'matteokjh.github.io'
    },
    {
        name: 'Caster',
        head: 'url',
        blog: 'matteokjh.github.io'
    },
    {
        name: 'Caster',
        head: 'url',
        blog: 'matteokjh.github.io'
        }
    ]
})


/*单击事件*/
$('.user-info-online p').click(function(){
    if( $('.online-list').hasClass('on') ){
        $('.online-list').removeClass('on')
        $('.user-info-header-head').removeClass('online-header');
    }else {
        $('.online-list').addClass('on');
        $('.user-info-header-head').addClass('online-header');
    }
})