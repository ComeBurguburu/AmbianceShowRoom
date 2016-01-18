package comeb.com.ambiance;

import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
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
    private final String mURL = "http://ambiance.herokuapp.com/";
    private io.socket.client.Socket mSocket;
    private ImageView viewimage;
    private String url;
    private TextView idview;
    private String type;
    private String src;
    private String warning;
    private TextView text_error;

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
            tv.setText("solved");
        } catch (URISyntaxException e) {
            tv.setText("failed");
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
                    if (obj.has("video")) {
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
                        tv.setText(message);
                        if ("image".equals(type)) {
                            Picasso.with(getBaseContext()).load(url).into(viewimage);
                        }
                        if ("video".equals(type)) {
                            Log.d("encode", src);
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
                    info.put("userAgent", "Mozilla/5.0 (Linux; Android 4.3; Nexus 4 Build/JWR66Y) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.82 Mobile Safari/537.36\n");
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
    public String myEncodeURI(String str) {
        StringBuffer ostr = new StringBuffer();
        for(int i=0; i<str.length(); i++) {
            char ch = str.charAt(i);
            if ((ch >= 0x0020) && (ch <= 0x007e))
                ostr.append(ch); // Pas besoin de convertir
            else {
                // conversion en HEX
                String hex = Integer.toHexString(str.charAt(i) & 0xFFFF);
                ostr.append("%"+hex.toUpperCase());
            }
        }
        return ostr.toString();
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
    protected void onDestroy() {
        super.onDestroy();
        mSocket.emit("disconnect");
    }

}
