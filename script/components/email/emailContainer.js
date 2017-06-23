import Redux from 'redux';
import { connect } from 'react-redux'; 
import Email from './email.js';

const mapStateToProps = (state) => {

	const { dummyValue } = state.email;
	const { coverLetters } = state.appData;
	return {
		dummyValue,
		coverLetters
	};
}

const mapDispatchToProps = (dispatch) => {

	return {

		meaninglessAction : () => {
			dispatch({type:"DUMMY_CLICK", value: 1});
		}

	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Email);