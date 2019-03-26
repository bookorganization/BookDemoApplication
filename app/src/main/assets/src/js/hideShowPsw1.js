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