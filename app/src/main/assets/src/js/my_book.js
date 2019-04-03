var AJAXcomments2data = [
    {
        "src" : "../src/img/1.png"
    },
    {
        "src" : "../src/img/2.png"
    },
    {
        "src" : "../src/img/3.png"
    }
]

    //异步请求评论
    $.ajax({
        type: 'GET',
        url: '../src/js/test/my_book.json',
        context: $('#content_part1'),
        async: false,
        dataType: 'JSON',
        data: {

        },
        success: function (res) {
            console.log(res);
            //执行页面渲染
            var data = res
            renderBooks(data)
        },
        error: function (res) {
            console.log(res)
            //执行页面刷新提示让用户刷新
            var data = AJAXcomments2data
            renderBooks(data)
        }
    })
    

    //渲染阅读历史
    function renderBooks(data){
        var commentsDom = ''
        //dom 渲染
        for(var i=0;i<data.length;i++){
            if(i%3!=2){
                commentsDom +=
                    '<img class="img_style" src='+data[i].src+'>'
            }else{
                commentsDom +=
                    '<img class="img_style" src='+data[i].src+'>'+
                    '<div class="split_line"></div>'            
            }
        }

        //添加到dom中
        $('#content_part1').html(commentsDom)
    }