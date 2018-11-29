/**
 * @format
 * @flow
 */

'use strict';

import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore } from 'redux-persist';

// reducer
import reducer from 'src/reducers';

// middleware
import AuthMiddleware from 'src/middleware/auth-middleware';

// dev tools
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

const logger = createLogger();

const store = createStore(
	reducer,
	composeWithDevTools(
		applyMiddleware(
			thunk,
			logger,
      AuthMiddleware
		)
	)
);

persistStore( store );

export default store;
