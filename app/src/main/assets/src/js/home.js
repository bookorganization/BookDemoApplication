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

        event.preventDefault()
       window.WebViewJavascriptBridge.callHandler(
                     'submitFromWeb'
                     , {'param': '中文测试'}
                     , function(responseData) {
                         document.getElementById("show").innerHTML = "send get responseData from java, data = " + responseData
                     }
                 );
    })


    // js bridge
      function testDiv() {
            document.getElementById("show").innerHTML = document.getElementsByTagName("html")[0].innerHTML;
        }

        function testClick() {
            var str1 = document.getElementById("text1").value;
            var str2 = document.getElementById("text2").value;

            //send message to native
            var data = {id: 1, content: "这是一个图片 "};
            window.WebViewJavascriptBridge.send(
                data
                , function(responseData) {
                    document.getElementById("show").innerHTML = "repsonseData from java, data =!!!!!!!!!!!!!!!! " + responseData
                }
            );

        }

        function testClick1() {
            var str1 = document.getElementById("text1").value;
            var str2 = document.getElementById("text2").value;

            //call native method
            window.WebViewJavascriptBridge.callHandler(
                'submitFromWeb'
                , {'param': '中文测试'}
                , function(responseData) {
                    document.getElementById("show").innerHTML = "send get responseData from java, data = " + responseData
                }
            );
        }

        function bridgeLog(logContent) {
            document.getElementById("show").innerHTML = logContent;
        }

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

            bridge.registerHandler("functionInJs", function(data, responseCallback) {
                document.getElementById("show").innerHTML = ("data from Java: = " + data);
                if (responseCallback) {
                    var responseData = "java端调用js代码成功Javascript Says Right back aka!";
                    responseCallback(responseData);
                }
            });
        })
})