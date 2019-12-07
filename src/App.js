import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styles from './App.module.css';
import Header from './Header';
import Home from './Home';

function App() {
	return (
		<Router>
			<div className={styles.App}>
				<Header></Header>
				<Switch>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
