package com.musify.packages;
import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.database.Cursor;
import android.net.Uri;
import android.os.Environment;
import android.os.Handler;
import android.os.Looper;
import android.provider.MediaStore;
import androidx.annotation.NonNull;
import androidx.core.content.ContextCompat;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;

public class MusicFilesModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
    private  DownloadManager downloadManager;
    private  long downloadId;
    public MusicFilesModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }
    @NonNull
    @Override
    public String getName() {
        return "ApplicationCore";
    }
    @ReactMethod
    public void getDeveloper(Promise promise){
        promise.resolve("promise");
}
    @ReactMethod
    public void downloadMusic(String url, Promise promise){
        DownloadManager.Request request = new DownloadManager.Request(Uri.parse(url));
        request.setDestinationInExternalPublicDir(Environment.DIRECTORY_MUSIC,"appleBall.mp3");
        request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE);
        downloadManager = (DownloadManager)reactContext.getSystemService(Context.DOWNLOAD_SERVICE);


        BroadcastReceiver receiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                DownloadManager.Query query = new DownloadManager.Query();
                query.setFilterById(downloadId);
                Cursor cursor = downloadManager.query(query);

                if(cursor.moveToNext()){
                    int columnIndexStatus = cursor.getColumnIndex(DownloadManager.COLUMN_STATUS);
                    int status = cursor.getInt(columnIndexStatus);
                    if(status==DownloadManager.STATUS_RUNNING){
                        int columnIndexBytesDownloaded = cursor.getColumnIndex(DownloadManager.COLUMN_BYTES_DOWNLOADED_SO_FAR);
                        int columnIndexBytesTotal = cursor.getColumnIndex(DownloadManager.COLUMN_TOTAL_SIZE_BYTES);

                        long bytesDownloaded = cursor.getLong(columnIndexBytesDownloaded);
                        long totalBytes = cursor.getLong(columnIndexBytesTotal);
                        if(totalBytes>0){
                            int progress = (int) ((bytesDownloaded * 100) / totalBytes);
                            WritableMap progressMap = new WritableNativeMap();
                            progressMap.putDouble("progress", progress);
                            progressMap.putDouble("bytesDownloaded", bytesDownloaded);
                            progressMap.putDouble("totalBytes", totalBytes);
                            new Handler(Looper.getMainLooper()).post(() -> {
                                promise.resolve(progressMap);
                            });
                        }
                    }
                }else {
                    new Handler(Looper.getMainLooper()).post(() -> {
                        promise.reject("DOWNLOAD_FAILED", "Download failed");
                    });
                }
            }
        };
        IntentFilter filter = new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE);
        ContextCompat.registerReceiver(reactContext, receiver, filter, ContextCompat.RECEIVER_NOT_EXPORTED);
        new Handler(Looper.getMainLooper()).post(() -> {
            promise.resolve("Download started with ID: " + downloadId);
        });
    }
    @ReactMethod
    public void getMusicFiles(Promise promise) {
        WritableArray musicList = new WritableNativeArray();
        ContentResolver contentResolver = reactContext.getContentResolver();
        Cursor cursor = contentResolver.query(
                MediaStore.Audio.Media.EXTERNAL_CONTENT_URI,
                new String[]{
                        MediaStore.Audio.Media._ID,
                        MediaStore.Audio.Media.TITLE,
                        MediaStore.Audio.Media.ARTIST,
                        MediaStore.Audio.Media.ALBUM,
                        MediaStore.Audio.Media.DURATION,
                        MediaStore.Audio.Media.DATA
                },
                MediaStore.Audio.Media.IS_MUSIC + " != 0",
                null,
                MediaStore.Audio.Media.TITLE + " ASC"
        );
        String artwork = "android.resource://"+reactContext.getPackageName()+"/drawable/artwork";
        if (cursor != null) {
            while (cursor.moveToNext()) {
                WritableMap song = new WritableNativeMap();
                String songId = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media._ID));
                String title = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.TITLE));
                String artist = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.ARTIST));
                String album = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.ALBUM));
                String duration = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.DURATION));
                String path = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.DATA));
                song.putString("id", songId);
                song.putString("title", title);
                song.putString("artist", artist);
                song.putString("album", album);
                song.putString("duration", duration);
                song.putString("path", path);
                song.putString("artwork", artwork);
                musicList.pushMap(song);
            }
            cursor.close();
        }
        promise.resolve(musicList);
    }
}
