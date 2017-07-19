// import { combineReducers } from 'react-redux';
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

	//console.log(action);

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
	return squish(state,{});
}

const combinedReducer = combineReducers({
	header,
	email,
	scraper,
	appData
});

export default combinedReducer