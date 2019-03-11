import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './containers/home/home';
import Profile from './containers/profile/profile';

class Routes extends React.Component {
	render() {
		return (
			<Switch>
				<Route exact path="/" component={ Home } />
				<Route exact path="/:name" component={ Profile } />
			</Switch>
		);
	}
}

export default Routes;
