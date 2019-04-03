//判断分类类型
var videoClassType = $('.hidden-data').attr('tagvalue')
var searchType = $('.hidden-data').attr('type')
var listurl = 'http://10.112.7.201:8080/booklistbytype'
var sendData = {}
if(videoClassType == 'recommend' && searchType == 'other'){    
    listurl = 'http://10.112.7.201:8080/bookrecommendmore'//获取推荐更多    
}else if(videoClassType == 'recent' && searchType == 'other'){
    listurl = 'http://10.112.7.201:8080/bookrecentmore'//获取最近更多    
}else if(searchType == 'type'){
    listurl = 'http://10.112.7.201:8080/booklistbytype'//根据分类id获取列表
    sendData.video_type = videoClassType
}else if(searchType == 'teacher'){
    listurl = 'http://10.112.7.201:8080/getbooklistbyid'//通过讲师获取列表
    sendData.lecturer_id = videoClassType
}
// else if(searchType == 'type'){
//     listurl = 'http://10.112.7.201:8080/getbooklistbyid'//通过讲师获取列表
//     sendData.lecturer_id = videoClassType
// }

// 图书列表渲染
var bookListClass = new Vue({
    el: '#search-book-list',
    data: {
        booklist:[]      
    },
    created: function () {
    console.log('created 钩子执行...');           
    },

})

// 获取图书列表
$.ajax({
    type:'GET',
    // url:'../src/js/test/booklist.json',
    url:listurl,
    context:$('#search-book-list'),
    async:false,
    dataType:'JSON',
    data:sendData,
    success:function(res){
        console.log(res);
        //执行页面渲染
        // ...
        bookListClass.$data.booklist = res
            
        
    },
    error:function(res){
        console.log(res);
        //执行页面刷新提示让用户刷新
    }


})

//搜索提交 发起请求
$('.search-zone-input').bind('keydown',function(event){
    if(event.keyCode == "13")    
    {
        var keyWords = $.trim($('.search-zone-input').val())
        console.log(keyWords)
        //发送搜索字
        $.ajax({
            type:'post',
            url:'http://10.112.7.201:8080/search',
            async:true,
            dataType:'JSON',
            data:{
                video_name:keyWords
            },
            success:function(res){
                console.log(res);
                //执行页面渲染
                // ...
                bookListClass.$data.booklist = res
            },
            error:function(res){
                console.log(res);
                //执行页面刷新提示让用户刷新
            }
        
        
        })         
    }
  });


