import dbService from "../lib/database.js";
import { sendResponse } from "../lib/util.js";
import { messages } from "../constants/messages.js";
import { ACTIVITIES } from "../constants/collections.js";
import { getEpochTime } from "../lib/util.js";

const fetchAllActivity = async (req, res, next) => {
  try {
    const query = req.params.searchQuery?.trim(); // Ensure query is properly formatted
    const client = await dbService.getClient();
    const collection = client.collection(ACTIVITIES);
    const epochNow = getEpochTime();

    let data;

    if (query) {
      data = await collection
        .find({
          $or: [
            { doctors: { $regex: query, $options: "i" } },
            { activityName: { $regex: query, $options: "i" } },
          ],
        })
        .toArray();

      if (data?.length) {
        return sendResponse(
          res,
          201,
          true,
          messages.DATA_FETCHED_SUCCESSFULLY,
          data
        );
      }
      return next({ status: 404, message: messages.NO_DATA_FOUND });
    }

    // Fetch all data when no query is provided
    data = await collection
      .find({
        endTime: { $gt: epochNow },
      })
      .toArray();

    return sendResponse(
      res,
      201,
      true,
      messages.DATA_FETCHED_SUCCESSFULLY,
      data
    );
  } catch (error) {
    console.error("Fetch Activity Error:", error);
    return next(error);
  }
};

export default {
  fetchAllActivity,
};
