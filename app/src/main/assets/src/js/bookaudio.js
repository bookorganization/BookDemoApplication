var audioUrl = getCookie("audiourl")
var audioCover = getCookie("audiocover")

console.log(document.cookie)

MusicAudioPlayer('audio-my', audioUrl)
$('.audio-img-cover').css('background',"url("+ audioCover+")  no-repeat center")

// back to book.html
$('.audio-back-bar').on("click",function(){
    window.history.go(-1);
})

// get Cookie
function getCookie(cname)
{
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) 
  {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}
