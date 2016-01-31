// react
import React from 'react'
import ReactDOM from 'react-dom'

// redux
import { compose, createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { Provider } from 'react-redux'

// router
import { Router, Route, IndexRoute } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { syncHistory, routeReducer } from 'react-router-redux'

// reducers
import * as reducers from './reducers'

// history middleware
const browserHistory = createBrowserHistory();
const historyMiddleware = syncHistory(browserHistory);

// Logger
const loggerMiddleware = createLogger();

// Middleware
const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
    historyMiddleware
)(createStore);

// reducers
const reducer = combineReducers({
    ...reducers,
    routing: routeReducer
});

// store
let initialState = undefined;
const store = createStoreWithMiddleware(reducer);

// container route components
import Movie from './containers/Movie'
import Movies from './containers/Movies'
import Home from './containers/Home'
import App from './containers/App'

// generic styles
import styles from './styles/base.css'

// routes...
ReactDOM.render(
    <Provider store={store}>
        <div>
            <Router history={browserHistory}>
                <Route path="/" component={App}>

                    <IndexRoute component={Home}/>
                    <Route path="movies" component={Movies}/>
                    <Route path="/movie/:id/:name" component={Movie}/>
                </Route>
            </Router>
        </div>
    </Provider>,
    document.getElementById('root')
);
