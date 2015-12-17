var contentType={}
    contentType.IMG_URL="IMG_URL";
    contentType.IMG_B64="IMG_B64";
    contentType.URL="URL";
    contentType.VIDEO_YOUTUBE="VIDEO_YOUTUBE";
    contentType.VIDEO_CUSTOM="VIDEO_CUSTOM";


angular.module('factoryServices', []).factory('factory',factoryFnc);

function factoryFnc(){
     var factory = {
        generateUUID:       generateUUID,
         contentCreation:   contentCreation,
         slidCreation:      slidCreation,
         presentationCreation: presentationCreation,
         mapToArray:        mapToArray
         
     };
    
    
    //*********************************************//
    //************** INTERNAL TOOLS  **************//
    //*********************************************//
    
    // http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    function generateUUID(){
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c)      {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
     };
    
    
    //*********************************************//
    //************ FACTORY FUNCTIONS  *************//
    //*********************************************//
     
     function contentCreation(title,type,src){
        var content={};
        content.id=generateUUID();
        content.title=title;
        content.src=src;
        content.type=type;
        return content;
     };
    
    
     function slidCreation(title,txt){
        var slid={};
        slid.id=generateUUID();
        slid.title=title;
        slid.txt=txt;
        slid.contentMap={};
        return slid;
     };
    
    
     function presentationCreation(title,description){
        var presentation={};
        presentation.id=generateUUID();
        presentation.title=title;
        presentation.description=description;
        presentation.slidArray=[];
        return presentation;
     };
   
    
    function mapToArray(map){
        contentArray=[];
        for(key in map){
            contentArray.push(map[key]);
        }
        return contentArray;
    };
    
   return factory;
};
    