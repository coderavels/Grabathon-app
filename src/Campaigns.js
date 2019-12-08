import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Toast from 'react-bootstrap/Toast';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import styles from './Campaigns.module.css';
import Campaign from './Campaign';
import Button from 'react-bootstrap/Button';
import { Icon } from 'semantic-ui-react';

function Campaigns() {
	const [campaigns, setCampaigns] = useState({});
	const [campaignID, setCampaignID] = useState(null);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState("");
	const [loaded, setLoaded] = useState(false);
	const [showToast, setShowToast] = useState(false);

	useEffect(() => {
		fetch("http://127.0.0.1:3000/campaigns?userId=1", {
			headers: {
				"content-type": "application/json"
			}
		}).then(res => res.json()).then(res => {
			setCampaigns(res);
			setLoaded(true);
		}).catch(err => {
			setError(err);
			setShowToast(true);
			setLoaded(true);
		});
	}, [loaded]);
  

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
		const campaign = campaigns.unenrolled.find(c => c.id === id);
		return () => {
			fetch(`http://127.0.0.1:3000/enroll/${id}`, {
				body: {
					userId: 1
				},
				method: "POST",
				headers: {
					"content-type": "application/json"
				}
			})
				.then(res => res.json())
				.then(() => {
					if (campaigns.enrolled) {
						campaigns.enrolled.push(campaign);
					} else {
						campaigns.enrolled = [campaign];
					}
					campaigns.unenrolled.filter(c => c.id !== id);
					setSuccess(`Enrolled in the ${campaign.name} campaign`);
					setShowToast(true);
				})
				.catch(err => {
					setError(err);
					setShowToast(true);
				});
		};
	};
  
	return (
		<div className={styles.page}>
			{
				error && (
					<Toast onClose={() => {
						setShowToast(false);
						setError(null);
					}
					} show={showToast} delay={5000} autohide>
						<Toast.Header>
							<strong style={ {color: "red"} }>Error</strong>
							<small style={ {color: "red"} }>{error.code}</small>
						</Toast.Header>
						<Toast.Body style={ {color: "red"} }>{error.message}</Toast.Body>
					</Toast>
				)
			}
			{
				success && (
					<Toast onClose={() => {
						setShowToast(false);
						setSuccess("");
					}
					} show={showToast} delay={5000} autohide>
						<Toast.Header>
							<Icon name="thumbs up outline" color="green"></Icon>
							<strong style={ {color: "green"} }>Success</strong>
						</Toast.Header>
						<Toast.Body style={ {color: "green"} }>{success}</Toast.Body>
					</Toast>
				)
			}
			{
				campaigns.enrolled && campaigns.enrolled.map(campaign => {
					const complete = campaign.complete || 0;
					const count = campaign.count || 0;
					return (
						<Card key={campaign.id} onClick={toggleCampaign(campaign.id)} className={styles.campaignCard}>
							<Card.Body>
								<Campaign data={campaign} showDetails={campaignID === campaign.id} />
								<ProgressBar label={`${complete}/${count}`} now={(complete / count) * 100} />
							</Card.Body>
						</Card>
					);
				})
			}
			{
				campaigns.unenrolled && campaigns.unenrolled.map(campaign => {
					return (
						<Card key={campaign.id} onClick={toggleCampaign(campaign.id)} className={styles.campaignCard}>
							<Card.Body>
								<Campaign data={campaign} showDetails={campaignID === campaign.id} />
								<Button type="button" variant="primary" size="md" onClick={enroll(campaign.id)}>Join the Campaign Now!</Button>
							</Card.Body>
						</Card>
					);
				})
			}
			{
				campaigns.completed && campaigns.completed.map(campaign => {
					return (
						<Card key={campaign.id} className={clsx(styles.campaignCard, styles.campaignCardDisabled)}>
							<Card.Body>
								<Campaign data={campaign} showDetails={false} />
								<Button disabled type="button" variant="secondary" size="md">Completed!</Button>
							</Card.Body>
						</Card>
					);
				})
			}
		</div>
	);
}

export default Campaigns;