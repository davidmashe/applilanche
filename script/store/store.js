import Redux, { createStore } from 'redux';
import reducer from '../reducers/reducer.js'

const DEFAULT_STATE = {count:0};

export default createStore(reducer,DEFAULT_STATE);