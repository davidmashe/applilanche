import { combineReducers } from 'redux';

// hacky helper function
const squish = (oldState,newState) => {
	return Object.assign({},oldState,newState);
}

const header = (state,action) => {	

	switch (action.type) {

		case "DUMMY_CLICK":
			return squish(state,{count:state.count + action.value});
		case "HEADER_TAB_CHANGE":	
			return squish(state,{headerSelected:action.value});
		default:	
			return squish(state,{});
	}		
}

const email = (state,action) => {

	console.log(action);

	switch (action.type) {

		case "UPDATE_EMAIL_VALUE":

			const index = action.value.index;
			const subIndex = action.value.subIndex;

			const emailSubmitDataCopy = 
				state.emailSubmitData.filter(() => {return true});

			emailSubmitDataCopy[index][subIndex] = action.value.value;

			return squish(state,{emailSubmitData:emailSubmitDataCopy});

		case "EMAIL_TAB_CHANGE":
			return squish(state,{tabSelected:action.value});

		case "API_RESPONSE.SUBMIT_EMAILS":	
			return squish(state,{});

		default:	
			return squish(state,{});
	}

}

const scraper = (state,action) => {
	return squish(state,{});
}

const appData = (state,action) => {

	switch(action.type) {
		case "RECEIVE_AUTH": 
			console.log("reducer has action.payload of:");
			console.log(action.payload);

			const auth = (action.payload) 
				? JSON.parse(action.payload) 
					: {url:null};
					
			console.log("reducer has auth of:");
			console.log(auth);

			if (auth.url) {
				//console.log("auth.url",auth.url);
				//window.location.href = auth.url;
				return squish(state,{auth:auth.url});
			} else { 
				return squish(state,{auth:null});
			}	

		case "WIPE_AUTH_DATA":
			return squish(state,{auth:null});
			
		default:
			return squish(state,{});
	}
}

const combinedReducer = combineReducers({
	header,
	email,
	scraper,
	appData
});

export default combinedReducer