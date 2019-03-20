$(document).ready(function(){

    // 轮播图加载
    var swiper = new Swiper('.swiper-container', {
        pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,        
        },
        autoplay: {
            delay: 2000,
        },
    });

    // 点击图书块传数据
    $('.book-box').on('click',function(event){
        var sendAddr = $(this).attr('href')
        // $('.book-title').text('repsonseData from java, data =!!!!!!!!!!!!!!!!')
        event.preventDefault()
        window.WebViewJavascriptBridge.callHandler(
            "javaWebViewHandler",
            sendAddr,
            function(responseData) {
                $('.book-title').text('repsonseData from java, data =!!!!!!!!!!!!!!!!')
                console.log("repsonseData from java, data =!!!!!!!!!!!!!!!! ")
            }
        );
    })
    

    // js bridge
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

    
    
    connectWebViewJavascriptBridge(function(bridge) {
        bridge.init(function(message, responseCallback) {
            console.log('JS got a message', message);
            var data = {
                'Javascript Responds': '测试中文!'
            };
    
            if (responseCallback) {
                console.log('JS responding with', data);
                responseCallback(data);
            }
        });
    
        bridge.registerHandler("functionJs", function(data, responseCallback) {
            // document.getElementById("show").innerHTML = ("data from Java: = " + data);
            if (responseCallback) {
                var responseData = "java端调用js代码成功Javascript Says Right back aka!";
                responseCallback(responseData);
            }
        });
    })

})
