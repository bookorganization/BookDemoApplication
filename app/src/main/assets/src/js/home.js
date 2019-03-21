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

    // 点击图书块传数据


    $('.book-box').on('click', function (event) {
        var sendAddr = $(this).attr('href')

        event.preventDefault()
        window.WebViewJavascriptBridge.callHandler(
            'submitFromWeb', {
                'param': '中文测试'
            },
            function (responseData) {
                document.getElementById("show").innerHTML = "send get responseData from java, data = " + responseData
            }
        );
    })


    // 图书列表渲染
    var bookListHome = new Vue({
        el: '#home-book-list',
        data: {
            booklist: ""
        },
        created: function () {
            console.log('created 钩子执行...');
            //异步请求渲染数据
            var url = "../src/js/test/booklist.json"
            axios.get(url, {
                name: ""
            }).then(function (res) {
                var resData = res.data;
                // if (resData.status == "0") { //0表示成功，1表示失败    
                //     console.log(resData.message);
                // } else {
                //     console.log(resData.message);
                // }
                this.booklist = resData
                bookListHome.$data.booklist = resData
            });
        },


    })


   

})
