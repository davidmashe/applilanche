import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store.js';
import AppContainer from './AppContainer.js';

const virtualDOM = (<Provider store={store}>
						<AppContainer />
					</Provider>);

ReactDOM.render(virtualDOM,document.getElementById("applilanche"));