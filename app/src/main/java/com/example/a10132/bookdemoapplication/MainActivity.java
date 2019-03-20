package com.example.a10132.bookdemoapplication;

import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.RelativeLayout;
import android.widget.Toast;

import com.example.a10132.bookdemoapplication.widget.PtrClassicFrameLayout;
import com.example.a10132.bookdemoapplication.widget.PtrDefaultHandler;
import com.example.a10132.bookdemoapplication.widget.PtrFrameLayout;
import com.example.a10132.bookdemoapplication.widget.PtrHandler;
import com.github.lzyzsd.jsbridge.BridgeHandler;
import com.github.lzyzsd.jsbridge.BridgeWebView;
import com.github.lzyzsd.jsbridge.BridgeWebViewClient;
import com.github.lzyzsd.jsbridge.CallBackFunction;
import com.github.lzyzsd.jsbridge.DefaultHandler;
import com.google.gson.Gson;

public class MainActivity extends AppCompatActivity{
    private PtrClassicFrameLayout mPtrFrame;
    private BridgeWebView mWebView;
    private RelativeLayout toprl;
    int RESULT_CODE = 0;
    private final String TAG = "MainActivity";
    int i = 0;
    ValueCallback<Uri> mUploadMessage;
    ValueCallback<Uri[]> mUploadMessageArray;
    static class Location {
        String address;
    }

    static class User {
        String name;
        Location location;
        String testStr;
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mWebView = (BridgeWebView)findViewById(R.id.main_webview);
        mPtrFrame= (PtrClassicFrameLayout) findViewById(R.id.main_pcfl);
        toprl = (RelativeLayout)findViewById(R.id.main_top);
        RelativeLayout findrl = (RelativeLayout)findViewById(R.id.main_find_rl);
        RelativeLayout bookrl = (RelativeLayout)findViewById(R.id.main_book_rl);
        RelativeLayout myrl = (RelativeLayout)findViewById(R.id.main_my_rl);
        findrl.setOnClickListener(new MyListener());
        myrl.setOnClickListener(new MyListener());
        WebSettings webSettings =   mWebView.getSettings();
        webSettings.setLoadWithOverviewMode(true);
        mWebView.setDefaultHandler(new DefaultHandler());
        webSettings.setJavaScriptEnabled(true);//支持js脚本
        webSettings.setDomStorageEnabled(true);////设置DOM Storage缓存，不然插件出不来
       // mWebView.setWebViewClient(new WebViewClient());//这句话加上就不能传数据了！
        mWebView.setWebChromeClient(new WebChromeClient(){
            @SuppressWarnings("unused")
            public void openFileChooser(ValueCallback<Uri> uploadMsg, String AcceptType, String capture) {
                this.openFileChooser(uploadMsg);
            }

            @SuppressWarnings("unused")
            public void openFileChooser(ValueCallback<Uri> uploadMsg, String AcceptType) {
                this.openFileChooser(uploadMsg);
            }

            public void openFileChooser(ValueCallback<Uri> uploadMsg) {
                mUploadMessage = uploadMsg;
                pickFile();
            }
            @Override
            public boolean onShowFileChooser(WebView webView, ValueCallback<Uri[]> filePathCallback, FileChooserParams fileChooserParams) {
                mUploadMessageArray = filePathCallback;
                pickFile();
                return true;
            }
        });//用chrome浏览器
        mWebView.loadUrl("file:///android_asset/pages/index.html");
        mWebView.registerHandler("submitFromWeb", new BridgeHandler() {
            @Override
            public void handler(String data, CallBackFunction function) {
                Log.i(TAG, "handler = submitFromWeb, data from web = " + data);
                Toast.makeText(MainActivity.this, "hahaha", Toast.LENGTH_LONG).show();
                function.onCallBack("submitFromWeb exe, response data 中文 from Java");
            }

        });
        mWebView.setDefaultHandler(new BridgeHandler() {
            @Override
            public void handler(String data, CallBackFunction function) {
                String msg = "默认接收到js的数据：" + data;


                function.onCallBack("java默认接收完毕，并回传数据给js"); //回传数据给js
            }
        });
        User user = new User();
        Location location = new Location();
        location.address = "SDU";
        user.location = location;
        user.name = "大头鬼";

