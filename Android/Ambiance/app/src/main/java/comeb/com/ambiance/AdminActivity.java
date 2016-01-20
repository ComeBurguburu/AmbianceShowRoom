package comeb.com.ambiance;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import com.squareup.picasso.Picasso;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Arrays;

import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;

/**
 * Created by côme on 19/01/2016.
 */
public class AdminActivity extends TemplateActivity implements Communication,AdapterView.OnItemSelectedListener {
    private ArrayList<Model> list;
    private ImageView image;
    private int index=0;
    private Socket mSocket;
    private ArrayList<String> watchers;
    private ArrayAdapter<String> dataAdapter;
    private boolean isPlay=true;
    private TextView legend;
    private TextView idview;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.admin_layout);
        list=new ArrayList<Model>();
        new Sync(this,list).execute();
        Button prev = (Button)findViewById(R.id.prev);
        Button next = (Button)findViewById(R.id.next);
        image = (ImageView)findViewById(R.id.imageslide);
        legend =(TextView)findViewById(R.id.legend);
        idview = (TextView)findViewById(R.id.id);

        ImageButton play = (ImageButton)findViewById(R.id.play);

        play.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(isPlay){
                    pause();
                }else{
                    play();
                }
                isPlay=!isPlay;
            }
        });

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
                    info.put("admin",true);
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

        Emitter.Listener onList = new Emitter.Listener() {
            @Override
            public void call(Object... args) {
                try {
                    JSONArray jsonarray = new JSONArray(args[0].toString());
                    watchers.clear();
                    for(int i=0;i<jsonarray.length();i++) {
                        JSONObject j =(JSONObject)jsonarray.get(i);
                        watchers.add(j.get("id").toString());
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }


                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        dataAdapter.notifyDataSetChanged();
                    }
                });
            }
        };

        try {
            mSocket = IO.socket(MainActivity.mURL);
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
        mSocket.connect();
        mSocket.on("connexion", onConnection);
        mSocket.on("list",onList);
        mSocket.on("identification",onId);
        
        prev.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View view) {
                index--;
                if(index==-1){
                    index=list.size();
                }
                image(index);
            }
        });

        next.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                index++;
                image(index);

            }
        });

        // Spinner element
        Spinner spinner = (Spinner) findViewById(R.id.watcherlist);

        // Spinner click listener
        spinner.setOnItemSelectedListener(this);

        // Spinner Drop down elements
        String watch[]={"0","1","2","3","4","5","6","7","8","9","10"};
        watchers = new ArrayList(Arrays.asList(watch));
        // Creating adapter for spinner
        dataAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_item, watchers);

        // Drop down layout style - list view with radio button
        dataAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);

        // attaching data adapter to spinner
        spinner.setAdapter(dataAdapter);
    }


    @Override
    public void show(String s) {
        //text.setText(s);
    }

    @Override
    public void image(int index) {
        Model m =list.get(index % list.size());
        Picasso.with(getBaseContext()).load(m.getImageSrc()).into(image);
        legend.setText(m.getId());
    }
    public JSONObject getCurrentObject(){
        return list.get(index%list.size()).getObject();
    }

    @Override
    public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
        if(list.size()!=0){choose(i);}
    }
    private void choose(int i){
        JSONObject json= getCurrentObject();

        try {
            json.put("id", watchers.get(i));
            mSocket.emit("image",json);
        }catch(Exception e){
            e.printStackTrace();
        }

    }
    private void play(){
        mSocket.emit("video", "play");
    }
    private void pause(){
        mSocket.emit("video","pause");
    }

    @Override
    public void onNothingSelected(AdapterView<?> adapterView) {

    }
}
