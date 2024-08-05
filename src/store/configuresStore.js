import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
/* import logger from 'redux-logger' */
import thunk from 'redux-thunk';

import rootReducer from './index';

const configureStore = (initialState) => {
	return createStore(
		rootReducer,
		initialState,
		composeWithDevTools(applyMiddleware( thunk))
	);
};

export default configureStore;
