Vue.component('book-one',{
    data:function(){
        return {

        }
    },
    props:['book'],
    template:
    '<div>'+
        '<a class="book-box"  @click="goToAnotherView(book.url)">'+
            '<div class="book-box-one  clearfix" >'+
                '<div class="book-box-inl">'+
                    '<img :src="book.cover" alt="">'+
                '</div>'+
                '<div class="book-box-inr">'+
                    '<div class="book-age">{{ book.grade }}<span>年级</span></div>'+
                    '<div class="book-title">{{ book.title }}</div>'+
                    '<div class="book-short-detail">{{ book.short }}</div>'+
                    '<div class="book-states">'+
                        '<span class="book-tag-cate">{{ book.type }}</span>'+
                        '<span class="book-play-times">播放人数：{{ book.playtimes }}</span>'+
                        '<span class="book-on-date">上架时间：{{ book.publishdate }}</span>'+  
                    '</div>'+
                '</div>'+
            '</div>'+
        '</a>'+
    '</div>',
    methods:{
        goToAnotherView:function(url){
            console.log(url)
            window.location = url
        }
    }

})

