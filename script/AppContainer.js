import Redux from 'redux';
import { connect } from 'react-redux'; 
import Main from './main.js';

const mapStateToProps = (state) => {

	return {
		count:state.count
	};
}

const mapDispatchToProps = (dispatch) => {

	return {

		meaninglessAction : () => {
			dispatch({type:"DUMMY_CLICK", value: 1});
		}

	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Main);