        mWebView.callHandler("functionInJs", new Gson().toJson(user), new CallBackFunction() {
            @Override
            public void onCallBack(String data) {
                Log.e("ddd",data);
            }
        });

        mWebView.send("hello");
        initView();
        //hidestatusbar();

        //分支合并测试
    }

    public void pickFile() {
        Intent chooserIntent = new Intent(Intent.ACTION_GET_CONTENT);
        chooserIntent.setType("image/*");
        startActivityForResult(chooserIntent, RESULT_CODE);
    }
    /**
     * 定义底栏点击事件
     */
    class MyListener implements View.OnClickListener{
        @Override
        public void onClick(View v){
            switch (v.getId()){
                case R.id.main_find_rl:
                    i = 0;
                    updateData();
                    toprl.setVisibility(View.VISIBLE);
                    break;
                case R.id.main_my_rl:
                    i =1;
                    updateData();
                    toprl.setVisibility(View.GONE);
                    break;
                case R.id.main_book_rl:

                    break;
            }
        }
    }
    private void initView(){
        mWebView.setWebViewClient(new BridgeWebViewClient(mWebView) {

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                new Handler().postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        mPtrFrame.refreshComplete();
                    }
                }, 1000);
            }


        });
        mPtrFrame.setLastUpdateTimeRelateObject(this);
        mPtrFrame.setPtrHandler(new PtrHandler() {
            @Override
            public boolean checkCanDoRefresh(PtrFrameLayout frame, View content, View header) {
                return PtrDefaultHandler.checkContentCanBePulledDown(frame, mWebView, header);
            }
            @Override
            public void onRefreshBegin(PtrFrameLayout frame) {
                updateData();
            }
        });
        mPtrFrame.setResistance(1.7f);
        mPtrFrame.setRatioOfHeaderHeightToRefresh(1.2f);
        mPtrFrame.setDurationToClose(200);
        mPtrFrame.setDurationToCloseHeader(1000);
        mPtrFrame.setPullToRefresh(false);
        mPtrFrame.setKeepHeaderWhenRefresh(true);

        mPtrFrame.postDelayed(new Runnable() {
            @Override
            public void run() {
                mPtrFrame.autoRefresh();
            }
        }, 1000);
    }
    private void updateData() {
        if(i == 0){
            mWebView.loadUrl("file:///android_asset/pages/index.html");
        }else if(i == 1){
            mWebView.loadUrl("file:///android_asset/pages/me.html");
        }

    }
    /**
     * 隐藏状态栏
     */
    private void hidestatusbar(){
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Window window = getWindow();
            window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS
                    | WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
            window.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                    | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                    | View.SYSTEM_UI_FLAG_LAYOUT_STABLE);
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.setStatusBarColor(Color.TRANSPARENT);
            window.setNavigationBarColor(Color.TRANSPARENT);
        }
    }
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent intent) {
        if (requestCode == RESULT_CODE) {
            if (null == mUploadMessage && null == mUploadMessageArray){
                return;
            }
            if(null!= mUploadMessage && null == mUploadMessageArray){
                Uri result = intent == null || resultCode != RESULT_OK ? null : intent.getData();
                mUploadMessage.onReceiveValue(result);
                mUploadMessage = null;
            }

            if(null == mUploadMessage && null != mUploadMessageArray){
                Uri result = intent == null || resultCode != RESULT_OK ? null : intent.getData();
                mUploadMessageArray.onReceiveValue(new Uri[]{result});
                mUploadMessageArray = null;
            }

        }
    }
}
