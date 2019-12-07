import React from 'react';
import Button from 'react-bootstrap/Button';
import { Icon } from 'semantic-ui-react';
import styles from './Home.module.css';


function Home() {
	return (
		<div className={styles.profileContainer}>
			<Icon className={styles.userIcon} name="user outline" size="massive" />
			<Button className={styles.actionButton} variant="primary" size="sm" type="button" href="">
      Track your tasks
			</Button>
		</div>
	);
}

export default Home;