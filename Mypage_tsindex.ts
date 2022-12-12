
function myfunction() {
   // var mytext = document.getElementById("textboxid").value;
   const mytext = document.getElementById("textboxid") as HTMLInputElement | null;
   
   //ways to send HTTP request or make an API call
    // https://www.freecodecamp.org/news/here-is-the-most-popular-ways-to-make-an-http-request-in-javascript-954ce8c95aaa/
   if (mytext != null){
    const mytext1 = mytext.value;

    const Http = new XMLHttpRequest();
    const url='https://api.dictionaryapi.dev/api/v2/entries/en/'+ mytext1;
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
   // console.log(Http.responseText);
    //Parse Javascript String to JSON
   var JSONObject = JSON.parse(Http.responseText);
    console.log(JSONObject);
    //Example for nested Json javascript parser
    //https://www.tutorialrepublic.com/codelab.php?topic=javascript&file=parse-nested-json-data
    var mywordarr = [];
     mywordarr=iterateObject(JSONObject,"word",mywordarr);
     
     const myelement1 =  document.getElementById("myword");

     if (myelement1 !=null) {
        for(var i=0;i < mywordarr.length;i++) {
            myelement1.innerHTML = myelement1.innerHTML + mywordarr[i];
        }    
     }

      
     var mydefarr = [];

    mydefarr=iterateObject(JSONObject,"definition",mydefarr);
    
    const myelement2 =  document.getElementById("mydefination");
    if (myelement2 !=null) {
        for(var i=0;i < mydefarr.length;i++) {
            myelement2.innerHTML = myelement2.innerHTML + mydefarr[i];
        }    
     }
    
    var mysynarr = [];
     mysynarr=iterateObject_synonym(JSONObject,"synonyms",mysynarr);
     const myelement3 =  document.getElementById("mysynonyms");
     if (myelement3!=null) {
         for(var i=0;i < mysynarr.length;i++) {
             myelement3.innerHTML = myelement3.innerHTML + mysynarr[i];
         }    
      }
     //document.getElementById("mysynonyms").innerHTML=mysynarr;

    }
}
}
//nested JSON recursive iterator function
function iterateObject(obj, key, arayList) {
    for (var prop in obj) {
        if (typeof (obj[prop]) == "object") {
            iterateObject(obj[prop], key, arayList);
        }
        else {
            if (prop == key) {
                arayList.push(obj[prop]);
                // console.log("from function :" + arayList);
            }
        }
    }
    return arayList;
}
//nested JSON recursive iterator function only to fetch synonyms list
function iterateObject_synonym(obj, key, arayList) {
    //console.log("I am in function"); 
    for (var prop in obj) {
        if (typeof (obj[prop]) == "object") {
            //console.log("from function :" + prop); 
            if (prop == "synonyms") {
                arayList.push(obj[prop]);
            }
            iterateObject_synonym(obj[prop], key, arayList);
        }
    }
    return arayList;
}