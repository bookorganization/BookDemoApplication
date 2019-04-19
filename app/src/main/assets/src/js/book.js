bookInit()

function bookInit() {
    //获取
    //   用户id  图书id  用户类型usertype 会员到期时间expireTime
    var currentUserId = $('#hidden-data').attr('userid')
    var currentVideoId = $('#hidden-data').attr('videoid')
    var currentUserType = $('#hidden-data').attr('usertype')
    var expireTime = $('#hidden-data').attr('expiretime')
    // var expireTime = 1555643900000
    // var currentUserType = "1"

    //设置
    var globalShareInfo = {};
    var globalShareBasicAddress = "http://10.112.7.201:8080/bookbyid?bookid="

    console.log(Date.parse(new Date()))
    //弹框提示
    /*****************/
    /*               */
    /*               */
    /*               */
    /*****************/
    var alertInfo = new OrangeUI({})


    // 切换选项卡
    var bookApp = new Vue({
        el: '#book-part',
        data: {
            bookTabShow: 1,
        },
        methods: {
            tabShow: function (index) {
                this.bookTabShow = index;
                console.log(this.bookTabShow)
            }
        }

    })
    //请求后台数据
    getBookRelatedData(currentUserId, currentVideoId)

    //请求后台数据
    function getBookRelatedData(userid, videoid) {
        // 异步请求
        $.ajax({
            // type: 'post',
            type: 'get',
            url: 'http://10.112.7.201:8080/bookbyid',
            // url: '../src/js/test/onebook.json',
            // context: $('#home-book-list'),
            async: false,
            dataType: 'JSON',
            data: {
                "video_id": videoid,
                "user_id": userid
            },
            success: function (res) {
                console.log(res);
                //执行页面渲染
                var data = res
                randerPlayAndDetail(data)
                audioDataSave(data)
                // ...
                saveShareInfo(data)
            },
            error: function (res) {
                console.log(res)
                // randerPlayAndDetail(AJAXonebookdata)
                // audioDataSave(AJAXonebookdata)
                //执行页面刷新提示让用户刷新
            }

        })


        //渲染视频播放器和详情
        function randerPlayAndDetail(data) {
            console.log(data)
            $('.book-info-detail').html(data.introduction) //本书介绍
            $('.teacher-name').html(data.lecturer_name) //老师名
            $('.tid-text').html(data.lecturer_introduction) //老师介绍
            $('.br-name').html('夏洛的网') //书籍名
            $('.brd-text').html(data.short_introduction) //书籍短介绍
            $('.tid-img img').attr('src', '../src/img/teacher.png') //老师封面           
            $('.brd-img').html('<img src="../src/img/b1.png" alt="" class="recom-book" url=' + 3 + '>') //图书封面
            // console.log(data.lecturer_head_portrait_url)
            // $('.brd-img img').attr('src','../src/img/b1.png')
            var videourl = data.video_url;
            // 播放视频
            const dp = new DPlayer({
                container: document.getElementById('dplayer'),
                video: {
                    url: videourl,
                    // pic: '../src/img/c.png',
                    // thumbnails: '../src/img/c.png'
                },
            });
            //视频播放控制

            var userType = currentUserType
            if(userType == '0'){//普通用户
                videoPlayControl(userType, ".dplayer-video-current", 300)
            }else if(expireTime >= Date.parse(new Date())){                
                videoPlayControl(userType, ".dplayer-video-current", 300)
            }
            //视频下载
            videoDownload(userType, videourl)  
        }

        // 视频播放控制
        function videoPlayControl(userType, className, time){
            console.log($(className))            
            
            $(className)[0].duration = 120
            var videoTimer = window.setInterval(stopVideo, 100)

            function stopVideo(){
                if($(className)[0].paused != true){
                    var videoCurrentTime = $(className)[0].currentTime             
                    var videoDuration = $(className)[0].duration
                    console.log(videoCurrentTime)
                    console.log(videoDuration)
                    if(videoCurrentTime>= time){
                        console.log('xixi')
                        $(className)[0].pause()
                        //开会员提醒
                        if(userType == '0'){//普通用户
                            alertInfo.note("开通会员可继续观看")
                        }else if(expireTime >= Date.parse(new Date())){                
                            alertInfo.note("会员已到期，请重新续订")
                        }
                        
                    }
                }                
                
            }

        }

        //视频下载
        function videoDownload(userType, videoId){
            //添加组件
            var downloadDom = '<div class="dplayer-setting-item dplayer-setting-down">'+
            '<span class="dplayer-label">下载</span>'+            
            '</div>'
            $('.dplayer-setting-origin-panel').append(downloadDom)
            //点击控制
            $('.dplayer-setting-down').on('click',function(){
                //用户判断
                if(userType == '0'){//普通用户
                    alertInfo.note("开通会员可下载视频")
                }else if(userType == 1 && expireTime >= Date.parse(new Date())){
                    alertInfo.note("会员已到期，请重新续订")
                }else{
                    console.log(videoId)
                    connectWebViewJavascriptBridge(function (bridge) {
                        bridge.callHandler(
                            'download', 
                            videoId,
                            function (responseData) {
                                document.getElementById("show").innerHTML = "send get responseData from java, data = " + responseData
                            }
                        );
                    })
                }
                
            })
        }

        //保存分享信息
        function saveShareInfo(data){
            globalShareInfo.title = data.name
            globalShareInfo.url = globalShareBasicAddress+data.video_id
            globalShareInfo.content = data.introduction
            globalShareInfo.cover = data.video_cover_url
        }

        //存入音频接口需要数据
        function audioDataSave(data) {
            var audioCover = 'https://pic.xiami.net/images/album/img86/119/5bda74d599ad1_5955586_1541043413.jpg?x-oss-process=image/resize,limit_0,s_410,m_fill'

            // var audioinfo = JSON.stringify()

            document.cookie = "audiourl=" + data.audio + ';'
            document.cookie = "audiocover=" + audioCover + ';'
        }


        //异步请求评论    
        $.ajax({
            url: "http://10.112.7.201:8080/getcommentbyid",
            async: true,
            type: "post",
            dataType: "json",
            data: {
                "video_id": currentVideoId
            },
            success: function (res) {
                console.log(res);
                //执行页面渲染
                var data = res
                renderComments(data)
                // ...
            },
            error: function (res) {
                console.log(res)
                //执行页面刷新提示让用户刷新
                // var data = AJAXcomments2data
                // renderComments(data)
            }
        })
        // renderComments(AJAXcomments2data)



        //渲染评论
        function renderComments(data) {
            var commentsDom = ''

            //dom 渲染
            for (var l = 0; l < data.length; l++) {
                commentsDom +=
                    '<div class="comment-one">' +
                    '<div class="comment-user">' +
                    '<div class="comment-user-logo">' +
                    '<img src="' + data[l].user_head_portrait_url + '" alt="">' +
                    '<div class="comment-user-name">' +
                    data[l].user_name +
                    '<div class="comment-user-grade">' +
                    data[l].user_grade +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="comment-user-time">' +
                    data[l].comment_date +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="comment-text">' +
                    data[l].cotent +
                    '</div>' +
                    '<div class="comment-line"></div>'
            }

            //添加到dom中
            $('.comment-list').html(commentsDom)
        }

        //发表评论
        $('.comment-input input').bind('keydown',function(event){
            if(event.keyCode == "13")    
            {
                var comment = $.trim($('.comment-input input').val())
                var sendData = {}
                sendData.video_id = currentVideoId
                sendData.from_user_id = currentUserId
                sendData.cotent = comment
                console.log(sendData)
                //发送搜索字
                $.ajax({
                    type:'post',
                    url:'http://10.112.7.201:8080/commenttovideo',
                    async:true,
                    dataType:'JSON',
                    data:sendData,
                    success:function(res){
                        console.log(res);
                        //执行页面渲染
                        // ...
                        // bookListClass.$data.booklist = res
                    },
                    error:function(res){
                        console.log(res);
                        //执行页面刷新提示让用户刷新
                    }
                
                
                })         
            }
          });

        

        // qrcode
        // var qrcode = new QRCode(document.getElementById("qrcode"), {
        //     text: "https://www.baidu.com/",
        //     width: 128,
        //     height: 128,
        //     colorDark: "#000000",
        //     colorLight: "#ffffff",
        //     correctLevel: QRCode.CorrectLevel.L
        // });

        // 音频切换
        $('.bt2').on('click', function () {
            audioSwitch()
        })

        function audioSwitch() {
            window.location = "audio.html";
        }

        //滑动切换
        // $('#book-part').touchwipe({
        //     min_move_x : 20, // 横向灵敏度
        //     min_move_y : 20, // 纵向灵敏度

        //     wipeLeft : function() {
        //         console.log("向左滑动了");
        //         if(bookApp.$data.bookTabShow < 3){
        //             bookApp.$data.bookTabShow ++
        //         }else{
        //             bookApp.$data.bookTabShow = 3
        //         }            
        //         console.log(bookApp.$data.bookTabShow)

        //     },
        //     wipeRight : function() {
        //         if(bookApp.$data.bookTabShow > 1){
        //             bookApp.$data.bookTabShow --
        //         }else{
        //             bookApp.$data.bookTabShow = 1
        //         }            
        //         console.log(bookApp.$data.bookTabShow)
        //         console.log("向右滑动了");

        //     },
        // });

        //推荐图书跳转    
        $('.recom-book').on('click', function () {
            var videoId = $(this).attr('url')

            getBookRelatedData(currentUserId, videoId)
            // console.log('go to book.html book id is ' + url)
            // connectWebViewJavascriptBridge(function (bridge) {
            //     bridge.callHandler(
            //         'goToBook', {
            //             'bookid': url
            //         },
            //         function (responseData) {
            //             document.getElementById("show").innerHTML = "send get responseData from java, data = " + responseData
            //         }
            //     );
            // })
        })

        //视频收藏
        $('.bt3').on('click',function(){
            if(currentUserType == "0"){//普通用户
                vipAlert("请登录")
            }else{
                console.log('进入收藏')
                $.ajax({
                    url: "http://10.112.7.201:8080/collecte",
                    async: true,
                    type: "post",
                    dataType: "json",
                    data: {
                        "video_id": currentVideoId,
                        "user_id": "1"
                    },
                    success: function (res) {
                        console.log(res.result);
                        //执行修改显示
                        var noting = new OrangeUI({})
                            
                        if(res.result){
                            $('.bt3').html('<img src="../src/img/collection.png" alt="">已收藏')
                            noting.note("收藏成功")
                        }else if(!res.result){
                            noting.note("取消成功")
                            $('.bt3').html('<img src="../src/img/collection.png" alt="">收藏')
                        }
                        
                        // ...
                    },
                    error: function (res) {
                        console.log(res)
                        //执行页面刷新提示让用户刷新
                        // var data = AJAXcomments2data
                        // renderComments(data)
                    }
                })
            }
            
        })

        //视频内容分享
        // Vue.component('mt-popup', {
        //     data:function(){
        //         return {
        //         }  
        //     },
        //     template:"<div>xixi content</div>"
        // })
        
        // var pop = new Vue({
        //     el:"#xixi",
        //     data:{
        //         popupVisible:true
        //     },

        // })
        
        //内容分享

        //弹窗内容
        function contentshareDomMaker(book) {
            var dom = '<div class="cs-part1">'+
            '<div class="cs-img">'+
                '<img src="../src/img/content-share.png" alt="">'+
            '</div>'+
            '<div class="cs-books">'+
                '<span class="cs-normal">您已花XX分钟轻轻松松看完</span>'+
                '<span class="cs-book-mark">' + book +'等10本书</span>'+
                '<span class="cs-normal">邀请朋友一起愉快学习吧</span>'+
            '</div>'+
            '<div class="cs-btn">'+
                '<span>分享好友，一起获得7天VIP</span>'   +
            '</div>'+
            '</div>'+
            '<div class="cs-part2">'+
                '<div class="cs-img"><img src="../src/img/share-beans.jpg" alt=""></div>'+
            '</div>'+
            '<div class="cs-part3">'+
                '<div class="cs-img"><img src="../src/img/share-close.png" alt=""></div>'+
            '</div>' 
            
            return dom

        }
        
        $('.book-tool.bt4').on('click',function(){    
            
            
            //获取已读书籍列表
            var data = {};
            data.user_id = 1;  
            var insertBooks
            $.ajax({
                url: "http://10.112.7.201:8080/gethistory",
                async: true,
                type: "post",
                data: data,
                dataType: "json",
                success: function (data) {
                    console.log(data)
                    insertBooks = shareBooks(data)
                    var tt = new OrangeUI({
                        value:'hahah',
                        contentDOM:contentshareDomMaker(insertBooks),
                        contentWrapper:'.content-share-wrap'
                    })
                    tt.makMask()
                    tt.makeMaskShow()
                    $('.content-share-wrap').show()
        
                    $('.orangeui-modal').on('click',function(){
                        tt.makeMaskHide()
                        $('.content-share-wrap').hide()
                    })
                    $('.cs-part1 .cs-btn').on('click',function(){
                        console.log('分享，向andirod传数据')
                        var sendData = JSON.stringify(globalShareInfo)
                        console.log(sendData)
                        connectWebViewJavascriptBridge(function (bridge) {
                            bridge.callHandler(
                                'shareabook', 
                                sendData,
                                function (responseData) {
                                    document.getElementById("show").innerHTML = "send get responseData from java, data = " + responseData
                                }
                            );
                        })
                    })
                    $('.cs-part3').on('click',function(){
                        console.log('xixi')
                        tt.makeMaskHide()
                        $('.content-share-wrap').hide()
                    })

                },
                error:function(){

                }
            });             
            
            //渲染书名
            function shareBooks(list){
                var dom = ''
                for(var i=0;i<2;i++){
                    dom += '《'+list[i].name+'》、'                    
                }
                dom+='《'+list[2].name+'》' 
                return dom;
            }
           
      
        })
        

    }
}



