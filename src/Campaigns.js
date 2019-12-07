import React, { useEffect, useState } from 'react';
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
				id: 'id1',
				name: 'name',
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
				id: 'id1',
				name: 'name',
				tc: ["tc1", "tc2"],
				benefits: ["benefit1", "benefit2"],
				tasks: [{
					name: "task1",
					count: 2
				}],
				count: 2,
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
			if (campaignID != null) {
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
				campaigns.enrolled.length !== 0 && campaigns.enrolled.map(campaign => {
					return (
						<Card onClick={toggleCampaign(campaign.id)}>
							<Card.Body>
								<Campaign data={campaign} showDetails={campaignID === campaign.id} />
								<ProgressBar label={`${campaign.complete}/${campaign.count}`} now={(campaign.complete / campaign.count) * 100} />
							</Card.Body>
						</Card>
					);
				})
			}
			{
				campaigns.unenrolled.length !== 0 && campaigns.unenrolled.map(campaign => {
					return (
						<Card onClick={toggleCampaign(campaign.id)}>
							<Card.Body>
								<Campaign data={campaign} showDetails={campaignID === campaign.id} />
								<Button type="button" variant="primary" size="md" onEnroll={enroll(campaign.id)}>Join the Campaign Now!</Button>
							</Card.Body>
						</Card>
					);
				})
			}
		</div>
	);
}

export default Campaigns;