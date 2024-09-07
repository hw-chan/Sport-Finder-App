const pool = require("../db/pool");

const createGame = async (req, res) => {
  const client = await pool.connect();
  try {
    const {
      userId,
      title,
      description,
      sport,
      startTime,
      endTime,
      location,
      numberOfPlayers,
    } = req.body;

    const result = await client.query(
      `INSERT INTO games (user_id, title, description, sport, start_time, end_time, location, number_of_players, host, participants) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, array_append(ARRAY[]::INTEGER[], $10)) RETURNING *`,
      [
        userId,
        title,
        description,
        sport,
        startTime,
        endTime,
        location,
        numberOfPlayers,
        userId,
        userId,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
  } finally {
    client.release();
  }
};

const joinGame = async (req, res) => {
  const client = await pool.connect();
  try {
    const { userId, gameId } = req.body;
    await client.query(
      `UPDATE games SET participants = array_append(participants, $1) WHERE id = $2`,
      [userId, gameId]
    );
    res.status(201).json({ message: "Game joined successfully." });
  } catch (error) {
    console.error(error);
  } finally {
    client.release();
  }
};

const getAllGames = async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT id, STRING_AGG(user_id::TEXT, ', ') AS user_id, title, description, start_time, end_time, location, number_of_players, sport, host, participants
      FROM games
      GROUP BY id, title, description, start_time, end_time, location, number_of_players, sport, host, participants;`
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
  } finally {
    client.release();
  }
};

const getGame = async (req, res) => {
  const client = await pool.connect();
  const { gameId } = req.params;

  try {
    const game = await client.query(`SELECT * FROM games WHERE id = $1`, [
      gameId
    ]);
    res.status(200).json(game.rows);
  } catch (error) {
    console.error(error);
  } finally {
    client.release();
  }
};

const getUserGame = async (req, res) => {
  const client = await pool.connect();
  const { userId } = req.params;
  const formattedUserId = parseInt(userId, 10);
  try {
    const result = await client.query(
      `SELECT * FROM games WHERE $1 = ANY(participants);`,
      [formattedUserId]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
  } finally {
    client.release();
  }
};

const withdrawFromGame = async (req, res) => {
  const client = await pool.connect();
  const { userId, gameId } = req.body;
  try {
    await client.query(
      "UPDATE games SET participants = array_remove(participants, $1) WHERE id = $2",
      [userId, gameId]
    );
    res.status(200).json({ message: "Withdraw from game successfully" });
  } catch (error) {
    console.error(error);
  } finally {
    client.release();
  }
};

const deleteGame = async (req, res) => {
  const client = await pool.connect();
  const { id } = req.params;
  try {
    await client.query(`DELETE FROM games WHERE id = $1`, [
      id
    ]);
    res.status(200).json({ message: "Game deleted successfully" });
  } catch (error) {
    console.error(error);
  } finally {
    client.release();
  }
};

module.exports = {
  createGame,
  joinGame,
  getAllGames,
  getGame,
  getUserGame,
  withdrawFromGame,
  deleteGame,
};
