import dbService from '../lib/database.js';
import { sendResponse } from '../lib/util.js';
import { messages } from '../constants/messages.js';

const testCollection = async(req, res, next) => {
	try {
		console.log("hello");
		const client = await dbService.getClient();
		const data = await client.collection('doctors').find().toArray();
		// console.log("data",data);
		return sendResponse(res, 201, true, messages.DATA_FETCHED_SUCCESSFULLY, data)
	} catch (error) {
		console.log("testCollection err: ",error)
	}
}

export default {
	testCollection
}