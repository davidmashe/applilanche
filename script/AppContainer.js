import Redux from 'redux';
import { connect } from 'react-redux'; 
import Main from './main.js';
import AJAX from './lib/ajax.js';

const mapStateToProps = (state) => {

	return {
		headerSelected:state.header.headerSelected
	};
}

const mapDispatchToProps = (dispatch) => {

	return {

		meaninglessAction : () => {
			dispatch({type:"DUMMY_CLICK", value: 1});
		},

		handleHeaderTabChange : (target) => {
			dispatch({type:"HEADER_TAB_CHANGE", value:target});
		},

		getAuth : () => {

			const callback = (res) => {
				dispatch({type:"RECEIVE_AUTH",payload:res});
			};

			AJAX.get("/auth_url",callback);
		}	
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Main);