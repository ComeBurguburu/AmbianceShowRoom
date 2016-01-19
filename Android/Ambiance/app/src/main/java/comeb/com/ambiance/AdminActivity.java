package comeb.com.ambiance;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.Toast;

import com.squareup.picasso.Picasso;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Arrays;

import io.socket.client.IO;
import io.socket.emitter.Emitter;

/**
 * Created by côme on 19/01/2016.
 */
public class AdminActivity extends AppCompatActivity implements Communication,AdapterView.OnItemSelectedListener {
    private ArrayList<String> list;
    private ImageView image;
    private int index=0;
    private io.socket.client.Socket mSocket;
    private ArrayList<String> watchers;
    private ArrayAdapter<String> dataAdapter;
    private boolean isPlay=false;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.admin_layout);
        list=new ArrayList<String>();
        new Sync(this,this,list).execute();
        Button prev = (Button)findViewById(R.id.prev);
        Button next = (Button)findViewById(R.id.next);
        image = (ImageView)findViewById(R.id.imageslide);

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
        mSocket.on("connexion",onConnection);
        mSocket.on("list",onList);
        
        prev.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View view) {
                index--;
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
        String watch[]={"0","1","2","3","4"};
        watchers = new ArrayList(Arrays.asList(watch));
        // Creating adapter for spinner
        dataAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_item, watchers);

        // Drop down layout style - list view with radio button
        dataAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);

        // attaching data adapter to spinner
        spinner.setAdapter(dataAdapter);
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

    @Override
    public void show(String s) {
        //text.setText(s);
    }

    @Override
    public void image(int index) {
        Picasso.with(getBaseContext()).load(list.get(index%list.size())).into(image);
    }
    public String getCurrentImage(){
        return list.get(index%list.size());
    }

    @Override
    public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
        choose(i);
    }
    private void choose(int i){
        JSONObject json=new JSONObject();
        try {
            json.put("id", watchers.get(i));
            json.put("url", getCurrentImage());
            json.put("isGrid", false);
            json.put("col", 0);
            json.put("row", 0);
            json.put("type", "image");
            json.put("isPlay", false);
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
