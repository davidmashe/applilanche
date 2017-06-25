import Redux from 'redux';
import { connect } from 'react-redux'; 
import Email from './email.js';
import { get, post } from '../../action/api.js';
import { API_ROOT } from '../../constants/constants.js';

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
		},

		submitEmailsToAPI : (emailsObject) => {

			console.log(JSON.stringify(emailsObject));

			const callback = (response) => {
				dispatch({type:"API_RESPONSE.SUBMIT_EMAILS",value:response});
			}

			//callback("dude");

			post(API_ROOT + "/emails",emailsObject,callback);
		},

		testGet : () => {

			const callback = (response) => {
				console.log(response);
			}

			get(API_ROOT + "/test",callback);
		}

	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Email);