function myfunction() {
    var mytext = document.getElementById("textboxid").value;
   
   //ways to send HTTP request or make an API call
    // https://www.freecodecamp.org/news/here-is-the-most-popular-ways-to-make-an-http-request-in-javascript-954ce8c95aaa/
   
    const Http = new XMLHttpRequest();
    const url='https://api.dictionaryapi.dev/api/v2/entries/en/'+ mytext;
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
     mywordarr=iterateObject(JSONObject,"word",mywordarr)
     document.getElementById("myword").innerHTML=mywordarr;
     var mydefarr = [];

    mydefarr=iterateObject(JSONObject,"definition",mydefarr)
    document.getElementById("mydefination").innerHTML=mydefarr;
    var mysynarr = [];
     mysynarr=iterateObject_synonym(JSONObject,"synonyms",mysynarr)
     document.getElementById("mysynonyms").innerHTML=mysynarr;


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
