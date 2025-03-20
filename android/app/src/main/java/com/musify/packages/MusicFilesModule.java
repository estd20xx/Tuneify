package com.musify.packages;
import android.content.ContentResolver;
import android.content.Context;
import android.database.Cursor;
import android.media.MediaScannerConnection;
import android.net.Uri;
import android.os.Build;
import android.provider.MediaStore;
import android.util.Log;

import androidx.annotation.NonNull;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class MusicFilesModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
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
    public void scanFile(String filePath, Promise promise) {
        MediaScannerConnection.scanFile(reactContext, new String[]{filePath}, null, new MediaScannerConnection.OnScanCompletedListener() {
            @Override
            public void onScanCompleted(String path, Uri uri) {
                if (uri != null) {
                    Log.d("MediaScannerUtil", "File scanned successfully: " + path);
                    promise.resolve("File scanned successfully: " + path);
                } else {
                    Log.e("MediaScannerUtil", "Failed to scan file: " + path);
                    promise.reject("SCAN_FAILED", "Failed to scan file: " + path);
                }
            }
        });
    }

    @ReactMethod
    public void getMusicFiles(Promise promise) {
        WritableArray musicList = new WritableNativeArray();
        List<WritableMap> songs = new ArrayList<>();
        ContentResolver contentResolver = reactContext.getContentResolver();
        Cursor cursor = contentResolver.query(MediaStore.Audio.Media.EXTERNAL_CONTENT_URI,
                new String[]{MediaStore.Audio.Media._ID,
                        MediaStore.Audio.Media.TITLE,
                        MediaStore.Audio.Media.ARTIST,
                        MediaStore.Audio.Media.ALBUM,
                        MediaStore.Audio.Media.DURATION,
                        MediaStore.Audio.Media.DATA
                },
                MediaStore.Audio.Media.IS_MUSIC + " != 0", null, MediaStore.Audio.Media.TITLE + " ASC");
        String artwork = "android.resource://" + reactContext.getPackageName() + "/drawable/artwork";
        if (cursor != null) {
            while (cursor.moveToNext()) {
                WritableMap currentSong = new WritableNativeMap();
                String songId = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media._ID));
                String title = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.TITLE));
                String artist = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.ARTIST));
                String album = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.ALBUM));
                String duration = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.DURATION));
                String path = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.DATA));
                currentSong.putString("id", songId);
                currentSong.putString("title", title);
                currentSong.putString("artist", artist);
                currentSong.putString("album", album);
                currentSong.putString("duration", duration);
                currentSong.putString("path", path);
                currentSong.putString("artwork", artwork);
                songs.add(currentSong);
            }
            cursor.close();
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            Collections.sort(songs, Comparator.comparing(s0 -> s0.getString("title"),String.CASE_INSENSITIVE_ORDER));
        }
        for (WritableMap song : songs) {
            musicList.pushMap(song);
        }
        promise.resolve(musicList);
    }
}