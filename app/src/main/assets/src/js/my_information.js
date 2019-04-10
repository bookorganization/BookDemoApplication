var user={
    "result":true,
    "user_vip_expiration_time":1556274833000,
    "user_sex":"男",
    "user_birthday":832089600000,
    "user_name":"苏子棚",
    "user_is_it_vip":"1",
    "user_student_id":100001,
    "user_head_portrait_url":"http://szpstore.oss-cn-beijing.aliyuncs.com/szp.jpg?Expires=1554214940&OSSAccessKeyId=LTAINIcvCcsIqETW&Signature=T25xzgVlZiyvc7weKvdR8Y2S99U%3D",
    "user_grade":null
}

$('#user_name').html(user.user_name)
$('#user_id').html('学号:'+user.user_student_id)
$('#user_head').attr('src',user.user_head_portrait_url)

var now = new Date()
//console.log(now.getTime())

var deadline = user.user_vip_expiration_time    //2019年4月26日
//console.log(deadline)
var ex_time_day = (deadline-now.getTime())/(1000*60*60*24)
// console.log(Math.ceil(ex_time_day))
$('#ex_time_day').html(Math.ceil(ex_time_day)+'天')

var ex_time_day1=Math.floor(ex_time_day)
// console.log(ex_time_day)
// console.log(ex_time_day1)

var ex_time_hour=(ex_time_day-ex_time_day1)*24
//console.log(ex_time_hour)
var ex_time_minute =(ex_time_hour-Math.floor(ex_time_hour))*60
//console.log(ex_time_minute)
$('#ex_time').html(ex_time_day1+'天'+Math.floor(ex_time_hour)+'时'+Math.ceil(ex_time_minute)+'分')