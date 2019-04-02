
//判断分类类型
var videoClassType = $('.hidden-data').attr('classType')
var listurl = 'http://10.112.7.201:8080/booklistbytype'
if(videoClassType == 'recommend'){    
    listurl = 'http://10.112.7.201:8080/bookrecommendmore'      
}else if(videoClassType == 'recent'){
    listurl = 'http://10.112.7.201:8080/bookrecentmore'
}

// 获取图书列表
$.ajax({
    type:'GET',
    // url:'../src/js/test/booklist.json',
    url:listurl,
    context:$('#search-book-list'),
    async:false,
    dataType:'JSON',
    data:{
        "video_type":videoClassType
    },
    success:function(res){
        console.log(res);
        //执行页面渲染
        // ...
            // 图书列表渲染
        var bookListClass = new Vue({
            el: '#search-book-list',
            data: {
                booklist:res      
            },
            created: function () {
            console.log('created 钩子执行...');           
            },

        })
    },
    error:function(res){
        console.log(res);
        //执行页面刷新提示让用户刷新
    }


})




// 图书列表渲染
var bookListHome = new Vue({
    el:'#search-book-list',
    data:{
        booklist:[
            {
                id: '1', 
                cover: '../src/img/b1.png',
                title: "青鸟",
                short: '当孩子想知道幸福是什么，不妨听听《青鸟》的答案。',
                type: '儿童文学',
                playtimes: '2309',
                publishdate: '2019-03-06',
                grade: '1~3',
                url:'book.html'
            }, {
                id: '1',
                cover: '../src/img/b1.png',
                title: "青鸟34",
                short: '当孩子想知道幸福是什么，不妨听听《青鸟》的答案。',
                type: '儿童文学',
                playtimes: '2309',
                publishdate: '2019-03-06',
                grade: '1~3',
                url:'book.html'
            },
        ]
    }
})