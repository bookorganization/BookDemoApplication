bookInit()

function bookInit() {
    //获取用户id和图书id
    var currentUserId = $('#hidden-data').attr('userid')
    var currentVideoId = $('#hidden-data').attr('videoid')
    var currentUserType = "1"
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
            //视频控制
            var userType = 0
            if(userType == 0){//普通用户
                videoControl(".dplayer-video-current", 300)
            }
            //视频下载
            videoDownload(userType, videourl)  
        }

        //vip消息提醒
        function vipAlert(words){
            alert(words)
        }

        // 视频控制
        function videoControl(className, time){
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
                        vipAlert("开通会员可继续观看")
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
                if(userType == 0){//普通用户
                   vipAlert("开通会员可下载视频")
                }
                console.log(videoId)
                connectWebViewJavascriptBridge(function (bridge) {
                    bridge.callHandler(
                        'download', {
                            'url': videoId
                        },
                        function (responseData) {
                            document.getElementById("show").innerHTML = "send get responseData from java, data = " + responseData
                        }
                    );
                })
            })
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

        

        // qrcode
        var qrcode = new QRCode(document.getElementById("qrcode"), {
            text: "https://www.baidu.com/",
            width: 128,
            height: 128,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.L
        });

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
                        console.log(res);
                        //执行修改显示
                        if(res.result){
                            $('.bt3').html('<img src="../src/img/collection.png" alt="">已收藏')
                        }else{
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
        

    }
}


$(document).ready(function () {
    var currentVideoId = $('#hidden-data').attr('userid')
    console.log(currentVideoId)


    //test
    var AJAXonebookdata = {
        "video_id": "1",
        "video_url": "../src/img/b1.png",
        "name": "青鸟",
        "short_introduction": "当孩子想知道幸福是什么，不妨听听《青鸟》的答案。",
        "video_type": "儿童文学",
        "number_of_readers": "2309",
        "time": "2019-03-06",
        "video_year": "1~3",
        "introduction": " 《夏洛的网》以儿童的语言讲述关于爱、友谊、生死的故事！《夏洛的网》是一部描写关于友情的童话，在朱克曼家的谷仓里，小猪威尔伯和蜘蛛夏洛建立了最真挚的友谊。《夏洛的网》还是一部探究关于生命的童话，“……生命到底是什么啊？我们出生，我们活上一阵子，我们死去。一只蜘蛛，一生只忙着捕捉和吃苍蝇是毫无意义的，通过帮助你，也许可以提升一点我生命的价值。”童趣盎然，是《夏洛的网》重要的叙事风格。细腻情感化，则传递了本书的语言风格。",
        "lecturer_name": "精灵哥哥",
        "lecturer_head_portrait_url": "../src/img/teacher.png",
        "lecturer_introduction": "以儿童的语言讲述关于爱、友谊、生死的故事！是一部描写关于友情的童话，在朱谷仓里，小尔…",
        "video_url": "http://media.qingzaodushu.com/%E4%B8%80%E5%B9%B4%E7%BA%A7%E7%9A%84%E5%B0%8F%E8%B1%8C%E8%B1%86.mp4",
        "audio": "https://s128.xiami.net/687/6687/2104168739/1806616449_1541043641973.mp3?ccode=xiami_web_web&expire=86400&duration=240&psid=5a54e0d90962a30a467863fdaf9297d4&ups_client_netip=2001:da8:215:6a01::ffb1&ups_ts=1553234584&ups_userid=0&utid=/vxME3UB9VsCAbfND4UXs9T7&vid=1806616449&fn=1806616449_1541043641973.mp3&vkey=Ba58a5ea5956a32508407646c0e733677"

    }

    var AJAXcomments2data = [{
            "username": "浣溪沙",
            "user_img_url": "../src/img/teacher.png",
            "user_grade": "一年级",
            "content": "真好看，推荐大家都来看！",
            "comment_date": "今天09:55"
        },
        {
            "username": "浣溪沙2",
            "user_img_url": "../src/img/teacher.png",
            "user_grade": "一年级",
            "content": "真好看，推荐大家都来看！",
            "comment_date": "今天09:55"
        },
        {
            "username": "浣溪沙3",
            "user_img_url": "../src/img/teacher.png",
            "user_grade": "一年级",
            "content": "真好看，推荐大家都来看！",
            "comment_date": "今天09:55"
        }

    ]





})
