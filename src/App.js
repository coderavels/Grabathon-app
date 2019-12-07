import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styles from './App.module.css';
import Header from './Header';
import Profile from './Profile';
import { ROUTES } from './routes';
import Campaigns from './Campaigns';
import Offers from './Offers';

function App() {
	return (
		<Router>
			<div className={styles.App}>
				<Header></Header>
				<Switch>
					<Route path={ROUTES.campaigns}>
						<Campaigns />
					</Route>
					<Route path={ROUTES.offers}>
						<Offers />
					</Route>
					<Route path={ROUTES.profile}>
						<Profile />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
