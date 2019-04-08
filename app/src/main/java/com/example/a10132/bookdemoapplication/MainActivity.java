package com.example.a10132.bookdemoapplication;

import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.media.Image;
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
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;
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

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;

public class MainActivity extends AppCompatActivity{
    private PtrClassicFrameLayout mPtrFrame;
    private BridgeWebView mWebView;
    private RelativeLayout toprl;
    private ImageView findimg;
    private ImageView bookimg;
    private ImageView myimg;
    private TextView findtv;
    private TextView booktv;
    private TextView mytv;
    private RelativeLayout researchrl;
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
        findimg = (ImageView)findViewById(R.id.main_find_img);
        bookimg = (ImageView)findViewById(R.id.main_book_img);
        myimg = (ImageView)findViewById(R.id.main_my_img);
        findtv = (TextView)findViewById(R.id.main_find_tv);
        booktv = (TextView)findViewById(R.id.main_book_tv);
        mytv = (TextView)findViewById(R.id.main_my_tv);
        researchrl = (RelativeLayout)findViewById(R.id.main_research_rl);
        researchrl.setOnClickListener(new MyListener());
        findrl.setOnClickListener(new MyListener());
        myrl.setOnClickListener(new MyListener());
        bookrl.setOnClickListener(new MyListener());
        WebSettings webSettings =   mWebView.getSettings();
        webSettings.setLoadWithOverviewMode(true);
        mWebView.setDefaultHandler(new DefaultHandler());
        webSettings.setJavaScriptEnabled(true);//支持js脚本
        webSettings.setDomStorageEnabled(true);////设置DOM Storage缓存，不然插件出不来
        Intent i = getIntent();
//        i.getStringExtra("inf");
//        if(!(i.getStringExtra("inf").equals(null))){
//            String data = getTxtFileInfo(MainActivity.this);
//            Toast.makeText(MainActivity.this, data, Toast.LENGTH_LONG).show();
//        }

        mWebView.setWebChromeClient(new WebChromeClient(){

        });//用chrome浏览器
        mWebView.loadUrl("file:///android_asset/pages/index.html");
        mWebView.registerHandler("goToBook", new BridgeHandler() {
            @Override
            public void handler(String data, CallBackFunction function) {
                Log.i(TAG, "handler = submitFromWeb, data from web = " + data);
                Intent intent = new Intent(MainActivity.this, BookActivity.class);
                intent.putExtra("id",data);
                startActivity(intent);
                function.onCallBack("submitFromWeb exe, response data 中文 from Java");
            }

        });
        mWebView.registerHandler("changeClass", new BridgeHandler() {
            @Override
            public void handler(String data, CallBackFunction function) {
                Log.i(TAG, "handler = submitFromWeb, data from web = " + data);
                //Toast.makeText(MainActivity.this, data, Toast.LENGTH_SHORT).show();
                Intent intent = new Intent(MainActivity.this, BookListActivity.class);
                intent.putExtra("id",data);
                startActivity(intent);
                function.onCallBack("收到changeClass1");
            }

        });
        mWebView.registerHandler("searchType", new BridgeHandler() {
            @Override
            public void handler(String data, CallBackFunction function) {
                Log.i(TAG, "handler = submitFromWeb, data from web = " + data);
                //Toast.makeText(MainActivity.this, data, Toast.LENGTH_SHORT).show();
                Intent intent = new Intent(MainActivity.this, ClassesActivity.class);
                startActivity(intent);
                function.onCallBack("收到changeClass");
            }

        });
          initView();
       //hidestatusbar();

        //分支合并测试
    }
    public static String getTxtFileInfo(Context context) {
        try {
            // 创建FIle对象
            File file = new File(context.getFilesDir(), "userinfo.txt");
            // 创建FileInputStream对象
            FileInputStream fis = new FileInputStream(file);
            // 创建BufferedReader对象
            BufferedReader br = new BufferedReader(new InputStreamReader(fis));
            // 获取文件中的内容
            String content = br.readLine();
            // 创建Map集合
            // 保存到map集合中
//            map.put("username", contents[0]);
//            map.put("password", contents[1]);
            // 关闭流对象
            fis.close();
            br.close();
            return content;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
//    public void pickFile() {
//        Intent chooserIntent = new Intent(Intent.ACTION_GET_CONTENT);
//        chooserIntent.setType("image/*");
//        startActivityForResult(chooserIntent, RESULT_CODE);
//    }
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
                    initImage();
                    findimg.setImageResource(R.mipmap.index1);
                    findtv.setTextColor(getResources().getColor(R.color.green));
                    toprl.setVisibility(View.VISIBLE);
                    break;
                case R.id.main_my_rl:
                    i = 1;
                    updateData();
                    initImage();
                    myimg.setImageResource(R.mipmap.my1);
                    mytv.setTextColor(getResources().getColor(R.color.green));
                    toprl.setVisibility(View.GONE);
                    break;
                case R.id.main_book_rl:
                    i = 2;
                    updateData();
                    initImage();
                    bookimg.setImageResource(R.mipmap.book1);
                    booktv.setTextColor(getResources().getColor(R.color.green));
                    toprl.setVisibility(View.GONE);
                    break;
                case R.id.main_research_rl:
                    Intent intent = new Intent(MainActivity.this, ClassesActivity.class);
                    startActivity(intent);
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
            mWebView.loadUrl("file:///android_asset/pages/my_information.html");
        }else if(i == 2){
            mWebView.loadUrl("file:///android_asset/pages/my_book.html");
        }

    }
    private  void initImage() {
        findtv.setTextColor(getResources().getColor(R.color.gray5));
        booktv.setTextColor(getResources().getColor(R.color.gray5));
        mytv.setTextColor(getResources().getColor(R.color.gray5));
        findimg.setImageResource(R.mipmap.index2);
        bookimg.setImageResource(R.mipmap.book2);
        myimg.setImageResource(R.mipmap.my2);
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
