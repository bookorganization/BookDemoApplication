function checkout(demo_id){
    
    var demo_login = document.getElementById("login_text");
    var demo_register = document.getElementById("register_text");
    var demo_login_page = document.getElementById("login");
    var demo_register_page = document.getElementById("register");
    var demo_login1_page = document.getElementById("login_paswd");

    if(demo_id=='login_text'){
        //登录的页面显示
        demo_login.className='title_text select';
        demo_register.className='title_text notselect';
        demo_login_page.style.display='block';
        demo_login1_page.style.display='none';
        demo_register_page.style.display='none';
    }else{
        //注册的页面显示
        demo_login.className='title_text notselect';
        demo_register.className='title_text select';     
        demo_login_page.style.display='none';
        demo_login1_page.style.display='none';
        demo_register_page.style.display='block';       
    }
}

function turn_off(a_id){
    var demo_login_page = document.getElementById("login");
    var demo_login_page1 = document.getElementById("login_paswd");

    if(a_id=='login_pas'){
        demo_login_page.style.display='none';
        demo_login_page1.style.display='block';
    }else{
        demo_login_page.style.display='block';
        demo_login_page1.style.display='none';          
    }
}

//隐藏text block，显示password block
function hideShowPsw(){
    var demo_img = document.getElementById("visible_img");
    var demoInput = document.getElementById("input_paswd");

    if (demoInput.type == "password") {
        demoInput.type = "text";
        demo_img.src = "../src/img/invisible.png";
    }else {
        demoInput.type = "password";
        demo_img.src = "../src/img/visible.png";
    }
}

//隐藏text block，显示password block
function hideShowPsw1(){
    var demo_img = document.getElementById("visible_img1");
    var demoInput = document.getElementById("input_paswd1");

    if (demoInput.type == "password") {
        demoInput.type = "text";
        demo_img.src = "../src/img/invisible.png";
    }else {
        demoInput.type = "password";
        demo_img.src = "../src/img/visible.png";
    }
}


function login() {
    $.ajax({
    //几个参数需要注意一下
        type: "post",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "http://10.112.7.210:8080/sendSms",
        data: $('#form .user_phone').serialize(),
        success: function (result) {
            console.log(result);//打印服务端返回的数据(调试用)

        },
        error : function() {
            alert("异常！");
        }
    });
}

function login0() {
    $.ajax({
    //几个参数需要注意一下
        type: "post",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "http://10.112.7.210:8080/register",
        data: $('#form').serialize(),
        success: function (result) {
            console.log(result);//打印服务端返回的数据(调试用)

        },
        error : function() {
            alert("异常！");
        }
    });
}


function login1() {
    var url = $('#user_phone1').val();
    console.log(url);
    $.ajax({
    //几个参数需要注意一下
        type: "post",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "http://10.112.7.201:8080/loginbypassword/",
        data: $('#form1').serialize(),
        
        success: function (result) {
            console.log(result);//打印服务端返回的数据(调试用)
            console.log(JSON.stringify(result));//打印服务端返回的数据(调试用)
            JsBridge.callHandler(
            'password_login', { //接受分类，切换activity
                'user_phone': JSON.stringify(result),
            },
        );
            alert("SUCCESS");
        },

        error : function() {
            // alert("异常！");
        }
    });
}

function login2() {
    $.ajax({
    //几个参数需要注意一下
        type: "post",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "http://10.112.7.210:8080/sendSms",
        data: $('#form2 .user_phone').serialize(),
        success: function (result) {
            console.log(result);//打印服务端返回的数据(调试用)
        },
        error : function() {
            alert("异常！");
        }
    });
}


function login3() {

    console.log($('#form2').serialize());
    $.ajax({
    //几个参数需要注意一下
        type: "post",//方法类型
        async : true,
        dataType: "json",//预期服务器返回的数据类型
        url: "http://10.112.7.210:8080/register",
        data: $('#form2').serialize(),
        //data: data,
        success: function (result) {
            console.log(result);//打印服务端返回的数据(调试用)
        },
        error : function() {
            alert("异常！");
        }
    });
}