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
			console.log("reducer received an action that it is ignoring:",action.type);
			return squish(state,{});
	}		
}

const email = (state,action) => {
	return squish(state,{});
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