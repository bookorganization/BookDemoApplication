package com.example.a10132.bookdemoapplication;

import android.Manifest;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.IBinder;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.widget.Button;
import android.widget.Toast;

import com.github.lzyzsd.jsbridge.BridgeHandler;
import com.github.lzyzsd.jsbridge.BridgeWebView;
import com.github.lzyzsd.jsbridge.CallBackFunction;
import com.github.lzyzsd.jsbridge.DefaultHandler;

import org.json.JSONObject;

import java.util.HashMap;

import cn.sharesdk.framework.Platform;
import cn.sharesdk.framework.PlatformActionListener;
import cn.sharesdk.framework.ShareSDK;
import cn.sharesdk.wechat.friends.Wechat;

public class BookActivity extends AppCompatActivity {
    private static final int WRITE_PERMISSION_CODE = 1000;
    private Context mContext;
    private Button downloadbt;
    private Button deletebt;
    private DownLoadService.DownLoadBinder downLoadBinder;
    private BridgeWebView mWebView;
    String id;
    String bookdata;
    private ServiceConnection serviceConnection = new ServiceConnection() {//连接下载服务
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
        try{
            JSONObject jsonObj = new JSONObject(id);
            SharedPreferences sp=getSharedPreferences("config",BookActivity.this.MODE_PRIVATE);
            String bool = sp.getString("bool","false");
            String time = "no";
            String userid = "no";
            String userisitvip = "0";
            if (bool.equals("false")){
                time = "novip";
                userid = "nouserid";
            }else {
                time = sp.getString("viptime","novip");
                userid = sp.getString("userid", "nouserid");
                userisitvip = sp.getString("userisitvip","0");
            }
            jsonObj.put("time",time);
            jsonObj.put("userid",userid);
            jsonObj.put("userisitvip",userisitvip);
            bookdata = jsonObj.toString();
            Log.i("bookdata",jsonObj.toString());
//            Log.i("time",jsonObj.getString("time"));
        }catch (Exception e){
            Log.e("json","没获取到json");
        }

        viewsDataInit();
       downloadbt = (Button)findViewById(R.id.download_bt);
//        deletebt = (Button)findViewById(R.id.delete_bt);
        downloadbt.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Platform.ShareParams params = new Platform.ShareParams();
                Bitmap logo = BitmapFactory.decodeResource(getResources(), R.mipmap.arrow);
                params.setShareType(Platform.SHARE_WEBPAGE);
                params.setImageData(logo);
                params.setText("Hello");
                params.setTitle("title");
                params.setUrl("http://www.mob.com/");
                Platform wechat = ShareSDK.getPlatform(Wechat.NAME);
                wechat.setPlatformActionListener(new PlatformActionListener() {
                    @Override
                    public void onComplete(Platform platform, int i, HashMap<String, Object> hashMap) {
                        Log.i("ssss","onComplete");
                    }

                    @Override
                    public void onError(Platform platform, int i, Throwable throwable) {
                        Log.i("ssss","onError");
                    }

                    @Override
                    public void onCancel(Platform platform, int i) {
                        Log.i("ssss","onCancel");
                    }
                });
                wechat.share(params);
            }
        });
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
        mWebView.send(bookdata, new CallBackFunction() {
            @Override
            public void onCallBack(String data) { //处理js回传的数据
                Log.i("data",data);
                Toast.makeText(BookActivity.this, data, Toast.LENGTH_LONG).show();
            }
        });
        mWebView.registerHandler("download", new BridgeHandler() {
            @Override
            public void handler(String data, CallBackFunction function) {
               // Toast.makeText(BookActivity.this, data, Toast.LENGTH_LONG).show();
                downLoadBinder.startDownLoad(data);
            }

        });

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
