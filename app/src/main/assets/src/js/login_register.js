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