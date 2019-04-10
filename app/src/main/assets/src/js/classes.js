//【跳转到书籍列表】  
//go to boolist.html
$('.class-tag').on('click',function(){   
    var tagValue = $(this).attr("tagvalue")
    var type = $(this).attr("type")
    var sendObj = {}
    sendObj.tagValue = tagValue
    sendObj.type = type

    console.log(sendObj)
    
    // console.log('go to boolist.html,class tag is '+$(this).attr("classTag"))
    // event.preventDefault()
    JsBridge.callHandler(
        'changeClass', { //接受分类，切换activity
            'classTag': JSON.stringify(sendObj)
        },
        function (responseData) {
            document.getElementById("show").innerHTML = "send get responseData from java, data = " + responseData
        }
    );
})