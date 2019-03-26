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