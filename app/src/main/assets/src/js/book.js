const dp = new DPlayer({
    container: document.getElementById('dplayer'),
    video: {
        url: 'http://media.qingzaodushu.com/%E5%A4%8F%E6%B4%9B%E7%9A%84%E7%BD%91-%E9%9D%92%E6%9E%A3%E8%AF%BB%E4%B9%A6.mp4',
        // pic: '../src/img/c.png',
        // thumbnails: '../src/img/c.png'
    },     
});

var bookApp = new Vue({
    el:'#book-part',
    data:{
        bookTabShow : 1,
    },
    methods:{
        tabShow:function(index){
            console.log('xixi')
            this.bookTabShow=index;
            console.log(this.bookTabShow)
        }
    }

})