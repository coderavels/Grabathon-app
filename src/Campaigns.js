import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Toast from 'react-bootstrap/Toast';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import styles from './Campaigns.module.css';
import { Icon } from 'semantic-ui-react';
import Campaign from './Campaign';
import Button from 'react-bootstrap/Button';

function Campaigns() {
	const [campaigns, setCampaigns] = useState({
		enrolled: [
			{
				id: 'enrolled_id1',
				name: 'Go Green',
				tc: ["tc1", "tc2"],
				benefits: ["benefit1", "benefit2"],
				tasks: [{
					name: "task1",
					count: 2,
					complete: 1
				}],
				count: 2,
				complete: 1
			}
		],
		unenrolled: [
			{
				id: 'unenrolled_id1',
				name: 'Fuel Your Wallet',
				tc: ["tc1", "tc2"],
				benefits: ["benefit1", "benefit2"],
				tasks: [{
					name: "task1",
					count: 2
				}],
				count: 2,
			}
		],
		completed: [
			{
				id: 'completed_id1',
				name: 'Pool All the way!',
				tasks: [{
					name: "task1",
					count: 2
				}],
				count: 2
			}
		]
	});
	const [campaignID, setCampaignID] = useState(null);
	const [error, setError] = useState(null);
	const [showToast, setShowToast] = useState(false);

	useEffect(() => {
		// fetch("").then(res => {
		// 	setCampaigns(res);
		// }).catch(err => {
		// 	setError(err);
		// });
	}, [campaigns]);
  

	const toggleCampaign = id => {
		return () => {
			if (campaignID != null && campaignID === id) {
				setCampaignID(null);
			}
			else {
				setCampaignID(id);
			}
		};
	};
  
	const enroll = id => {
		return () => {

		};
	};
  
	return (
		<div className={styles.page}>
			{
				error && (
					<Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
						<Toast.Header>
							<Icon name="close" />
							<strong className="mr-auto">Error</strong>
							<small>{error.code}</small>
						</Toast.Header>
						<Toast.Body>{error.message}</Toast.Body>
					</Toast>
				)
			}
			{
				campaigns.enrolled.map(campaign => {
					return (
						<Card key={campaign.id} onClick={toggleCampaign(campaign.id)} className={styles.campaignCard}>
							<Card.Body>
								<Campaign data={campaign} showDetails={campaignID === campaign.id} />
								<ProgressBar label={`${campaign.complete}/${campaign.count}`} now={(campaign.complete / campaign.count) * 100} />
							</Card.Body>
						</Card>
					);
				})
			}
			{
				campaigns.unenrolled.map(campaign => {
					return (
						<Card key={campaign.id} onClick={toggleCampaign(campaign.id)} className={styles.campaignCard}>
							<Card.Body>
								<Campaign data={campaign} showDetails={campaignID === campaign.id} />
								<Button type="button" variant="primary" size="md" onEnroll={enroll(campaign.id)}>Join the Campaign Now!</Button>
							</Card.Body>
						</Card>
					);
				})
			}
			{
				campaigns.completed.map(campaign => {
					return (
						<Card key={campaign.id} className={clsx(styles.campaignCard, styles.campaignCardDisabled)}>
							<Card.Body>
								<Campaign data={campaign} showDetails={false} />
								<Button disabled type="button" variant="secondary" size="md" onEnroll={enroll(campaign.id)}>Completed!</Button>
							</Card.Body>
						</Card>
					);
				})
			}
		</div>
	);
}

export default Campaigns;