const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const {
  createGame,
  joinGame,
  getAllGames,
  getGame,
  getUserGame,
  withdrawFromGame,
  deleteGame,
} = require("../controllers/gameControllers");

router.post("/create", verifyToken, createGame);
router.post("/join", verifyToken, joinGame);
router.get("/all", verifyToken, getAllGames);
router.get("/:gameId", verifyToken, getGame);
router.get("/user/:userId", verifyToken, getUserGame)
router.post("/withdraw", verifyToken, withdrawFromGame);
router.delete("/delete/:id", verifyToken, deleteGame);

module.exports = router;
