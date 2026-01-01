const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middlewares/authMiddleware");
const {
  createApplication,
  getAllApplications,
  getSingleApplication,
  updateApplication,
  deleteApplication,
  getDashboardData,
} = require("../controllers/applicationController");

router.post("/create", isAuthenticated, createApplication);
router.get("/get", isAuthenticated, getAllApplications);
router.get("/get/:id", isAuthenticated, getSingleApplication);
router.post("/update/:id", isAuthenticated, updateApplication);
router.delete("/delete/:id", isAuthenticated, deleteApplication);
router.get("/dashboard", isAuthenticated, getDashboardData);

module.exports = router;
