import { FormEvent, useEffect, useState } from 'react';
import classes from './contact-form.module.css';
import Notification, { NotificationType } from '../ui/notification';

type ContactDetails = {
	email: string;
	name: string;
	message: string;
};

async function sendContactData(contactDetails: ContactDetails) {
	const response = await fetch('/api/contact', {
		method: 'POST',
		body: JSON.stringify(contactDetails),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const data = (await response.json()) as { message: string };

	if (!response.ok) {
		throw new Error(data.message || 'Something went wrong');
	}
}

export default function ContactForm() {
	const [email, setEmail] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [message, setMessage] = useState<string>('');
	const [requestStatus, setRequestStatus] = useState<string | null>('');
	const [errorMessage, setErrorMessage] = useState<string | null>('');

	useEffect(() => {
		if (requestStatus === 'success' || requestStatus === 'error') {
			const timer = setTimeout(() => {
				setRequestStatus(null);
				setErrorMessage(null);
			}, 3000);

			return () => {
				clearTimeout(timer);
			};
		}
	}, [requestStatus]);

	let notification: NotificationType | undefined;

	async function sendMessageHandler(event: FormEvent) {
		event.preventDefault();

		setRequestStatus('pending');

		try {
			await sendContactData({ email, name, message });
			setEmail('');
			setName('');
			setMessage('');
			setRequestStatus('success');
		} catch (e) {
			setRequestStatus('error');

			if (e instanceof Error) {
				setErrorMessage(e.message);
			}
		}
	}

	if (requestStatus === 'pending') {
		notification = {
			status: 'pending',
			title: 'Sending message...',
			message: 'Your message is on its way',
		};
	}
	if (requestStatus === 'success') {
		notification = {
			status: 'success',
			title: 'Success!',
			message: 'Message sent successfully',
		};
	}
	if (requestStatus === 'error') {
		notification = {
			status: 'error',
			title: 'Error!',
			message: errorMessage,
		};
	}

	return (
		<section className={classes.contact}>
			<h1>How can I help you?</h1>
			<form className={classes.form} onSubmit={sendMessageHandler}>
				<div className={classes.controls}>
					<div className={classes.control}>
						<label htmlFor='email'>Your email</label>
						<input
							type='email'
							id='email'
							required
							value={email}
							onChange={event => setEmail(event.target.value)}
						/>
					</div>
					<div className={classes.control}>
						<label htmlFor='name'>Your name</label>
						<input
							type='text'
							id='name'
							required
							value={name}
							onChange={event => setName(event.target.value)}
						/>
					</div>
				</div>
				<div className={classes.control}>
					<label htmlFor='message'>Your message</label>
					<textarea
						id='message'
						rows={5}
						value={message}
						required
						onChange={event => setMessage(event.target.value)}
					></textarea>
				</div>
				<div className={classes.action}>
					<button type='submit'>Send Message</button>
				</div>
				{notification && (
					<Notification
						title={notification.title}
						status={notification.status}
						message={notification.message}
					/>
				)}
			</form>
		</section>
	);
}
