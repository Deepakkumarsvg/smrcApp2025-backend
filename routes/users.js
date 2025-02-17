
import express from "express";
const userRoutes = express.Router();

/* GET users listing. */
userRoutes.get('/check-api', function(req, res, next) {
  res.send('respond with a resource');
});

export default userRoutes;
