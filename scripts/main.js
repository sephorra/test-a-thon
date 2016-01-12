import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router';
import { createHistory } from 'history';

import Leaderboard from './components/Leaderboard';
import NotFound from './components/NotFound';
import App from './components/App';


var routes = (
	<Router history={createHistory()}>
		<Route path="/test-a-thon" component={App}/>
		<Route path="*" component={NotFound}/>
	</Router>
)

ReactDOM.render(routes, document.querySelector('#main'));