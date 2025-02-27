import { ERROR_LOGS } from "../constants/collections.js";
import dbService from "../lib/database.js";

export const notFoundHandler = (req, res, next) => {
	const error = new Error(`${req.originalUrl} not found `);
	error.status = 404;
	next(error);
};

export const globalHandler = async (error, req, res, next) => {
	const client = await dbService.getClient();
	const collection = await client.collection(ERROR_LOGS);

	res.status(error.status || 500);
	res.json({ success: false, message: error.message });
	await collection.createIndex(
		{ globalErrorCreatedAt: 1 },
		{ expireAfterSeconds: Number(process.env.ERROR_LOG_EXPIRATION_TIME) }
	);
	const logEntry = {
		method: req.method,
		url: req.url,
		status: error.status,
		message: error.message,
		timestamp: new Date().toISOString(),
		globalErrorCreatedAt: new Date(),
	};
	await collection.insertOne(logEntry);
};
