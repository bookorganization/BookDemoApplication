    function connectWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
            callback(WebViewJavascriptBridge)
        } else {
            document.addEventListener(
                'WebViewJavascriptBridgeReady'
                , function() {
                    callback(WebViewJavascriptBridge)
                },
                false
            );
        }
    }

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
                    '</div><div class="split_line"></div>'            
            }
        }

        //添加到dom中
        $('#content_part1').html(commentsDom)
    }

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
                    '</div><div class="split_line"></div>'            
            }
        }

        //添加到dom中
        $('#content_part2').html(commentsDom)
    }

    connectWebViewJavascriptBridge(function (bridge) {
        var sendObj = {}
        bridge.callHandler(
            'account_change', { //接受分类，切换activity
                'content': JSON.stringify(sendObj)
            },
            function (responseData) {
                document.getElementById("show").innerHTML = "send get responseData from java, data = " + responseData
            }
        );
    })

    connectWebViewJavascriptBridge(function (bridge) {
        bridge.init(function (message, responseCallback) {
            console.log('JS got a message', message);
            var data = {
                'Javascript Responds': '测试中文!'
            };
            if (responseCallback) {
                console.log('JS responding with', data)
                responseCallback(message);

                if (message=='false') {   //未登录
                    alert("未登录")
                } else {//登录
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
                    
                    //渲染阅读历史
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

                }
            }
        });
    }) 