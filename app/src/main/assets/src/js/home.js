$(document).ready(function () {

    

    // 异步请求数据

    /*
    **包括轮播、推荐书籍、图书列表
    */

    //获取轮播
    $.ajax({
        type: 'GET',
        url: '../src/js/test/carousel.json',
        // url: 'http://10.28.129.193:8080/QingzaoReading/carousel',
        // context: $('#home-book-list'),
        async: false,
        dataType: 'JSON',
        data: {

        },
        success: function (res) {
            console.log(res);
            //执行页面渲染
            // ...
            swiperRender(res)

            // 轮播图加载
            var swiper = new Swiper('.swiper-container', {
                pagination: {
                    el: '.swiper-pagination',
                    dynamicBullets: true,
                },
                autoplay: {
                    delay: 2000,
                },
            });
        },
        error: function (res) {
            console.log(res);
            //执行页面刷新提示让用户刷新
        }

    })

    // 获取推荐书籍
    $.ajax({
        type: 'GET',
        url:'../src/js/test/bookrecommend.json',
        // url: 'http://10.28.129.193:8080/QingzaoReading/bookrecommend',
        // context: $('#home-book-list'),
        async: false,
        dataType: 'JSON',
        data: {

        },
        success: function (res) {
            console.log(res);
            //执行页面渲染
            // ...
            
            recomRender(res)
        },
        error: function (res) {
            console.log(res);
            //执行页面刷新提示让用户刷新
        }

    })
    

    function swiperRender(data){
        var swiperDom = ''
        for(var d=0;d<data.length;d++){
            swiperDom += 
            '<a class="swiper-slide goto-book" bookid="'+data[d]['playing_id']+'">'+
                '<img src="'+data[d]['picture_url']+'" alt="">'+
            '</a>'
        }
        $('.swiper-wrapper').html(swiperDom)

    }

    //推荐渲染    
    function recomRender(data){        
        //渲染推荐列表
        function recommendList(data){
            var recommendDom = ''        
    
            for(var re=0; re<data.length; re++){
                recommendDom +=
                '<div class="recom-book" url=' + data[re]["video_id"] + '>'+
                    '<img src="' + data[re]["video_cover_url"] + '" alt="">'+
                    '<p>'+ data[re]["name"] +'</p>'+
                '</div>'
            }
            $('.recom-books').html(recommendDom);    
    
        }
        
        //渲染
        recommendList(data)

        //书籍跳转
        $('.recom-book').on('click',function(){
            //
            var url = $(this).attr("url")
            console.log($(this).attr("url"))
            // event.preventDefault()
            JsBridge.callHandler(
                'changeClass', { //接受分类，切换activity
                    'Address': url
                },
                function (responseData) {
                    document.getElementById("show").innerHTML = "send get responseData from java, data = " + responseData
                }
            );
        })
    }    


    // 获取图书列表
    $.ajax({
        type:'GET',
        url:'../src/js/test/booklist.json',
        // url:'http://10.28.129.193:8080/QingzaoReading/booklist',
        context:$('#home-book-list'),
        async:false,
        dataType:'JSON',
        data:{

        },
        success:function(res){
            console.log(res);
            //执行页面渲染
            // ...
                // 图书列表渲染
            var bookListHome = new Vue({
                el: '#home-book-list',
                data: {
                    booklist:res
                    // booklist: [
                    //             {
                    //                 "id": "1",
                    //                 "cover": "../src/img/b1.png",
                    //                 "title": "青鸟",
                    //                 "short": "当孩子想知道幸福是什么，不妨听听《青鸟》的答案。",
                    //                 "type": "儿童文学",
                    //                 "playtimes": "2309",
                    //                 "publishdate": "2019-03-06",
                    //                 "grade": "1~3",
                    //                 "url": "book.html"
                    //             },
                    //             {
                    //                 "id": "2",
                    //                 "cover": "../src/img/b1.png",
                    //                 "title": "青鸟2",
                    //                 "short": "当孩子想知道幸福是什么，不妨听听《青鸟》的答案。",
                    //                 "type": "儿童文学",
                    //                 "playtimes": "2309",
                    //                 "publishdate": "2019-03-06",
                    //                 "grade": "1~3",
                    //                 "url": "book.html"
                    //             },
                    //             {
                    //                 "id": "3",
                    //                 "cover": "../src/img/b1.png",
                    //                 "title": "青鸟3",
                    //                 "short": "当孩子想知道幸福是什么，不妨听听《青鸟》的答案。",
                    //                 "type": "儿童文学",
                    //                 "playtimes": "2309",
                    //                 "publishdate": "2019-03-06",
                    //                 "grade": "1~3",
                    //                 "url": "book.html"
                    //             }
                    //         ]
                },
                created: function () {
                console.log('created 钩子执行...');           
                },

            })
        },
        error:function(res){
            console.log(res);
            //执行页面刷新提示让用户刷新
        }


    })



    //Java acitivity跳转 传送数据
    
    //【跳转到书籍列表】  param:classTag
    //go to boolist.html
    $('.class-tag').on('click',function(){
        //
        var classTag = $(this).attr("classTag")
        console.log('go to boolist.html,class tag is '+$(this).attr("classTag"))
        // event.preventDefault()
        JsBridge.callHandler(
            'changeClass', { //接受分类，切换activity
                'classTag': classTag
            },
            function (responseData) {
                document.getElementById("show").innerHTML = "send get responseData from java, data = " + responseData
            }
        );
    })

    
    //【跳转到全部分类】 param:type
    // go to classes.html
    $('.search-type').on('click',function(){
        //
        var type = $(this).attr("type")
        console.log('go to classes.html,search type is ' + $(this).attr("type"))
        // event.preventDefault()
        JsBridge.callHandler(
            'searchType', { //接受分类，切换activity
                'type': type
            },
            function (responseData) {
                document.getElementById("show").innerHTML = "send get responseData from java, data = " + responseData
            }
        );
    })   

})
