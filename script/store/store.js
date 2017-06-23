import Redux, { createStore } from 'redux';
import reducer from '../reducers/reducer.js'

const DEFAULT_STATE = {
	header:{headerSelected:0},
	scraper:{},
	email:{
		dummyValue:1
	},
	appData:{
		coverLetters:["default","snarky"]
	}

};

export default createStore(reducer,DEFAULT_STATE);