import React, { useContext } from 'react';
import { Switch, Route, __RouterContext } from 'react-router-dom';
import Home from './containers/home/home';
import Profile from './containers/profile/profile';

const Routes = () => {
	const { history } = useContext(__RouterContext);

	return (
		<Switch history={ history }>
			<Route exact path="/" render={ props => <Home { ...props } /> } />
			<Route exact path="/:name" render={ props => <Profile { ...props } /> } />
		</Switch>
	);
};

export default Routes;
