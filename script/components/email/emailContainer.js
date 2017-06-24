import Redux from 'redux';
import { connect } from 'react-redux'; 
import Email from './email.js';

const mapStateToProps = (state) => {

	const { dummyValue, emailSubmitData } = state.email;
	const { coverLetters } = state.appData;

	return {
		dummyValue,
		coverLetters,
		emailSubmitData
	};
}

const mapDispatchToProps = (dispatch) => {

	return {

		meaninglessAction : () => {
			dispatch({type:"DUMMY_CLICK", value: 1});
		},

		handleTextInput : (index, subIndex, value) => {
			const actionValue = {
				index,
				subIndex,
				value
			}
			dispatch({type:"UPDATE_EMAIL_VALUE",value:actionValue});
		},

		handleRadioCheck : (index,value) => {
			const actionValue = {
				index,
				subIndex:"radio",
				value
			}
			dispatch({type:"UPDATE_EMAIL_VALUE",value:actionValue});
		}

	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Email);