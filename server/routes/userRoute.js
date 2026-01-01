const express = require("express");
const router = express.Router();

const upload = require("../middlewares/multer");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const {
  register,
  login,
  logout,
  updateProfile,
  getProfile,
} = require("../controllers/userController");

router.post("/register", upload.single("profileImage"), register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/update-profile", isAuthenticated, updateProfile);
router.get("/get-profile", isAuthenticated, getProfile);

module.exports = router;
