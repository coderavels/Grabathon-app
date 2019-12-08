import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import Card from 'react-bootstrap/Card';
import styles from './PlaceOrder.module.css';
import Button from 'react-bootstrap/Button';
import { Icon } from 'semantic-ui-react';

function PlaceOrder() {
	const [error, setError] = useState(null);
	const [showToast, setShowToast] = useState(false);
	const [success, setSuccess] = useState([]);

	const items = [
		{
			id: 1,
			name: 'Fuel 10L Indian oil',
			amount: 1000,
			payType: 'fuel'
		},
		{
			id: 2,
			name: 'Mobile Recharge Rs 100',
			amount: 100,
			payType: 'bill'
		},
		{
			id: 3,
			name: 'Electricity Bill Rs 1200',
			amount: 1200,
			payType: 'bill'
		},
		{
			id: 4,
			name: 'Water Bill Payment Rs 480',
			amount: 480,
			payType: 'bill'
		},
		{
			id: 5,
			name: 'Cake 1kg',
			amount: 500,
			payType: 'food'
		},
		{
			id: 6,
			name: 'Fuel 5L Indian oil',
			amount: 500,
			payType: 'fuel'
		}
	];
  
	const placeOrder = id => {
		const item = items.find(item => item.id === id);
		return () => {
			fetch("http://127.0.0.1/pay", {
				method: "POST",
				body: JSON.stringify({
					payType: item.payType,
					amount: item.amount,
					userId: 1,
					tid: `${id}_${item.amount}_${Date.now()}`
				})
			})
				.then(res => res.json())
				.then(res => {
					success.push(`Paid for ${item.name}`);
					setSuccess(success);
					if (res.coupon) {
						success.push(`You have completed tasks of a campaign and received Rs. ${res.amount} as rewards.`);
					}
					setShowToast(true);
				}).catch(err => {
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
				success.length !== 0 && (
					success.map(s => {
						return (
							<Toast onClose={() => {
								setShowToast(false);
								const successArr = success.filter(msg => msg !== s);
								setSuccess(successArr);
							}
							} show={showToast} delay={5000} autohide>
								<Toast.Header>
									<Icon name="thumbs up outline" color="green"></Icon>
									<strong style={ {color: "green"} }>Success</strong>
								</Toast.Header>
								<Toast.Body style={ {color: "green"} }>{s}</Toast.Body>
							</Toast>
						);
					})
				)
			}
			<div className={styles.content}>
				{
					items.map(item => {
						return (
							<Card key={item.id} className={styles.card}>
								<Card.Title>{item.name}</Card.Title>
								<Card.Text>{item.amount}</Card.Text>
								<Button onClick={placeOrder(item.id)} className={styles.cta}>Pay</Button>
							</Card>
						);
					})
				}
			</div>
		</div>
	);
}

export default PlaceOrder;
