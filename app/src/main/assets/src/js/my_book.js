    var data = {};
    data.user_id = 1;
    $.ajax({
        url: "http://10.112.7.201:8080/getcollection",
        async: true,
        type: "post",
        data: data,
        dataType: "json",
        success: function (data) {
            console.log(data)
            renderBooks(data)

        }
    });
    
    //异步请求评论
    // $.ajax({
    //     type: 'GET',
    //     url: "http://localhost:8080/getcollection",
    //     context: $('#content_part1'),
    //     async: false,
    //     dataType: 'JSON',
    //     data: {

    //     },
    //     success: function (res) {
    //         console.log(res);
    //         //执行页面渲染
    //         var data = res
    //         renderBooks(data)
    //     },
    //     error: function (res) {
    //         console.log(res)
    //         //执行页面刷新提示让用户刷新
    //     }
    // })

    //渲染阅读历史
    function renderBooks(data){
        var commentsDom = ''
        //dom 渲染
        for(var i=0;i<data.length;i++){
            if(i%3!=2){
                commentsDom += '<div class="img_sad_style"> <img class="img_style" src='+
                data[i].video_cover_url+'> </div>'
            }else{
                commentsDom +=
                    '<div class="img_sad_style"> <img class="img_style" src='+data[i].video_cover_url+'>'+
                    '<div class="split_line"></div>'            
            }
        }

        //添加到dom中
        $('#content_part1').html(commentsDom)
    }

    $.ajax({
        url: "http://10.112.7.201:8080/gethistory",
        async: true,
        type: "post",
        data: data,
        dataType: "json",
        success: function (data) {
            console.log(data)
            BookHistorys(data)
        }
    });
    
    function BookHistorys(data){
        var commentsDom = ''
        //dom 渲染
        for(var i=0;i<data.length;i++){
            if(i%3!=2){
                commentsDom += '<div class="img_sad_style"> <img class="img_style" src='+
                data[i].video_cover_url+'> </div>'
            }else{
                commentsDom +=
                    '<div class="img_sad_style"> <img class="img_style" src='+data[i].video_cover_url+'>'+
                    '<div class="split_line"></div> </div>'            
            }
        }

        //添加到dom中
        $('#content_part2').html(commentsDom)
    }