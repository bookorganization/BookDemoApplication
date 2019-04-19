var OrangeUI = function(obj){
    var _this = this
    this.value = obj.value    //暂未定
    this.contentDOM = obj.contentDOM    //弹框Dom
    this.contentWrapper = obj.contentWrapper    //弹框外div
    this.noteText = obj.noteText //提示内容

    console.log(this.value)
    this.pop = function(){
        console.log(this.value)
    }
    //创建遮罩
    this.makMask = function(){
        var maskDom = '<div class="orangeui-modal orangeui-modal-on" style="z-index: 2000;"></div>'
        if(document.getElementsByClassName('orangeui-modal').length==0){
            console.log(document.getElementsByClassName('orangeui-modal'))
            $('body').append(maskDom)            
        }
        
    }
    //显示遮罩
    this.makeMaskShow = function(){        
        if($('.orangeui-modal').hasClass('orangeui-modal-off')){
            $('.orangeui-modal').addClass('orangeui-modal-on')
            $('.orangeui-modal').removeClass('orangeui-modal-off')
        }
        //显示设置样式        
        $('.orangeui-modal-on').css({
            position: 'fixed',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            opacity: .5,
            background: '#000'
        })
        $('.orangeui-modal-on').on('click',function(){
            // console.log('关闭')
            // console.log(_this.makeMaskHide())
            _this.makeMaskHide()
            // makeMaskHide()
        })
    }
    //隐藏遮罩
    this.makeMaskHide = function(){
        // console.log('this')
        if($('.orangeui-modal').hasClass('orangeui-modal-on')){
            $('.orangeui-modal').addClass('orangeui-modal-off')
            $('.orangeui-modal').removeClass('orangeui-modal-on')
        }
        $('.orangeui-modal-off').css({            
            width: 0,
            height: 0
        })
    }
    //添加弹框到页面中
    this.content = function(){
        var contentDOM = this.contentDOM
        var wrapper = this.contentWrapper
        $(wrapper).html(contentDOM)
        // $(wrapper).css({
        //     display:'block'
        // })
    }

    //默认弹框
    this.note = function(note_info){
        console.log(note_info)
        var noteHtml = '<div class="orangeui-note-defalut">'+ note_info +'</div>'
        if(document.getElementsByClassName('orangeui-note-defalut').length==0){
            $('body').append(noteHtml)            
        }
        $('.orangeui-note-defalut').text(note_info)
             
        $('.orangeui-note-defalut').css({
            padding:"5px 10px",
            position:"fixed",
            top:"50%",
            left:"50%",
            color:"#fff",
            backgroundColor:"#494A4B",
            opacity:"0", 
            "border-radius":"3px"
        })
        var noteWidth = $('.orangeui-note-defalut').width()
        var noteHeight = $('.orangeui-note-defalut').height()
        var marginTopValue = "-"+noteHeight/2+"px"
        var marginLeftValue = "-"+noteWidth/2+"px"
        $('.orangeui-note-defalut').css({
            display:'block',
            opacity:"0.9", 
            "margin-top":marginTopValue,
            "margin-left":marginLeftValue,
        })       
        var noteTimer = setTimeout(function(){
            $('.orangeui-note-defalut').css({
                display:'none'
            })
        },1000)
    }

    //初始化
    this.content()
    // this.pop(this.value)
}