export default (state,action) => {

	if (action.type === "DUMMY_CLICK"){
		return {count:state.count + action.value};
	}

	console.log("reducer received an action that it is ignoring:",action.type);
	return state;
}