function prepXHR(cb){
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load",function(event){
    var response = event.target.response;
    cb(response);
  });
  return xhr;
}

function objectToParams(object) {
  var paramsString = "";
  var i = 0;
  for (var key in object) {

    var value = object[key];

    if (typeof value === 'object')
      value = JSON.stringify(value);

    if (i > 0) paramsString += "&" + key + "=" + value;
    else {
      paramsString += key + "=" + value;
      i++;
    }
  }
  return paramsString;
}

export default {
  get : function(url,successCallback){
    var xhr = prepXHR(successCallback);
    xhr.open("GET",url);
    xhr.send();
  },
  post : function(url,body,successCallback){
    var xhr = prepXHR(successCallback);
    xhr.open("POST",url);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var paramsString = objectToParams(body);
    xhr.send(paramsString);
  }
};