package com.example.a10132.bookdemoapplication;

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

public class BookListActivity extends AppCompatActivity {
    private BridgeWebView mWebView;
    String id;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_book_list);
        Intent intent = getIntent();
        id = intent.getStringExtra("id");
        mWebView = (BridgeWebView)findViewById(R.id.booklist_webview);
        WebSettings webSettings =   mWebView.getSettings();
        webSettings.setLoadWithOverviewMode(true);
        mWebView.setDefaultHandler(new DefaultHandler());
        webSettings.setJavaScriptEnabled(true);//支持js脚本
        webSettings.setDomStorageEnabled(true);////设置DOM Storage缓存，不然插件出不来
        mWebView.setWebChromeClient(new WebChromeClient(){});//用chrome浏览器
        mWebView.loadUrl("file:///android_asset/pages/booklist.html");
        mWebView.send(id, new CallBackFunction() {
            @Override
            public void onCallBack(String data) { //处理js回传的数据
                Toast.makeText(BookListActivity.this, data, Toast.LENGTH_LONG).show();
            }
        });
        mWebView.registerHandler("goToBook", new BridgeHandler() {
            @Override
            public void handler(String data, CallBackFunction function) {
                Intent intent = new Intent(BookListActivity.this, BookActivity.class);
                intent.putExtra("id",data);
                startActivity(intent);
                function.onCallBack("submitFromWeb exe, response data 中文 from Java");
            }

        });
    }
}
