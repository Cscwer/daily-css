// user-info.js


// var msgOn;
// console.log(msgOn);
var $avatarUpload = $('.avatar-input');//这里要另起变量因为input包含file不能用label替代.
var $container = $('.container'); 
var picScale={width:226,height:226,bWidth:226,bHeight:226};//大小参数
var $clickUpload = $('.click-upload');//上传图片按钮(label)
var $img = undefined;//空的时候点击确认更改alert报错.
var $reUpload = $('.re-upload');//重新上传
var $close = $('.close');
var support={
            fileList: !!$('<input type="file">').prop('files'),
            blobURLs: !!window.URL && URL.createObjectURL,
            formData: !!window.FormData
        };
        support.datauri = support.fileList && support.blobURLs;

        var files,file;//这两个跟图片文件有关

function beginCut(){
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




/***************************主渲染请求函数集*********************************/

$('.image').one('click',(function(){

    var userBlog = "";
    var newBlog;

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
            newBlog = $('.user-info-header-blog input').val();
            http.post(
                "/user/person/updateblog",
                {
                    blog : newBlog
                },
                function(res){
                    console.log(res);
                },
                function(err){}
            )
            $(this).attr("readOnly",'true');
            $('.user-info-header-blog a').attr('href',"https://"+newBlog);
            $('.user-info-header-blog a').attr('target','_blank');
        })

    }

        

    /****************渲染自己****************/
    function selfDraw(){
    /*名字和博客地址*/
        http.get(
                "/user/person/personaldetail",
            {},
            function (res){
                //头部
                console.log(res);
                userblog = res.data.blog
                    userInfoHeader({
                        list1: [{
                            name: username,
                            head: '../images/caster.png',
                            blog: res.data.blog
                        }]
                    })
                Adjust();
                
            },
            function (err){}
        )
        /***************/


        /*备忘录*/
        http.get(
            "/user/person/memo",
            {},
            function(res){
                console.log(res);
                initUserMemo({
                    list2: res.data
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
                memoSheet.blur(function(){
                    var i = parseInt(this.name.slice(-1));
                    var j = $(this).siblings().val();
                    http.post(
                        "/user/person/memo",
                        {
                            id : i+1,
                            time : j,
                            thing : this.value
                        },
                        function(res){},
                        function(err){}
                    )
                });
                memoTitle.blur(function(){
                    var i = parseInt(this.name.slice(-1));
                    var j = $(this).siblings().val();
                    http.post(
                        "/user/person/memo",
                        {
                            id : i+1,
                            time : this.value,
                            thing : j
                        },
                        function(res){},
                        function(err){}
                    )
                    $(this).attr("readOnly",'true');
                })
            },
            function(err){}
        )
    /******************************/


    /*个人daily-css*/
        http.get(
            "/user/person/display?button=1",
            {},
            function(res){
                console.log(res.data);
                initUserInfo({
                    list3: res.data.splice(1,6)
                })
                $('.user-info-article').click(function(){
                    toDetail.call(this,$('.user-info-article'));
                    $('.image').trigger('click');
                });
            },
            function(err){}
        )
    /*********************************/



        //底部
        http.get(
            "/user/getonline",
            {},
            function(res){
                console.log(res.number);
                infoBottom({
                    num: res.number
                })
                onlineShow({
                    list4: res.data.slice(1)
                });
                $('.header-change p').click(function(){
                    $('.image').trigger('click');
                    console.log("fuckyou");
                    $('.show-detail').after('<div class="cover "></div>');
                    $container.fadeIn();
                    addCover();
                });
                Adjust();
                /*在线人数单击事件*/
                $('.user-info-online p').click(onlineClick);
                $('.portrait').click(friendClick);
            },
            function(err){}
        )

    }
    
    selfDraw();
    

/*****************/


    /*个人资料卡左右移动*/
    $('.user-info').css('opacity',0);
    $('.image').click(function(){
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
        {{get (item) >>>> list1}}
                <div class="user-info-header-head">
                    <img src="{{item.head}}" class="portrait master"/>
                    <div class="header-change">
                        <p>更换头像</p>
                    </div>
                </div>
                <div class="user-info-header-name">{{item.name}}</div>
                <div class="user-info-header-blog"><a href="https://{{item.blog}}" target="_blank"><input value="{{item.blog}}" spellcheck="false" class="blog-line"></a></div>
        {{teg}}
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
                <input class="memo-title" type="text" name="memo-title{{idx}}" value="{{ item.time }}" maxlength="4" spellcheck="false">
                <textarea type="text" name="memo-sheet{{idx}}" spellcheck="false" maxlength="60">{{item.thing}}</textarea>
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
                <div class="user-info-article" data-id="{{ item.id }}">{{item.content}}</div>
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

                <div class="user-info-online">
                    <p>在线人数: {{num}}人<span class="online-list-btn"></span></p>
                    <span class="user-info-setting"></span>
                    <div class="online-list off"></div>
                </div>
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
                    <div class="user-info-header-name-onlist">{{item.username}}</div>
                    <div class="user-info-header-blog-onlist"><a href="https://{{item.blog}}" target="_blank" title="{{item.blog}}">{{item.blog}}</a></div>
                </div>
                {{ teg }}
        `; 

        var render = tpl.fromStr(t); 

        var result = render(data); 

        $('.online-list').html(result);

    }
    /*******************************************************************************/



/***********在线人数点击***********/
    function onlineClick(){
        if( $('.online-list').hasClass('on') ){
            $('.online-list').removeClass('on');
            $('.online-list').slideToggle('.3s');
            $('.online-list').css('padding-top', '5%');
            $('.user-info-header-head').removeClass('online-header');
            setTimeout(function() {
                $('.header-change').css("display",'block'); 
            }, 300);

        }else {
            $('.online-list').addClass('on');//显示
            $('.online-list').slideToggle('.3s');
            $('.online-list').css('padding-top', '5%');
            // $('.online-list').fadeIn('slow')
            $('.user-info-header-head').addClass('online-header');//动画
            $('.header-change').css("display",'none');//更改头像阴影去掉
        }
    }




    /****************在线人数头像点击（好友信息）******************/
    function friendClick(){
        console.log("friendClick");
        var theName = $(this).parent('.user-info-header-head-onlist').siblings('.user-info-header-name-onlist').text();
        var theBlog = $(this).parent('.user-info-header-head-onlist').siblings('.user-info-header-blog-onlist').children('a').text();
        console.log(theBlog);
        console.log(theName);
        if(theName === username){
            selfDraw();

            
        }else{
                // 好友header
                friHead({
                    lamb1: [{
                        name: theName,
                        head: "d",
                        blog: theBlog
                    }]
                });
                
                http.get(
                    "/user/person/memo?username="+theName,
                    {},
                    function(res){
                        console.log(res);
                        friMemo({
                            //好友memo
                            lamb2: res.data,
                        });
                        /*好友memo*/
                        var memoOnlineTitle = $('.memo-online-title');
                        var memoOnlineSheet = $('.memo-online-sheet');
                        memoOnlineTitle.eq(0).addClass("title-press");
                        memoOnlineSheet.eq(0).addClass("text-show");
                        memoOnlineTitle.click(function(){
                            $(this).addClass('title-press');
                            $(this).parent('div').siblings().find("div").removeClass('title-press');
                            $(this).siblings().addClass('text-show');
                            $(this).parent('div').siblings().find("textarea").removeClass('text-show');
                        });
                    },
                    function(err){}
                )
                //好友DC
                http.get(
                    "/user/person/display?button=1&&username="+theName,
                    {},
                    function(res){
                        console.log(res.data);
                        friPost({
                            lamb3: res.data.splice(1,6)
                        })
                        $('.user-info-article').click(function(){
                            toDetail.call(this,$('.user-info-article'));
                            $('.image').trigger('click');
                        });
                    },
                    function(err){}
                )        
                http.get(
                    "/user/getonline",
                    {},
                    function(res){
                        console.log(res);
                        friBottom({
                            //在线人数
                            num2: res.number
                        });
                        friOnline({
                            lamb4: res.data
                        })
                        $('.user-info-online p').click(onlineClick);
                    },
                    function(err){}
                )
            if( $('.online-list').hasClass('on') ){
                $('.online-list').removeClass('on');
                $('.online-list').slideToggle('.3s');
                $('.online-list').css('padding-top', '5%');
                $('.user-info-header-head').removeClass('online-header');

            }else {
                $('.online-list').addClass('on');//显示
                $('.online-list').slideToggle('.3s');
                $('.online-list').css('padding-top', '5%');
                // $('.online-list').fadeIn('slow')
                $('.user-info-header-head').addClass('online-header');
            }



        }

        


        /**************好友模板*****************/
        function friHead(data){
            var t = `
                    {{ get (item, idx) >>>> lamb1 }}
                    <div class="user-info-header-head online-header">
                        <img src="{{item.head}}" class="portrait"/>
                    </div>	
                    <div class="user-info-header-name">{{item.name}}</div>
                    <div class="user-info-header-blog"><a href="https://{{item.blog}}" target="_blank" class="blog-line">{{item.blog}}</a></div>
                    {{ teg }}
            `
            var render = tpl.fromStr(t); 
            var result = render(data); 
            $('.user-info-header').html(result);
        }
        //memo
        function friMemo(data){
            var t = `
            {{ get (item, idx) >>>> lamb2 }}
                <div>
                    <div class="memo-title memo-online-title" maxlength="4">{{ item.time }}</div>
                    <textarea class="memo-online-sheet" type="text" name="memo-sheet{{idx}}" maxlength="60" readOnly="true">{{item.thing}}</textarea>
                </div>
            {{teg}}
            `;
            var render = tpl.fromStr(t); 
            var result = render(data); 
            $('.user-info-memo').html(result);
        }
        function friPost(data){

            var t = `
                {{ get (item, idx) >>>> lamb3 }}
                    <div class="user-info-article">{{item.content}}</div>
                    <div class="user-info-article-mask"></div>
                {{ teg }}
            `
            var render = tpl.fromStr(t); 
            var result = render(data); 
            $('.user-info-post').html(result);
        }
        function friBottom(data){
            var t = `
                    <div class="user-info-online">
                        <p class="position-adjust">在线人数: {{num2}}人<span class="online-list-btn"></span></p>
                        <div class="online-list off">
                        </div>
                    </div>
            `;
            var render = tpl.fromStr(t); 
            var result = render(data); 
            $('.user-info-bottom').html(result);
        }
        function friOnline(data){
            var t = `
                    {{ get (item2, idx2) >>>> lamb4 }}
                        <div class="user-info-header-onlist">
                            <div class="user-info-header-head-onlist"><img src="images/{{item2.head}}.png" class="portrait"/></div>	
                            <div class="user-info-header-name-onlist">{{item2.username}}</div>
                            <div class="user-info-header-blog-onlist"><a href="https://{{item2.blog}}" target="_blank" title="{{item2.blog}}">{{item2.blog}}</a></div>
                        </div>
                    {{ teg }}

            `;
            var render = tpl.fromStr(t); 
            var result = render(data); 
            $('.online-list').html(result);
        }
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
        
        // var $container = $('.container'); 
        // var picScale={width:226,height:226,bWidth:226,bHeight:226};//大小参数
        // var $clickUpload = $('.click-upload');//上传图片按钮(label)
        // var $img = undefined;//空的时候点击确认更改alert报错.
        // var cutView=$(".cropper-cut-view");
        // var $avatarUpload = $('.avatar-input');//这里要另起变量因为input包含file不能用label替代.
        // var $reUpload = $('.re-upload');//重新上传
        // var $close = $('.close');

        //淡入




        //兼容性判定
        // var support={
        //     fileList: !!$('<input type="file">').prop('files'),
        //     blobURLs: !!window.URL && URL.createObjectURL,
        //     formData: !!window.FormData
        // };
        // support.datauri = support.fileList && support.blobURLs;

        // var files,file;//这两个跟图片文件有关

        //大函数
        $('.avatar-input').change(beginCut);


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
                http.post(
                    '/user/files/upload',
                    {},
                    function(result){
                        console.log(result);
                        // if(typeof result=="string")
                        // {
                        //     result=$.parseJSON(result);
                        // }
                        if(result.data && result.data.length){
                            currentUploadDom.parent().next().next().show();
                            currentUploadDom.attr("src",result.data[0]);
                            $close.trigger('click');
                            // cutView.hide();
                            stopCropper();
                        }
                    },
                    function(){
                        console.log('error');
                    }
                )
                // $.ajax({
                //     method:"post",
                //     url: 'http://39.108.117.83:3000/user/files/upload', //用于文件上传的服务器端请求地址
                //     data: formData,
                //     processData: false,//是否转化成查询字符串
                //     contentType: false,
                //     success:function(result){
                //         console.log(result);
                //         // if(typeof result=="string")
                //         // {
                //         //     result=$.parseJSON(result);
                //         // }
                //         if(result.data && result.data.length){
                //             currentUploadDom.parent().next().next().show();
                //             currentUploadDom.attr("src",result.data[0]);
                //             $close.trigger('click');
                //             // cutView.hide();
                //             stopCropper();
                //         }
                //     },
                //     error: function(){
                //         console.log('error');
                //     }
                // });
            });
        });




    /*****************************************************/

    $('.image').trigger('click');
    

}));






    

