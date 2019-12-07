import React, { Fragment } from 'react';
import Card from 'react-bootstrap/Card';
import styles from './Campaign.module.css';

function Campaign(props) {
	const { data = {}, showDetails = false } = props;

	return (
		<div>
			<Card.Title>{data.name}</Card.Title>
			<Card.Text>Total tasks: {data.count}</Card.Text>
			{showDetails && (
				<div className={styles.detailsContainer}>
					{
						data.tasks && (
							<Fragment>
								<h2>Tasks</h2>
								<ul>
									{
										data.tasks.map(task => (
											<li key={task.name}>{task.name}: {task.complete != null ? `${task.complete}/${task.count}` : task.count}</li>
										))
									}
								</ul>
							</Fragment>
						)
					}
					{
						data.benefits && (
							<Fragment>
								<h2>Benefits</h2>
								<ul>
									{
										data.benefits.map((benefit, idx) => (
											<li key={idx}>{benefit}</li>
										))
									}
								</ul>
							</Fragment>
						)
					}
					{
						data.tc && (
							<Fragment>
								<h2>Terms and conditions</h2>
								<ul>
									{
										data.tc.map((term, idx) => (
											<li key={idx}>{term}</li>
										))
									}
								</ul>
							</Fragment>
						)
					}
				</div>
			)
			}
		</div>
	);
}

export default Campaign;