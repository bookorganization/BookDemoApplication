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