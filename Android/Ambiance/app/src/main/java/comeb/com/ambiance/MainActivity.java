package comeb.com.ambiance;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.MediaController;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.VideoView;

import com.squareup.picasso.Picasso;

import org.json.JSONException;
import org.json.JSONObject;

import java.net.URISyntaxException;

import io.socket.client.IO;
import io.socket.emitter.Emitter;

public class MainActivity extends AppCompatActivity {

    private TextView tv;
    public static final String mURL = "http://ambiance.herokuapp.com/";
    private io.socket.client.Socket mSocket;
    private ImageView viewimage;
    private String url;
    private TextView idview;
    private String type;
    private String src;
    private String warning;
    private TextView text_error;
    private boolean isPlay=false;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        tv = (TextView) findViewById(R.id.tv);
        idview = (TextView) findViewById(R.id.id);
        viewimage = (ImageView) findViewById(R.id.image);
        text_error = (TextView) findViewById(R.id.text_error);


        idview.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                connect();
            }
        });

        final VideoView videoView = (VideoView) findViewById(R.id.video);
        MediaController mc = new MediaController(this);
        videoView.setMediaController(mc);
        mc.setAnchorView(videoView);
        mc.setMediaPlayer(videoView);


        try {
            mSocket = IO.socket(mURL);
        } catch (URISyntaxException e) {

            throw new RuntimeException(e);
        }

        Emitter.Listener onId = new Emitter.Listener() {
            @Override
            public void call(Object... args) {
                Log.d("ide", args[0].toString());

                final String id = args[0].toString();


                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        idview.setText(id);
                    }
                });
            }
        };

        Emitter.Listener onPlay = new Emitter.Listener() {
            public void call(Object... args) {

                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        videoView.start();
                    }
                });
            }
        };
        Emitter.Listener onPause = new Emitter.Listener() {
            public void call(Object... args) {

                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        videoView.pause();
                    }
                });
            }
        };
        Emitter.Listener onDisconnect = new Emitter.Listener() {
            public void call(Object... args) {

                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        text_error.setText("you have been disconnected");
                        text_error.setVisibility(View.VISIBLE);
                    }
                });
            }
        };
        Emitter.Listener onError = new Emitter.Listener() {
            public void call(Object... args) {
                final String error = args[0].toString();
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        text_error.setText(error);
                        text_error.setVisibility(View.VISIBLE);
                    }
                });
            }
        };

        Emitter.Listener onImage = new Emitter.Listener() {
            @Override
            public void call(Object... args) {
                JSONObject obj = (JSONObject) args[0];
                final String message = obj.toString();
                warning = "";

                try {
                    url = (String) obj.get("url");
                    type = (String) obj.get("type");
                    if (obj.has("video")&& !obj.isNull("video")) {
                        JSONObject video = (JSONObject) obj.get("video");

                        if (video.has("src")) {
                            src = video.get("src").toString();

                        } else {
                            warning = "no video.src";
                        }
                    } else {
                        warning = "no attr video";
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        text_error.setVisibility(View.GONE);
                        //tv.setText(message);
                        if ("image".equals(type)) {
                            Picasso.with(getBaseContext()).load(url).into(viewimage);
                        }
                        if ("video".equals(type)) {
//                            Log.d("encode", src);
                            if(src.isEmpty()){
                                return;
                            }
                            Uri video = Uri.parse(src);
                            videoView.setVideoURI(video);
                            videoView.requestFocus();
                            videoView.start();
                        }
                        if (!warning.isEmpty()) {
                            text_error.setText(warning);
                            text_error.setVisibility(View.VISIBLE);
                        }

                    }

                });
            }
        };


        Emitter.Listener onConnection = new Emitter.Listener() {
            @Override
            public void call(Object... args) {
                JSONObject info = new JSONObject();
                try {
                    info.put("width", "100");
                    info.put("height", "100");
                    info.put("userAgent", "Mozilla/5.0 (Linux; Android 5.1; Nexus 4 Build/JWR66Y) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.82 Mobile Safari/537.36\n");
                    info.put("row", -1);
                    info.put("col", -1);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                mSocket.emit("register", info.toString());

                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {

                        Toast.makeText(getApplicationContext(),
                                "connected", Toast.LENGTH_LONG).show();
                    }
                });
            }
        };

        connect();

        mSocket.on("connection", onConnection);
        mSocket.on("identification", onId);
        mSocket.on("image", onImage);
        mSocket.on("pause", onPause);
        mSocket.on("play", onPlay);
        mSocket.on("disconnect", onDisconnect);
        mSocket.on("EventError", onError);

    }

    public void connect() {
        mSocket.connect();
        text_error.setVisibility(View.GONE);
    }

    @Override
    protected void onStop() {
        super.onStop();
        mSocket.emit("disconnect");
    }

    @Override
    protected void onResume(){
        super.onResume();
        connect();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        mSocket.emit("disconnect");
    }
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.action_settings:
                this.startActivity(new Intent(this,comeb.com.ambiance.MainActivity.class));
                return true;
            case R.id.action_admin:
                this.startActivity(new Intent(this,comeb.com.ambiance.AdminActivity.class));
                return true;
            default:
                return super.onOptionsItemSelected(item);

            // Comportement du bouton "A Propos"

        }
    }

}
