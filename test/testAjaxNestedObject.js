const array = [0,1,2,3,4];

const emailSubmitArray = 
	array.map((element) => {
		return {
			0 : "",
			1 : "",
			2 : "",
			"radio" : "default"
			//,visible : (element === 0) ? true : false	
		}
	});

const DEFAULT_STATE = {
	header:{headerSelected:0},
	scraper:{},
	email:{
		emailSubmitData : emailSubmitArray,
		tabSelected : ""
	},
	appData:{
		coverLetters:["default","snarky"]
	}

};

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

console.log(objectToParams(DEFAULT_STATE));