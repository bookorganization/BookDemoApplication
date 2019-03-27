$(document).ready(function(){
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
        "introduction":" 《夏洛的网》以儿童的语言讲述关于爱、友谊、生死的故事！《夏洛的网》是一部描写关于友情的童话，在朱克曼家的谷仓里，小猪威尔伯和蜘蛛夏洛建立了最真挚的友谊。《夏洛的网》还是一部探究关于生命的童话，“……生命到底是什么啊？我们出生，我们活上一阵子，我们死去。一只蜘蛛，一生只忙着捕捉和吃苍蝇是毫无意义的，通过帮助你，也许可以提升一点我生命的价值。”童趣盎然，是《夏洛的网》重要的叙事风格。细腻情感化，则传递了本书的语言风格。",
        "lecturer_name":"精灵哥哥",
        "lecturer_head_portrait_url":"../src/img/teacher.png",
        "lecturer_introduction":"以儿童的语言讲述关于爱、友谊、生死的故事！是一部描写关于友情的童话，在朱谷仓里，小尔…",
        "video_url":"http://media.qingzaodushu.com/%E4%B8%80%E5%B9%B4%E7%BA%A7%E7%9A%84%E5%B0%8F%E8%B1%8C%E8%B1%86.mp4",
        "audio":"https://s128.xiami.net/687/6687/2104168739/1806616449_1541043641973.mp3?ccode=xiami_web_web&expire=86400&duration=240&psid=5a54e0d90962a30a467863fdaf9297d4&ups_client_netip=2001:da8:215:6a01::ffb1&ups_ts=1553234584&ups_userid=0&utid=/vxME3UB9VsCAbfND4UXs9T7&vid=1806616449&fn=1806616449_1541043641973.mp3&vkey=Ba58a5ea5956a32508407646c0e733677"
      
    }

    var AJAXcomments2data = [
        {
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

    // 异步请求
    // 异步请求书籍信息
    $.ajax({
        type: 'GET',
        url: '../src/js/test/onebook.json',
        context: $('#home-book-list'),
        async: false,
        dataType: 'JSON',
        data: {

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
            randerPlayAndDetail(AJAXonebookdata)
            audioDataSave(AJAXonebookdata)
            //执行页面刷新提示让用户刷新
        }

    })
    

    //渲染视频播放器和详情
    function randerPlayAndDetail(data){
        console.log(data)
        $('.book-info-detail').html(data.introduction)
        $('.teacher-name').html(data.lecturer_name)
        $('.tid-text').html(data.lecturer_introduction)
        $('.br-name').html('夏洛的网')
        $('.brd-text').html(data.lecturer_introduction)
        $('.tid-img img').attr('src',data.lecturer_head_portrait_url)
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
    }

    //存入音频接口需要数据
    function audioDataSave(data){
        var audioCover = 'https://pic.xiami.net/images/album/img86/119/5bda74d599ad1_5955586_1541043413.jpg?x-oss-process=image/resize,limit_0,s_410,m_fill'

        // var audioinfo = JSON.stringify()

        document.cookie = "audiourl="+data.audio+';'
        document.cookie = "audiocover="+audioCover+';'
    }


    //异步请求评论
    $.ajax({
        type: 'GET',
        url: '../src/js/test/comments2.json',
        context: $('#comment-list'),
        async: false,
        dataType: 'JSON',
        data: {

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
            var data = AJAXcomments2data
            renderComments(data)
        }
    })
    

    //渲染评论
    function renderComments(data){
        var commentsDom = ''

        //dom 渲染
        for(var l=0;l<data.length;l++){
            commentsDom +=
                '<div class="comment-one">'+
                    '<div class="comment-user">'+
                        '<div class="comment-user-logo">'+
                            '<img src="'+ data[l].user_img_url +'" alt="">'+
                            '<div class="comment-user-name">'+
                                data[l].username +
                                '<div class="comment-user-grade">'+
                                    data[l].user_grade +
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="comment-user-time">'+
                            data[l].comment_date +
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="comment-text">'+
                    data[l].content +
                '</div>'+
                '<div class="comment-line"></div>'
        }

        //添加到dom中
        $('.comment-list').html(commentsDom)
    }



    

    // 切换选项卡
    var bookApp = new Vue({
        el:'#book-part',
        data:{
            bookTabShow : 1,
        },
        methods:{
            tabShow:function(index){
                this.bookTabShow=index;
                console.log(this.bookTabShow)
            }
        }

    })

    // qrcode
    var qrcode = new QRCode(document.getElementById("qrcode"), {
        text: "https://www.baidu.com/",
        width: 128,
        height: 128,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.L
    });

    // 音频切换
    $('.bt2').on('click',function(){        
        audioSwitch()
    })
    function audioSwitch(){
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












    

})
