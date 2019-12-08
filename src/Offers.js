import React, { useState, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import Card from 'react-bootstrap/Card';
import styles from './Offers.module.css';

function Offers() {
	const [coupons, setCoupons] = useState([]);
	const [error, setError] = useState(null);
	const [showToast, setShowToast] = useState(false);

	useEffect(() => {
		fetch("http://127.0.0.1:3000/coupons?userId=1").then(res => {
			setCoupons(res);
		}).catch(err => {
			setError(err);
			setShowToast(true);
		});
	}, [coupons]);

	return (
		<div className={styles.page}>
			{
				error && (
					<Toast onClose={() => setShowToast(false)} show={showToast} delay={10000} autohide>
						<Toast.Header>
							<strong style={ {color: "red"} }>Error</strong>
							<small style={ {color: "red"} }>{error.code}</small>
						</Toast.Header>
						<Toast.Body style={ {color: "red"} }>{error.message}</Toast.Body>
					</Toast>
				)
			}
			{
				coupons.map(coupon => {
					return (
						<Card key={coupon.id} className={styles.couponCard}>
							<Card.Body>
								<Card.Title>{coupon.name.toUpperCase()}</Card.Title>
								<Card.Text>Amount: {coupon.amount}</Card.Text>
								<Card.Text>Created At: {coupon.createdAt}</Card.Text>
							</Card.Body>
						</Card>
					);
				})
			}
		</div>
	);
}

export default Offers;