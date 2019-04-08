package com.example.a10132.bookdemoapplication;

import android.content.Context;
import android.content.Intent;
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

import java.io.File;
import java.io.FileOutputStream;

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
        mWebView.setWebChromeClient(new WebChromeClient(){});//用chrome浏览器
        mWebView.loadUrl("file:///android_asset/pages/login_register.html");
        mWebView.registerHandler("password_login", new BridgeHandler() {
            @Override
            public void handler(String data, CallBackFunction function) {
                Log.i(TAG, "handler = submitFromWeb, data from web = " + data);
                //Toast.makeText(LoginActivity.this, data, Toast.LENGTH_SHORT).show();
                saveUserInfo(LoginActivity.this, data);
                Intent intent = new Intent(LoginActivity.this, MainActivity.class);
                intent.putExtra("inf",data);
                startActivity(intent);
                Toast.makeText(LoginActivity.this, "", Toast.LENGTH_SHORT).show();
                function.onCallBack("收到changeClass");
            }

        });
    }
    public static boolean saveUserInfo(Context context, String data) {
        try {
            // 使用Android上下问获取当前项目的路径
            File file = new File(context.getFilesDir(), "userinfo.txt");
            // 创建输出流对象
            FileOutputStream fos = new FileOutputStream(file);
            // 向文件中写入信息
            fos.write((data).getBytes());
            // 关闭输出流对象
            fos.close();
            return true;
        } catch (Exception e) {
            throw new RuntimeException();
        }
    }
}
