MusicAudioPlayer('audio-my', 'https://s128.xiami.net/687/6687/2104168739/1806616449_1541043641973.mp3?ccode=xiami_web_web&expire=86400&duration=240&psid=5a54e0d90962a30a467863fdaf9297d4&ups_client_netip=2001:da8:215:6a01::ffb1&ups_ts=1553234584&ups_userid=0&utid=/vxME3UB9VsCAbfND4UXs9T7&vid=1806616449&fn=1806616449_1541043641973.mp3&vkey=Ba58a5ea5956a32508407646c0e733677')
var audioCover = "https://pic.xiami.net/images/album/img86/119/5bda74d599ad1_5955586_1541043413.jpg?x-oss-process=image/resize,limit_0,s_410,m_fill"
$('.audio-img-cover').css('background',"url("+ audioCover+")  no-repeat center")

// 返回视频
$('.audio-back-bar').on("click",function(){
    window.location = "book.html"
})
