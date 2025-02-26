import dbService from '../lib/database.js';
import { getEpochTime } from '../lib/util.js';
import { ACTIVITIES } from '../constants/collections.js';

export const getActiveActivity = async (req, res, next) => {
	try {
		console.log("running cron")
		const epochNow = getEpochTime();
		const client = await dbService.getClient();
		const data = await client.collection(ACTIVITIES).find().toArray();
	
		const activeData = data.filter(ele => ele.startTime >= epochNow);
	
		if(activeData && activeData.length > 0) {
			console.log("active data: ",activeData);
		}
		console.log("active data function executed");
		return
	} catch (error) {
		console.log('Active Activity Error', error);
	}

}