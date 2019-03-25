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

    // $('#home-book-list').on('click', function (event) {
    //     var sendAddr = $(this).attr('href')

    //     event.preventDefault()
    //     console.log('jsjs')
    //     window.WebViewJavascriptBridge.callHandler(
    //         'submitFromWeb', {
    //             'param': '中文测试'
    //         },
    //         function (responseData) {
    //             document.getElementById("show").innerHTML = "send get responseData from java, data = " + responseData
    //         }
    //     );
    // })

    // 异步请求数据
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

    //获取推荐书籍
    //    $.ajax({
    //        type: GET,
    //        url: '',
    //        context: $('#home-book-list'),
    //        async: false,
    //        dataType: JSON,
    //        data: {

    //        },
    //        success: function (res) {
    //            console.log(res);
    //            //执行页面渲染
    //            // ...
    //        },
    //        error: function (res) {
    //            console.log(res);
    //            //执行页面刷新提示让用户刷新
    //        }

    //    })

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
                '<div class="recom-book" url=' + recomList[re]["url"] + '>'+
                    '<img src="' + recomList[re]["video_url"] + '" alt="">'+
                    '<p>'+ recomList[re]["name"] +'</p>'+
                '</div>'
            }
            $(wrapper).html(recommendDom);
    
    
        }
        
        //渲染
        recommendList(recom,recom.length,'.recom-books')

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

    //acitivity跳转

    //分类跳转
    $('.class-box-1').on('click',function(){
        //
        var url = $(this).attr("url")
        console.log($(this).attr("url"))
        // event.preventDefault()
        JsBridge.callHandler(
            'changeClass1', { //接受分类，切换activity
                'Address': url
            },
            function (responseData) {
                document.getElementById("show").innerHTML = "send get responseData from java, data = " + responseData
            }
        );
    })
    //全部分类的跳转
    $('.class-box-2').on('click',function(){
        //
        var url = $(this).attr("url")
        console.log($(this).attr("url"))
        // event.preventDefault()
        JsBridge.callHandler(
            'changeClass2', { //接受分类，切换activity
                'Address': url
            },
            function (responseData) {
                document.getElementById("show").innerHTML = "send get responseData from java, data = " + responseData
            }
        );
    })


   

})
