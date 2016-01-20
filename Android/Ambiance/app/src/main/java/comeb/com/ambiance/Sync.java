package comeb.com.ambiance;

import android.os.AsyncTask;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

/**
 * Created by côme on 19/01/2016.
 */
public class Sync extends AsyncTask<String, Integer, String> {


    private final String mURL_files = "http://ambiance.herokuapp.com/files";
    private Communication MyInterface;
    private ArrayList<Model> list;

    public Sync(Communication c, ArrayList<Model> list) {
        super();
        MyInterface = c;
        this.list = list;
    }

    @Override
    protected void onPostExecute(String s) {
        super.onPostExecute(s);
        if (s != null) {
            //MyInterface.show(s);
            try {
                JSONArray jsonArray = new JSONArray(s);

                JSONObject facebook = new JSONObject();
                facebook.put("id", 15);
                facebook.put("src", "http://ambiance.herokuapp.com/icon/facebook.png");
                facebook.put("type", "flux-facebook");

                JSONObject twitter = new JSONObject();
                twitter.put("id", 16);
                twitter.put("src", "http://ambiance.herokuapp.com/icon/twitter.png");
                twitter.put("type", "flux-twitter");

                jsonArray.put(facebook);
                jsonArray.put(twitter);

                for (int i = 0; i < jsonArray.length(); i++) {
                    JSONObject j = (JSONObject) jsonArray.get(i);
                    Log.d("test", j.toString());
                    if (j != null) {
                        list.add(new Model(j.get("id").toString(), j.get("src").toString(), j));
                    }
                }
                MyInterface.image(0);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        } else {
            MyInterface.show("error");
        }
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();
    }

    @Override
    protected String doInBackground(String... strings) {

        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
                .url(mURL_files)
                .build();

        Response response = null;
        try {
            response = client.newCall(request).execute();
            return response.body().string();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

}
