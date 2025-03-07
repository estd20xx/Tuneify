package com.musify
import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import org.devio.rn.splashscreen.SplashScreen


class MainActivity : ReactActivity() {
    override fun getMainComponentName(): String = "Musify"
    override fun onCreate(savedInstanceState: Bundle?) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState)
    }
    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}