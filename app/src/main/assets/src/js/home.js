$(document).ready(function () {

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

    // 异步请求数据

    /*
    **包括轮播、推荐书籍、图书列表
    */

    //获取轮播
    // $.ajax({
    //     type: GET,
    //     url: '',
    //     // context: $('#home-book-list'),
    //     async: false,
    //     dataType: JSON,
    //     data: {

    //     },
    //     success: function (res) {
    //         console.log(res);
    //         //执行页面渲染
    //         // ...
    //     },
    //     error: function (res) {
    //         console.log(res);
    //         //执行页面刷新提示让用户刷新
    //     }

    // })

    // 获取推荐书籍
    // $.ajax({
    //     type: GET,
    //     url: '',
    //     // context: $('#home-book-list'),
    //     async: false,
    //     dataType: JSON,
    //     data: {

    //     },
    //     success: function (res) {
    //         console.log(res);
    //         //执行页面渲染
    //         // ...
    //     },
    //     error: function (res) {
    //         console.log(res);
    //         //执行页面刷新提示让用户刷新
    //     }

    // })


    // 获取图书列表
    // $.ajax({
    //     type:GET,
    //     url:'',
    //     context:$('#home-book-list'),
    //     async:false,
    //     dataType:JSON,
    //     data:{

    //     },
    //     success:function(res){
    //         console.log(res);
    //         //执行页面渲染
    //         // ...
    //     },
    //     error:function(res){
    //         console.log(res);
    //         //执行页面刷新提示让用户刷新
    //     }


    // })


    // 推荐图书渲染
    recomRender()
    function recomRender(){
        var recom = [
            {
                'video_url':'../src/img/micky.png',
                'url':'book.html',
                'name':'米老鼠1'
            },
            {
                'video_url':'../src/img/micky.png',
                'url':'book.html',
                'name':'米老鼠2'
            },
            {
                'video_url':'../src/img/micky.png',
                'url':'book.html',
                'name':'米老鼠3'
            },
            {
                'video_url':'../src/img/micky.png',
                'url':'book.html',
                'name':'米老鼠4'
            },
        ]
    
        //渲染推荐列表
        function recommendList(recomList, recomLength, wrapper){
            var recommendDom = ''        
    
            for(var re=0; re<recomLength; re++){
                recommendDom +=
                '<div class="recom-book goto-book" bookid=' + recomList[re]["url"] + '>'+
                    '<img src="' + recomList[re]["video_url"] + '" alt="">'+
                    '<p>'+ recomList[re]["name"] +'</p>'+
                '</div>'
            }
            $(wrapper).html(recommendDom);
    
    
        }
        
        //渲染
        recommendList(recom,recom.length,'.recom-books')
            
        //【跳转到书籍】 param:bookid
        // go to book.html
        $('.goto-book').on('click',function(){
            //
            var bookid = $(this).attr("bookid")
            console.log('go to book.html book id is '+$(this).attr("bookid"))
            // event.preventDefault()
            JsBridge.callHandler(
                'goToBook', { //接受分类，切换activity
                    'bookid': bookid
                },
                function (responseData) {
                    document.getElementById("show").innerHTML = "send get responseData from java, data = " + responseData
                }
            );
        })
    }    




    // 图书列表渲染
    var bookListHome = new Vue({
        el: '#home-book-list',
        data: {
            booklist: [
                          {
                              "id": "1",
                              "cover": "../src/img/b1.png",
                              "title": "青鸟",
                              "short": "当孩子想知道幸福是什么，不妨听听《青鸟》的答案。",
                              "type": "儿童文学",
                              "playtimes": "2309",
                              "publishdate": "2019-03-06",
                              "grade": "1~3",
                              "url": "book.html"
                          },
                          {
                              "id": "2",
                              "cover": "../src/img/b1.png",
                              "title": "青鸟2",
                              "short": "当孩子想知道幸福是什么，不妨听听《青鸟》的答案。",
                              "type": "儿童文学",
                              "playtimes": "2309",
                              "publishdate": "2019-03-06",
                              "grade": "1~3",
                              "url": "book.html"
                          },
                          {
                              "id": "3",
                              "cover": "../src/img/b1.png",
                              "title": "青鸟3",
                              "short": "当孩子想知道幸福是什么，不妨听听《青鸟》的答案。",
                              "type": "儿童文学",
                              "playtimes": "2309",
                              "publishdate": "2019-03-06",
                              "grade": "1~3",
                              "url": "book.html"
                          }
                      ]
        },
        created: function () {
           console.log('created 钩子执行...');
//            //异步请求渲染数据
//            var url = "../src/js/test/booklist.json"
//            axios.get(url, {
//                name: ""
//            }).then(function (res) {
//                var resData = res.data;
//                // if (resData.status == "0") { //0表示成功，1表示失败
//                //     console.log(resData.message);
//                // } else {
//                //     console.log(resData.message);
//                // }
//                this.booklist = resData
//                bookListHome.$data.booklist = resData
//            });
            // 点击图书块传数据
            
        },

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

    //

    


   

})
