import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import styles from './Profile.module.css';
import { ROUTES } from './routes';


function Profile() {
	return (
		<div className={styles.profileContainer}>
			<Icon className={styles.userIcon} name="user outline" size="massive" />
			<Link to={ROUTES.campaigns}>
				<Button className={styles.actionButton} variant="primary" size="sm">
				Track your tasks
				</Button>
			</Link>
			<Link to={ROUTES.offers}>
				<Button className={styles.actionButton} variant="primary" size="sm">
				See your offers
				</Button>
			</Link>
		</div>
	);
}

export default Profile;