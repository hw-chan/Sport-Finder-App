const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const gameRoutes = require("./gameRoutes");
const profileRoutes = require("./profileRoutes");

router.use("/auth", authRoutes);
router.use("/game", gameRoutes);
router.use("/profile", profileRoutes);

module.exports = router;