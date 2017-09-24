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


// var msgOn;
// console.log(msgOn);


$(function(){

    var userBlog = "";
    var headerChange = $('.header-change');
    var newTitle=new Array;
    var newMemo = new Array;

    $('.favour-detail').click(e => {
        if($('.user-info').hasClass('card-show')){
            $('.image').trigger('click');
        }
    });

    function addCover(){
        $('.nav').css('display','none');
        $('.main-container').addClass('hide-main');
    }

    function removeCover(){
        $('.nav').css('display','flex');
        $('.main-container').removeClass('hide-main');
    }

    function Adjust(){
        
        //博客地址失焦
        $('.user-info-header-blog input').attr("readOnly",'true');
        // memoTitle.attr("readOnly",'true');//初始状态
        // memoTitle.eq(0).addClass("title-press");
        // memoSheet.eq(0).addClass("text-show");



        // //备忘录单击事件
        // memoTitle.click(function(){
        //     $(this).addClass('title-press');
        //     $(this).parent('form').siblings().find("input").removeClass('title-press');//找的好辛苦.
        //     $(this).siblings().addClass('text-show');
        //     $(this).parent('form').siblings().find("textarea").removeClass('text-show');
        // })

        // //备忘录标签双击事件
        // memoTitle.dblclick(function(){
        //     $(this).removeAttr("readOnly");
        // });

        // //失焦事件，发送
        // memoTitle.blur(function(){
        //     $(this).attr("readOnly",'true');
        // })

        /*消息提醒开关按钮*/
        $('.switch-iphone').click(function(){
            $('.switch-circle').hasClass('btn-off') ? 
            ( $('.switch-circle').removeClass('btn-off') , $('.switch-iphone').removeClass('green-off') ) : 
            ( $('.switch-circle').addClass('btn-off') , $('.switch-iphone').addClass('green-off') )  ;

            // if($('.switch-circle').hasClass('btn-off')){
            //     localStorage.msgOn = 'false';
            // } else {
            //     localStorage.msgOn = 'true';
            // }
            // msgOn = localStorage.msgOn;
            // console.log(msgOn);
            


        });

        /*右下角设置按钮修改博客地址*/
        $('.user-info-setting').click(function(){
            $('.user-info-header-blog a').attr('href','#');
            $('.user-info-header-blog a').attr('target','_self');
            $('.user-info-header-blog input').removeAttr("readOnly");
            $('.user-info-header-blog input').focus();
        })//点击激活input并取消跳转(发送)
        $('.user-info-header-blog input').blur(function(){
            var newBlog = 'https://'+$('.user-info-header-blog input').val();
            $(this).attr("readOnly",'true');
            $('.user-info-header-blog a').attr('href',newBlog);
            $('.user-info-header-blog a').attr('target','_blank');

        })

        $('.user-info-article').click(function(){
            toDetail();
            $('.image').trigger('click');
        });

        $('.header-change').click(function(){
            console.log("bbbbbb");
            $('.image').trigger('click');
            $('.show-detail').after('<div class="cover "></div>');
            $container.fadeIn();
            addCover();
        });

    }


    /****************渲染自己****************/

    /*名字和博客地址*/
    http.get(
            "/user/person/personaldetail",
           {},
           function (res){
               console.log(res);
               userBlog = res.data.blog;
               console.log(userBlog);
               drawBlog();
               Adjust();
           },
           function (err){}
    )
    /***************/


    // http.get(//头像
    //     "/user/files/getfiles",
    //     {
    //         "username":[
    //             "night"
    //         ]
    //     },
    //     function (res){
    //         console.log(res);
    //         userBlog = res.data;
    //         console.log(userBlog);
    //         drawHead();
    //     },
    //     function (err){}
    // )
    // http.post(//上传头像
    //     "/user/files/upload",
    //     {},
    //     function (res){},
    //     function (err){}
    // )

    /*备忘录*/
    http.get(
        "/user/person/memo",
        {},
        function(res){
            console.log(res);
            res.data.forEach(function(e) {
                newTitle[e.id-1] = e.time;
            });
            res.data.forEach(function(e) {
                newMemo[e.id-1] = e.thing;
            });

            initUserMemo({
                list2: [
                    {
                        title: newTitle[0], 
                        content: newMemo[0]
                    },
                    {
                        title: newTitle[1], 
                        content: newMemo[1]
                    },
                    {
                        title: newTitle[2], 
                        content: newMemo[2]
                    },
                    {
                        title: newTitle[3], 
                        content: newMemo[3]
                    },
                    {
                        title: newTitle[4], 
                        content: newMemo[4]
                    }
                ]
            })
            var memoTitle = $('.user-info-memo form input');
            var memoSheet = $('.user-info-memo form textarea');
            memoTitle.attr("readOnly",'true');//初始状态
            memoTitle.eq(0).addClass("title-press");
            memoSheet.eq(0).addClass("text-show");
            //备忘录单击事件
            memoTitle.click(function(){
                $(this).addClass('title-press');
                $(this).parent('form').siblings().find("input").removeClass('title-press');//找的好辛苦.
                $(this).siblings().addClass('text-show');
                $(this).parent('form').siblings().find("textarea").removeClass('text-show');
            })

            //备忘录标签双击事件
            memoTitle.dblclick(function(){
                $(this).removeAttr("readOnly");
            });

            //失焦事件，发送
            memoTitle.blur(function(){
                console.log(this.name);
                // http.post(
                //     "/user/person/memo",
                //     {
                //         "time" : "this.value"
                //     },
                //     function(res){console.log(res);},
                //     function(err){}
                // )
                $(this).attr("readOnly",'true');
            })
        },
        function(err){}
    )
    /************************************/



    http.get(
        
    )


    
    /*个人资料卡左右移动*/
    $('.user-info').css('opacity',0);
    $('.image').click(function(){
        console.log(1);
        if( $('.user-info').hasClass('card-show') ){
            $('.user-info').css('opacity',0);
            $('.user-info').css('margin-right', '-20%');
            $('.user-info').removeClass('card-show');
        }else {
            $('.user-info').css('opacity',1);
            $('.user-info').addClass('card-show');
            $('.user-info').css('margin-right', 0);
        }
    })


    /***********************以下为用户个人模板****************************/
    //头像模板
    function userInfoHeader(data){
        var t = `
                {{ get (item, idx) >>>> list1 }}
                <div class="user-info-header-head">
                    <img src="{{item.head}}" class="portrait master"/>
                    <div class="header-change">
                        <p>更换头像</p>
                    </div>
                </div>	
                <div class="user-info-header-name">{{item.name}}</div>
                <div class="user-info-header-blog"><a href="https://{{item.blog}}" target="_blank"><input value="{{item.blog}}" spellcheck="false" class="blog-line"></a></div>
                {{ teg }}
        `; 

        var render = tpl.fromStr(t); 

        var result = render(data); 

        $('.user-info-header').html(result);
    }
    //memo备忘录模板.
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
    /****************自己发过的6条daily css模板****************/
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
    //底部按钮模板
    function infoBottom(data){
        var t = `

                <div class="user-info-remind">
                    <div class="user-info-clear"><p>清除通知</p></div>
                    <div class="user-info-switch">
                        <p>消息提醒</p>
                        <div class="switch-iphone">
                            <div class="switch-circle"></div>
                        </div>
                    </div>
                </div>

                {{ get (item) >>>> num }}
                <div class="user-info-online">
                    <p>在线人数: {{item}}人<span class="online-list-btn"></span></p>
                    <span class="user-info-setting"></span>
                    <div class="online-list off"></div>
                </div>
                {{ teg }}
        `; 

        var render = tpl.fromStr(t); 

        var result = render(data); 

        $('.user-info-bottom').html(result);
    }
    function onlineShow(data){

        var t = `
                {{ get (item, idx) >>>> list4 }}
                <div class="user-info-header-onlist">
                    <div class="user-info-header-head-onlist"><img src="images/{{item.head}}.png" class="portrait"/></div>	
                    <div class="user-info-header-name-onlist">{{item.name}}</div>
                    <div class="user-info-header-blog-onlist"><a href="https://{{item.blog}}" target="_blank" title="{{item.blog}}">{{item.blog}}</a></div>
                </div>
                {{ teg }}
        `; 

        var render = tpl.fromStr(t); 

        var result = render(data); 

        $('.online-list').html(result);

    }
    /*******************************************************************************/


    
    /*********************************渲染自己函数***********************************/
    function drawBlog(){
        console.log(userBlog);
        //头部
        userInfoHeader({
            list1: [{
                name: username,
                head: '../images/caster.png',
                blog: userBlog
            }]
        })
    }
        
        
    // 备忘录
    // initUserMemo({
    //     list2: [
    //         {
    //             title: '周一', 
    //             content: '吃鸡'
    //         },
    //         {
    //             title: '上午', 
    //             content: '睡觉'
    //         },
    //         {
    //             title: '我是', 
    //             content: '你爸爸'
    //         },
    //         {
    //             title: '铁狼', 
    //             content: '自爆'
    //         },
    //         {
    //             title: '顺德', 
    //             content: '身份证，羊城通，UNO'
    //         }
    //     ]
    // })
    //DC
    // initUserInfo({
    //     list3: [
    //         ['Sirius: But know this; the ones that love us never really leave us. And you can always find them in here.'],
    //         ['Remus Lupin: You"re blinded by hatred.'],
    //         ['Do not pity the dead, Harry. Pity the living. And above all, all those who live without love.'],
    //         ['Sirius Black: The world isn"t split into good people and Death Eaters. We"ve all got both light and dark inside us. What matters is the part we choose to act on. That"s who we really are.'],
    //         ['The last enemy that shall be destroyed is death.'],
    //         ['"After all this time?","Always",said Snape.']
    //     ]
    // })

    //底部
    infoBottom({
        num: [13]
    })
    
    //在线人数列表
    onlineShow({
    slice: arr => arr.slice(1),
    
    list4:[
        {
        name: 'Caster',
        head: 'caster',
        blog: 'matteokjh.github.io'
    },
    {
        name: '友人A',
        head: 'angry',
        blog: 'www.bilibili.com'
    },
    {
        name: 'Assassin',
        head: 'assassin',
        blog: 'matteokjh.github.io'
    },
    {
        name: '女巫',
        head: 'deer',
        blog: 'matteokjh.github.io'
    },
    {
        name: '猎人',
        head: 'iriya',
        blog: 'matteokjh.github.io'
    },{
        name: '白痴',
        head: 'saber',
        blog: 'matteokjh.github.io'
    },{
        name: '丘比特',
        head: 'shy',
        blog: 'matteokjh.github.io'
    },{
        name: '守卫',
        head: 'siki',
        blog: 'matteokjh.github.io'
    },{
        name: '白狼王',
        head: 'archer',
        blog: 'matteokjh.github.io'
    },{
        name: '骑士',
        head: 'tsukihime',
        blog: 'matteokjh.github.io'
    },
    {
        name: 'Daenerys Targaren',
        head: 'typemoon',
        blog: 'www.rest.in.piece.fuckyou.coco'
    },
                {
                    name: 'Daenerys Targaren',
                    head: 'typemoon',
                    blog: 'www.rest.in.piece.fuckyou.coco'
                }
    ].slice(1)
    });

    // Adjust();//重新绑定事件

    /*在线人数单击事件*/
    $('.user-info-online p').click(onlineClick);
    $('.portrait').click(function(){
        onlineClick();
    });

    $('.header-change').click(function(){
        $('.image').trigger('click');
        $('.show-detail').after('<div class="cover "></div>');
            console.log(1234131);
        $container.fadeIn();
        addCover();
    })
    

        
    
    /*************************************************************************/



    function onlineClick(){
        console.log(1);
        if( $('.online-list').hasClass('on') ){
            $('.online-list').removeClass('on');
            $('.online-list').slideToggle('.3s');
            $('.online-list').css('padding-top', '5%');
            // $('.online-list').fadeOut('slow')
            $('.user-info-header-head').removeClass('online-header');
            setTimeout(function() {
                $('.header-change').css("display",'block'); 
                
            }, 1000);//这里处理的不好，更换头像遮罩层在好友跟自己切换的时候还是会位移.

        }else {
            $('.online-list').addClass('on');//显示
            $('.online-list').slideToggle('.3s');
            $('.online-list').css('padding-top', '5%');
            // $('.online-list').fadeIn('slow')
            $('.user-info-header-head').addClass('online-header');//动画
            $('.header-change').css("display",'none');//更改头像阴影去掉
        }


            /****************在线人数头像点击******************/
            $('.user-info-header-head-onlist img').click(function(){
                var theName = $(this).parent('.user-info-header-head-onlist').siblings('.user-info-header-name-onlist').text();
                var theBlog = $(this).parent('.user-info-header-head-onlist').siblings('.user-info-header-blog-onlist').children('a').text();
                if(theName === 'Caster'){
                    
                    $('.user-info-header-head').addClass('online-header');
                    $('.header-change').click(function(){
                        $('.image').trigger('click');
                        console.log('III');
                        $('.show-detail').after('<div class="cover "></div>');
                        $container.fadeIn();
                        addCover();
                    });

                }else {
                    friend({
                    //好友header
                    lamb1: [{
                        name: theName,
                        head: $(this).attr("src"),
                        blog: theBlog
                    }],
                    //好友memo
                    lamb2: [
                        {
                        title: '周二', 
                        content: '周二'
                    },{
                        title: '晚上', 
                        content: '睡觉'
                    },{
                        title: '你是', 
                        content: '狗吧'
                    },{
                        title: '暴民', 
                        content: '乱跳'
                    },{
                        title: '女巫', 
                        content: '救药'
                    }
                    ],
                    //好友DC
                    lamb3: [

                        ['没有低级的法术，只有低级的法师.'],
                        ['所谓强大就是：享受命运为你准备的每一道菜.'],
                        ['我原本以为，你与众不同.'],
                        ['我赌上了一切!就是为了走进一个别人的梦.'],
                        ['想做法师，哪怕是最蹩脚最愚蠢的法师——只要是法师就行了.'],
                        ['突然间想起你我初次相遇时的情形，那时的你一无所有，却强大的让我不敢抬头.']
                    ],
                    //在线人数
                    num2: [10],
                    lamb4: [
                        {
                        name: 'Caster',
                        head: 'caster',
                        blog: 'matteokjh.github.io'
                    },
                    {
                        name: 'Me',
                        head: 'angry',
                        blog: 'matteokjh.github.io'
                    },
                    {
                        name: 'Assassin',
                        head: 'assassin',
                        blog: 'matteokjh.github.io'
                    },
                    {
                        name: '女巫',
                        head: 'deer',
                        blog: 'matteokjh.github.io'
                    },
                    {
                        name: '猎人',
                        head: 'iriya',
                        blog: 'matteokjh.github.io'
                    },{
                        name: '白痴',
                        head: 'saber',
                        blog: 'matteokjh.github.io'
                    },{
                        name: '丘比特',
                        head: 'shy',
                        blog: 'matteokjh.github.io'
                    },{
                        name: '守卫',
                        head: 'siki',
                        blog: 'matteokjh.github.io'
                    },{
                        name: '白狼王',
                        head: 'archer',
                        blog: 'matteokjh.github.io'
                    },{
                        name: '骑士',
                        head: 'tsukihime',
                        blog: 'matteokjh.github.io'
                    },
                    {
                        name: 'Daenerys Targaren',
                        head: 'typemoon',
                        blog: 'www.rest.in.piece.fuckyou.coco'
                    },
                    {
                        name: 'Daenerys Targaren',
                        head: 'typemoon',
                        blog: 'www.rest.in.piece.fuckyou.coco'
                    }
                    ]

                });
                    /*好友memo*/
                    var memoOnlineTitle = $('.memo-online-title');
                    var memoOnlineSheet = $('.memo-online-sheet');
                    memoOnlineTitle.eq(0).addClass("title-press");
                    memoOnlineSheet.eq(0).addClass("text-show");
                    memoOnlineTitle.click(function(){
                        $(this).addClass('title-press');
                        $(this).parent('div').siblings().find("div").removeClass('title-press');//找的好辛苦.
                        $(this).siblings().addClass('text-show');
                        $(this).parent('div').siblings().find("textarea").removeClass('text-show');
                    });
                }
                $('.online-list').removeClass('on');
                $('.online-list').slideUp('.3s');
                $('.user-info-header-head').removeClass('online-header');

                
        });
    }



    /*渲染好友信息*/
    function friend(data){
        var t = `
            <div class="user-info-header">
                {{ get (item, idx) >>>> lamb1 }}
                <div class="user-info-header-head online-header">
                    <img src="{{item.head}}" class="portrait"/>
                </div>	
                <div class="user-info-header-name">{{item.name}}</div>
                <div class="user-info-header-blog"><a href="https://{{item.blog}}" target="_blank" class="blog-line">{{item.blog}}</a></div>
                {{ teg }}
            </div>

            <div class="user-info-memo">
                {{ get (item, idx) >>>> lamb2 }}
                <div>
                    <div class="memo-title memo-online-title" maxlength="4">{{ item.title }}</div>
                    <textarea class="memo-online-sheet" type="text" name="memo-sheet{{idx}}" maxlength="60" readOnly="true">{{item.content}}</textarea>
                </div>
            {{teg}}
            </div>

            <div class="user-info-post">
            {{ get (item, idx) >>>> lamb3 }}
                <div class="user-info-article">{{item}}</div>
                <div class="user-info-article-mask"></div>
            {{ teg }}
            </div>

            <div class="user-info-bottom">
                {{ get (item, idx) >>>> num2 }}
                <div class="user-info-online">
                    <p class="position-adjust">在线人数: {{item}}人<span class="online-list-btn"></span></p>
                    <div class="online-list off">
                        {{ get (item2, idx2) >>>> lamb4 }}
                        <div class="user-info-header-onlist">
                            <div class="user-info-header-head-onlist"><img src="images/{{item2.head}}.png" class="portrait"/></div>	
                            <div class="user-info-header-name-onlist">{{item2.name}}</div>
                            <div class="user-info-header-blog-onlist"><a href="https://{{item2.blog}}" target="_blank" title="{{item2.blog}}">{{item2.blog}}</a></div>
                        </div>
                        {{ teg }}
                    </div>
                </div>
                {{ teg }}
            </div>

        `; 

        var render = tpl.fromStr(t); 

        var result = render(data); 

        $('.user-info').html(result);
        //重新绑定
        $('.user-info-online p').click(onlineClick);
        $('.portrait').click(function(){
            onlineClick();
        });
        $('.user-info-article').click(function(){
            toDetail();
            addCover();
            $('.image').trigger('click');
        });
        
        // $('.header-change').click(function(){
        //     $('.show-detail').after('<div class="cover "></div>');
            
        //     $container.fadeIn();
        //     addCover();
        //     $('image').trigger('click');
        // })

        // $('.header-change').click(function(){
        //     $('image').trigger('click');
        //     $('.show-detail').after('<div class="cover "></div>');
        //     $container.fadeIn();
        //     addCover();
        // })

    }





    /************************个人头像更换*************************/



    // $('#image').cropper({
    //   aspectRatio: 1/1,
    //   preview: '.avatar-preview',
    //   crop: function(e) {
    //     // Output the result data for cropping image.
    //     console.log(e.x);
    //     console.log(e.y);
    //     console.log(e.width);
    //     console.log(e.height);
    //     console.log(e.rotate);
    //     console.log(e.scaleX);
    //     console.log(e.scaleY);
    //   },
    
    // });
        
        var $container = $('.container'); 
        var picScale={width:226,height:226,bWidth:226,bHeight:226};//大小参数
        var $clickUpload = $('.click-upload');//上传图片按钮(label)
        var $img = undefined;//空的时候点击确认更改alert报错.
        // var cutView=$(".cropper-cut-view");
        var $avatarUpload = $('.avatar-input');//这里要另起变量因为input包含file不能用label替代.
        var $reUpload = $('.re-upload');//重新上传
        var $close = $('.close');

        //淡入
        headerChange.click(function(){
            console.log(1234131);
            $container.fadeIn();
            $('.image').trigger('click');
            
        })


        //兼容性判定
        var support={
            fileList: !!$('<input type="file">').prop('files'),
            blobURLs: !!window.URL && URL.createObjectURL,
            formData: !!window.FormData
        };
        support.datauri = support.fileList && support.blobURLs;

        var files,file;//这两个跟图片文件有关

        //大函数
        $('.avatar-input').change(beginCut);
        console.log('aaaaa');

        function beginCut()
        {
            console.log('aaaa');
            //不兼容的情况未做处理，可自行参考官方php example中的解决方法
            if(support.datauri)
            {
                
                files=$avatarUpload.prop("files");
                
                if(files.length>0){
                    file=files[0];
                }

                if(isImageFile(file)){
                    picUrl=URL.createObjectURL(file);
                    console.log(file);
                    startCropper();
                }
            }
        }

        function isImageFile(file) {
            if (file.type) {
                return /^image\/\w+$/.test(file.type);
            } else {
                return /\.(jpg|jpeg|png|gif)$/.test(file);
            }
        }

        var active=false;//状态变量

        //更换图片函数
        function startCropper()
        {
            if(active){
                $img.cropper('replace',picUrl);
                console.log('bbb');
            }else{
                $clickUpload.hide();
                $img=$('<img src="' + picUrl + '">');
                console.log(picUrl);
                $(".avatar-body").empty().html($img);

                console.log($img.width());
                console.log($img.height());
                console.log($img)

                $img.cropper({
                    aspectRatio:picScale.width/picScale.height,
                    autoCrop:false,
                    preview: '.avatar-preview',
                    //minCropBoxWidth:216,
                    //minCropBoxHeight:144,
                    zoomable:false,
                    scalable:false,
                    rotatable:false,
                    //autoCropArea:0.01,
                    ready:function(){
                        var result = $img.cropper("getImageData");
                        $img.cropper('crop');
                        $img.cropper('setData',{
                            width:picScale.bWidth,
                            height:picScale.bHeight
                        });
                        //$img.cropper({minCropBoxWidth:mw,minCropBoxHeight:mh,});
                        //$img.cropper("reset");
                    }
                });
                // $img.on('cropmove',function(e){
                //     var data=$img.cropper('getData');
                //     if(data.width<picScale.width||data.height<picScale.height){
                //         e.preventDefault();
                //     }
                // });
                $img.on('cropend',function(e){
                    var data=$img.cropper('getData');
                    if(data.width<picScale.width||data.height<picScale.height){
                        $img.cropper('setData',{ width:picScale.width,
                            height:picScale.height});
                    }
                });

                active=true;
            }
        }

        //清除
        function stopCropper()
        {
            if(active){
                $img.cropper("destroy");
                $img.remove();
                $avatarUpload.val("");
                active = false;
            }
        }
        
        //重新上传按钮事件
        $reUpload.click(function(){
            if($img){
                $clickUpload.trigger('click');
            }
        })

        //关闭按钮
        $close.click(function(){
            $('.cover').remove();
            removeCover();
            $('.image').trigger('click');
            $clickUpload.show();
            $container.fadeOut();
            stopCropper();
        });


        //确认更改按钮(上传)
        $('.avatar-save').on('click',function(){
            
            //空按按钮报错(前提是$img有定义)
            if(!$img){
                alert("请上传图片!");
                return;
            }
            $img.cropper("getCroppedCanvas").toBlob(function(blob){
                var formData=new FormData();
                formData.append('files',blob,file.name);

                $.ajax({
                    method:"post",
                    url: '/user/files/upload', //用于文件上传的服务器端请求地址
                    data: formData,
                    processData: false,//是否转化成查询字符串
                    contentType: false,
                    success:function(result){
                        console.log(result);
                        if(typeof result=="string")
                        {
                            result=$.parseJSON(result);
                        }
                        if(result.data && result.data.length){
                            currentUploadDom.parent().next().next().show();
                            currentUploadDom.attr("src",result.data[0]);
                            $close.trigger('click');
                            // cutView.hide();
                            stopCropper();
                        }
                    },
                    error: function(){
                        console.log('error');
                    }
                });
            });
        });




    /*****************************************************/



});






    

