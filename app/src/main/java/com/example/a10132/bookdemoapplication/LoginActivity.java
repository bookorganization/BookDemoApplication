package com.example.a10132.bookdemoapplication;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.widget.Toast;

import com.github.lzyzsd.jsbridge.BridgeHandler;
import com.github.lzyzsd.jsbridge.BridgeWebView;
import com.github.lzyzsd.jsbridge.CallBackFunction;
import com.github.lzyzsd.jsbridge.DefaultHandler;

import org.json.JSONArray;
import org.json.JSONObject;

//import net.sf.json.JSONObject;


public class LoginActivity extends AppCompatActivity {
    private BridgeWebView mWebView;
    private final String TAG = "LoginActivity";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        mWebView = (BridgeWebView)findViewById(R.id.login_webview);
        WebSettings webSettings =  mWebView.getSettings();
        webSettings.setLoadWithOverviewMode(true);
        mWebView.setDefaultHandler(new DefaultHandler());
        webSettings.setJavaScriptEnabled(true);//支持js脚本
        webSettings.setDomStorageEnabled(true);////设置DOM Storage缓存，不然插件出不来
        webSettings.setAllowFileAccessFromFileURLs(true);//跨域访问
        mWebView.setWebChromeClient(new WebChromeClient(){});//用chrome浏览器
        mWebView.loadUrl("file:///android_asset/pages/login_register.html");
        mWebView.registerHandler("password_login", new BridgeHandler() {
            @Override
            public void handler(String data, CallBackFunction function) {
                Log.i(TAG, "handler = submitFromWeb, data from web = " + data);
                String user;
                String viptime ;
                String userid;
                String userisitvip;
                try{
                    JSONObject jsonObj = new JSONObject(data);
                    user = jsonObj.getString("user");
                    JSONObject jsonObj2 = new JSONObject(user);
                    Log.i("jsonObj2",jsonObj2.toString());
                    viptime = jsonObj2.getString("user_vip_expiration_time");
                    userid = jsonObj2.getString("user_id");
                    userisitvip = jsonObj2.getString("user_is_it_vip");
                    saveUserInfo(LoginActivity.this, userid, viptime, userisitvip);
                    Toast.makeText(LoginActivity.this, viptime, Toast.LENGTH_SHORT).show();
                }catch (Exception e){
                    Log.i("出错误了嘛！！！！！！", e+"");
                }
                Intent intent = new Intent(LoginActivity.this, MainActivity.class);
                startActivity(intent);
                function.onCallBack("收到changeClass");
            }

        });
    }
    public void saveUserInfo(Context context, String userid, String viptime, String userisitvip) {
        SharedPreferences sp=getSharedPreferences("config",context.MODE_PRIVATE);
        SharedPreferences.Editor editor=sp.edit();
        //Toast.makeText(LoginActivity.this, data, Toast.LENGTH_SHORT).show();
        editor.putString("userid",userid);
        editor.putString("viptime",viptime);
        editor.putString("bool","true");
        editor.putString("userisitvip",userisitvip);
        editor.commit();
    }
}
