import Redux from 'redux';
import { connect } from 'react-redux'; 
import Scraper from './scraper.js';

const mapStateToProps = (state) => {

	//const { } = state.scraper;

	return state.scraper;
	//return {
		// count:state.count,
		// headerSelected:state.headerSelected
	//};
}

const mapDispatchToProps = (dispatch) => {

	return {

		meaninglessAction : () => {
			dispatch({type:"DUMMY_CLICK", value: 1});
		}

	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Scraper);