import express from "express";
import doctorCtrl from "../controllers/doctors.js";
import activityCtrl from "../controllers/activity.js";
const activityRoutes = express.Router();

/* GET Activity and Doctors listing. */
activityRoutes.get("/all-activity/:searchQuery?", async (req, res, next) => {
  activityCtrl.fetchAllActivity(req, res, next);
});

export default activityRoutes;
