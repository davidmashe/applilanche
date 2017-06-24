import Redux from 'redux';
import { connect } from 'react-redux'; 
import Email from './email.js';

const mapStateToProps = (state) => {

	const { dummyValue, emailSubmitData, tabSelected } = state.email;
	const { coverLetters } = state.appData;

	return {
		dummyValue,
		coverLetters,
		emailSubmitData,
		tabSelected
	};
}

const mapDispatchToProps = (dispatch) => {

	return {

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
		},

		emailTabChange : (value) => {
			dispatch({type:"EMAIL_TAB_CHANGE",value:value});
		}

	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Email);