package comeb.com.ambiance;

import org.json.JSONObject;

/**
 * Created by côme on 20/01/2016.
 */
public class Model {

    private String imageSrc;
    private JSONObject object;
    private String id;

    @Override
    public String toString() {
        return "Model{" +
                "imageSrc='" + imageSrc + '\'' +
                ", object=" + object +
                '}';
    }

    public JSONObject getObject() {
        return object;
    }

    public String getImageSrc() {

        return imageSrc;
    }

    public Model(String i,String src, JSONObject json) {
        imageSrc=src;
        object=json;
        id=i;
    }

    public String getId() {
        return id;
    }
}
