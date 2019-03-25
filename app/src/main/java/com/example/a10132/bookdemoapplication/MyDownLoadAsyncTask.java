package com.example.a10132.bookdemoapplication;

//import android.os.AsyncTask;
//
//import android.app.DownloadManager;
//import android.content.Context;
//import android.database.Cursor;
//import android.net.Uri;
//import android.os.AsyncTask;
//import android.util.Log;
//import android.widget.ProgressBar;
//import android.widget.TextView;
//import android.widget.Toast;
//import java.io.File;
//import java.io.PrintWriter;
//import java.io.StringWriter;
//import static android.content.Context.DOWNLOAD_SERVICE;
//
//
//
//public class MyDownLoadAsyncTask extends AsyncTask<Integer,Integer,String> {
//
//    private TextView tvTitle;
//    private ProgressBar pbarDownLoad;
//    private Context mContext;
//
//    private static String HOST_PC_IP = "cdn.llscdn.com";
//    private long currentDownloadID;
//    private boolean idDownloading = true;
//    private String urlPath;
//
//    public MyDownLoadAsyncTask(Context mContext, TextView tvTitle, ProgressBar pbarDownLoad, String urlPath) {
//        this.mContext = mContext;
//        this.tvTitle = tvTitle;
//        this.pbarDownLoad = pbarDownLoad;
//        this.urlPath = urlPath;
//    }
//
//    @Override
//    protected String doInBackground(Integer... integers) {
//        downloadByDownloadManager(mContext, urlPath);
//        return String.valueOf(integers[0].intValue());
//    }
//
//    @Override
//    protected void onPreExecute() {
//        Toast.makeText(mContext, "开始下载", Toast.LENGTH_SHORT).show();
//        super.onPreExecute();
//    }
//
//    @Override
//    protected void onProgressUpdate(Integer... values) {
//        int value = values[0];
//        if (value <= 100) {
//            pbarDownLoad.setProgress(value);
//            if (value == 100) {
//                Toast.makeText(mContext, "下载完成", Toast.LENGTH_SHORT).show();
//            }
//        }
//    }
//
//    //"https://cdn.llscdn.com/yy/files/xs8qmxn8-lls-LLS-5.8-800-20171207-111607.apk"
//    // 4下载器下载
//    public void downloadByDownloadManager(Context context, String downloadUrlStr) {
//        StringBuffer httpDownloadUrl = new StringBuffer("https://")
//                .append(HOST_PC_IP)
//                .append(downloadUrlStr);
//
//        DownloadManager.Request downloadRequest = new DownloadManager.Request(Uri.parse(httpDownloadUrl.toString()));
//        // 通过setAllowedNetworkTypes方法可以设置允许在何种网络下下载
//        downloadRequest.setAllowedNetworkTypes(DownloadManager.Request.NETWORK_WIFI);
//        downloadRequest.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
//        // 文件后缀
//        String fileFormat = PublicMethodUtils.regGetFileFormat(downloadUrlStr);
//        // 获取文件名
//        String resourceName = PublicMethodUtils.regFormatInFile(downloadUrlStr, fileFormat);
//        // 本地保存地址
//        String resourcePath = PublicMethodUtils.getResourcePath();
//        // 下载标题
//        downloadRequest.setTitle("下载" + resourceName);
//        File saveFile = new File(resourcePath, resourceName);
//        downloadRequest.setDestinationUri(Uri.fromFile(saveFile));
//
//        DownloadManager manager = (DownloadManager) context.getSystemService(DOWNLOAD_SERVICE);
//        currentDownloadID = manager.enqueue(downloadRequest);
//        Log.e("e", "DownloadManager start downloading ---------");
//        // 获取下载进度
//        getDownloadProgress(manager, currentDownloadID, resourceName);
//
//    }
//
//    // 5下载进度并返回完成
//    public void getDownloadProgress(final DownloadManager manager,final long downloadID, final String resourceName) {
//        while (idDownloading) {
//            DownloadManager.Query query = new DownloadManager.Query();
//            query.setFilterById(downloadID);
//            Cursor cursor = manager.query(query);
//
//            if (cursor.moveToFirst()) {
//                long bytesDownloaded = cursor.getInt(cursor.getColumnIndex(DownloadManager.COLUMN_BYTES_DOWNLOADED_SO_FAR));
//                long bytesTotal = cursor.getInt(cursor.getColumnIndex(DownloadManager.COLUMN_TOTAL_SIZE_BYTES));
//                final int downloadProgress = (int) (bytesDownloaded * 100 / bytesTotal);
//
//                publishProgress(downloadProgress);
//
//                Log.e("e",resourceName + ":下载进度: " + downloadProgress + "%");
//                if (downloadProgress == 100) {
//                    currentDownloadID = -1;
//                    break;
//                } else {
//                    try {
//                        Thread.sleep(500);
//                    } catch (InterruptedException e) {
//                        StringWriter stringWriter = new StringWriter();
//                        e.printStackTrace(new PrintWriter(stringWriter, true));
//                    }
//                }
//
//                /*int status = cursor.getInt(cursor.getColumnIndexOrThrow(DownloadManager.COLUMN_STATUS));
//                if (status == DownloadManager.STATUS_PENDING) {
//                    Log.e("status", "pengding");
//                } else if (status ==DownloadManager.STATUS_PAUSED) {
//                    Log.e("status", "paused");
//                } else if (status == DownloadManager.STATUS_RUNNING) {
//                    Log.e("status", "runing");
//                } else if (status == DownloadManager.STATUS_SUCCESSFUL) {
//                    Log.e("status", "successful");
//                    break;
//                } else if (status == DownloadManager.STATUS_FAILED) {
//                    Log.e("status", "failed");
//                    break;
//                }*/
//                cursor.close();
//            }
//        }
//    }
//
//    public void remove(Context context){
//        DownloadManager downloadManager = (DownloadManager) context.getSystemService(DOWNLOAD_SERVICE);
//        if (currentDownloadID >= 0){
//            downloadManager.remove(currentDownloadID);
//        }
//        idDownloading = false;
//    }
//}
