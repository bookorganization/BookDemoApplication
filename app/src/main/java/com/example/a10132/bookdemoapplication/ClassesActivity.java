package com.example.a10132.bookdemoapplication;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;

import com.github.lzyzsd.jsbridge.BridgeHandler;
import com.github.lzyzsd.jsbridge.BridgeWebView;
import com.github.lzyzsd.jsbridge.CallBackFunction;
import com.github.lzyzsd.jsbridge.DefaultHandler;

public class ClassesActivity extends AppCompatActivity {
    private BridgeWebView mWebView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_classes);
        mWebView = (BridgeWebView)findViewById(R.id.classes_webview);
        mWebView.setDefaultHandler(new DefaultHandler());
        WebSettings webSettings =   mWebView.getSettings();
        webSettings.setLoadWithOverviewMode(true);
        webSettings.setJavaScriptEnabled(true);//支持js脚本
        webSettings.setDomStorageEnabled(true);////设置DOM Storage缓存，不然插件出不来
        webSettings.setAllowFileAccessFromFileURLs(true);//跨域访问
        mWebView.setWebChromeClient(new WebChromeClient(){

        });//用chrome浏览器
        mWebView.loadUrl("file:///android_asset/pages/classes.html");
        mWebView.registerHandler("changeClass", new BridgeHandler() {
            @Override
            public void handler(String data, CallBackFunction function) {
                Intent intent = new Intent(ClassesActivity.this, BookListActivity.class);
                intent.putExtra("id",data);
                startActivity(intent);
                function.onCallBack("submitFromWeb exe, response data 中文 from Java");
            }

        });
    }
}
