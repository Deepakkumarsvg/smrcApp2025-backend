
import express from "express";
import doctorCtrl from "../controllers/doctors.js"
const userRoutes = express.Router();

/* GET users listing. */
userRoutes.get('/check-api', async (req, res, next) => {
  doctorCtrl.testCollection(req, res, next)
});

export default userRoutes;
