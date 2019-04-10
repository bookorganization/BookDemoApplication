package com.example.a10132.bookdemoapplication;

import android.Manifest;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.IBinder;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.Button;
import android.widget.Toast;

import com.github.lzyzsd.jsbridge.BridgeHandler;
import com.github.lzyzsd.jsbridge.BridgeWebView;
import com.github.lzyzsd.jsbridge.CallBackFunction;
import com.github.lzyzsd.jsbridge.DefaultHandler;

public class BookActivity extends AppCompatActivity {
    private static final int WRITE_PERMISSION_CODE = 1000;    //文件下载链接
    private String url = "http://XXX/50016582633.mp4";
    private Context mContext;
    private Button downloadbt;
    private Button deletebt;
    private DownLoadService.DownLoadBinder downLoadBinder;
    private BridgeWebView mWebView;
    String id;
    int RESULT_CODE = 0;
    ValueCallback<Uri> mUploadMessage;
    ValueCallback<Uri[]> mUploadMessageArray;
    private ServiceConnection serviceConnection = new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName componentName, IBinder iBinder) {
            downLoadBinder = (DownLoadService.DownLoadBinder) iBinder;
        }
        @Override
        public void onServiceDisconnected(ComponentName componentName) {
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_book);
        mContext = this;
        Intent intent = getIntent();
        id = intent.getStringExtra("id");
        viewsDataInit();
//        downloadbt = (Button)findViewById(R.id.download_bt);
//        deletebt = (Button)findViewById(R.id.delete_bt);
//        downloadbt.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                downLoadBinder.startDownLoad("http://media.qingzaodushu.com/%E5%A4%8F%E6%B4%9B%E7%9A%84%E7%BD%91-%E9%9D%92%E6%9E%A3%E8%AF%BB%E4%B9%A6.mp4");
//            }
//        });
//        deletebt.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                downLoadBinder.cancelDownLoad();
//            }
//        });
        mWebView = (BridgeWebView)findViewById(R.id.book_webview);
        WebSettings webSettings =   mWebView.getSettings();
        webSettings.setLoadWithOverviewMode(true);
        mWebView.setDefaultHandler(new DefaultHandler());
        webSettings.setJavaScriptEnabled(true);//支持js脚本
        webSettings.setDomStorageEnabled(true);////设置DOM Storage缓存，不然插件出不来
        webSettings.setAllowFileAccessFromFileURLs(true);//跨域访问
        mWebView.setWebChromeClient(new WebChromeClient(){});//用chrome浏览器
        mWebView.loadUrl("file:///android_asset/pages/book.html");
        mWebView.send(id, new CallBackFunction() {
            @Override
            public void onCallBack(String data) { //处理js回传的数据
                //Toast.makeText(BookActivity.this, data, Toast.LENGTH_LONG).show();
            }
        });
        mWebView.registerHandler("download", new BridgeHandler() {
            @Override
            public void handler(String data, CallBackFunction function) {
               // Toast.makeText(BookActivity.this, data, Toast.LENGTH_LONG).show();
                downLoadBinder.startDownLoad(data);
            }

        });

//
    }
    private void viewsDataInit() {
        checkUserPermission();
        Intent intent = new Intent(mContext, DownLoadService.class);
        startService(intent);
        bindService(intent, serviceConnection, BIND_AUTO_CREATE);
    }

    /**     * 检查用户权限     */
    private void checkUserPermission() {
        if (ContextCompat.checkSelfPermission(mContext, Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(BookActivity.this, new String[] {Manifest.permission.WRITE_EXTERNAL_STORAGE}, WRITE_PERMISSION_CODE);
        }
    }
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        switch (requestCode) {
            case WRITE_PERMISSION_CODE: {
                if (grantResults.length > 0 && grantResults[0] != PackageManager.PERMISSION_GRANTED) {
                    Toast.makeText(mContext, "拒绝权限将无法开启下载服务", Toast.LENGTH_SHORT).show();
                }
                break;
            }
            default:break;
        }
    }
}
