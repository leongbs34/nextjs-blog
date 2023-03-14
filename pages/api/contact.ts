import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as dotenv from 'dotenv';
dotenv.config();

interface ExtendedNextApiRequest extends NextApiRequest {
	body: FormBody;
}

type FormBody = {
	email: string;
	name: string;
	message: string;
	id?: string;
};

export default async function handler(
	req: ExtendedNextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		let client: MongoClient;
		const { email, name, message } = req.body;
		if (
			!email ||
			!email.includes('@') ||
			!name ||
			name.trim() === '' ||
			!message ||
			message.trim() === ''
		) {
			res.status(422).json({ message: 'Invalid input.' });
			return;
		}
		try {
			client = await MongoClient.connect(
				`mongodb+srv://${process.env.MONGODB_ID}:${process.env.MONGODB_PASSWORD}@cluster0.1iq91.mongodb.net/nextjs-blog?retryWrites=true&w=majority`
			);
		} catch (error) {
			res.status(500).json({ message: 'Could not connect to database' });
			return;
		}
		const newMessage: FormBody = {
			email,
			name,
			message,
		};
		const db = client.db();

		try {
			const result = await db.collection('message').insertOne(newMessage);
			newMessage.id = result.insertedId.toString();
		} catch (error) {
			client.close();
			res.status(500).json({ message: 'Storing message failed' });
			return;
		}
		client.close();
		res.status(201).json({ message: 'Successfully stored message!' });
	}
}
