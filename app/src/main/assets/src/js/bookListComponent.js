Vue.component('book-one',{
    data:function(){
        return {

        }
    },
    props:['book'],
    template:
    '<div>'+
        '<a class="book-box"  @click="goToAnotherView(book.video_id)">'+
        // '<div class="book-box"  :href="book.url">'+
            '<div class="book-box-one  clearfix" >'+
                '<div class="book-box-inl">'+
                    '<img :src="book.video_cover_url" alt="">'+
                '</div>'+
                '<div class="book-box-inr">'+
                    '<div class="book-age">{{ book.video_year }}<span>年级</span></div>'+
                    '<div class="book-title">{{ book.name }}</div>'+
                    '<div class="book-short-detail">{{ book.short_introduction }}</div>'+
                    '<div class="book-states">'+
                        '<span class="book-tag-cate">{{ book.video_type }}</span>'+
                        '<span class="book-play-times">播放人数：{{ book.number_of_readers }}</span>'+
                        '<span class="book-on-date">上架时间：{{ book.time }}</span>'+  
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>',
    methods:{        
        //【跳转到书籍】 param:bookid
        // go to book.html
        goToAnotherView:function(url){
            console.log('go to book.html book id is '+ url)
            // window.location = url

            JsBridge.callHandler(
                'goToBook', {
                    'bookid': url
                },
                function (responseData) {
                    document.getElementById("show").innerHTML = "send get responseData from java, data = " + responseData
                }
            );

            // Window.WebViewJavascriptBridge.callHandler(
            //     'submitFromWeb', {
            //         'param': '中文测试'
            //     },
            //     function (responseData) {
            //         document.getElementById("show").innerHTML = "send get responseData from java, data = " + responseData
            //     }
            // );
        }
    }

})

