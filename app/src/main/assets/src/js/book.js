$(document).ready(function(){
    const dp = new DPlayer({
        container: document.getElementById('dplayer'),
        video: {
            url: 'http://media.qingzaodushu.com/%E5%A4%8F%E6%B4%9B%E7%9A%84%E7%BD%91-%E9%9D%92%E6%9E%A3%E8%AF%BB%E4%B9%A6.mp4',
            // pic: '../src/img/c.png',
            // thumbnails: '../src/img/c.png'
        },
    });

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
