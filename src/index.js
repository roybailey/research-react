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
import About from './containers/About'
import ServerError from './containers/ServerError'

import ChartApp from './react-chart/js/App.jsx'

import KanbanBoardContainer from './kanban/components/KanbanBoardContainer'
import KanbanBoard from './kanban/components/KanbanBoard'
import EditCard from './kanban/components/EditCard'
import NewCard from './kanban/components/NewCard'

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
                    <Route path="movie/:id" component={Movie}/>

                    <Route path="about" component={About} title="About Page"/>
                    <Route path="chart" component={ChartApp} title="Chart App"/>
                    <Route path="kanban" component={KanbanBoardContainer} title="Kanban App">
                        <IndexRoute component={KanbanBoard}/>
                        <Route path="new" component={NewCard} />
                        <Route path="edit/:card_id" component={EditCard} />
                    </Route>

                </Route>
            </Router>
        </div>
    </Provider>,
    document.getElementById('root')
);
