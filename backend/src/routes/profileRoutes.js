const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const {
  updateProfile,
  getProfile,
} = require("../controllers/profileControllers");

router.get("/:userId", getProfile);
router.patch("/update", verifyToken, updateProfile);

module.exports = router;
