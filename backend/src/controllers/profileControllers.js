const pool = require("../db/pool");

const getProfile = async (req, res) => {
  const client = await pool.connect();
  const { userId } = req.params;
  const formattedUserId = parseInt(userId, 10);

  try {
    const result = await client.query(
      `SELECT * FROM profile where user_id = $1`,
      [formattedUserId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
  } finally {
    client.release();
  }
};

const updateProfile = async (req, res) => {
  const client = await pool.connect();
  const { userId, name, email, country, stateOfCountry } = req.body;

  try {
    const result = await client.query(
      `UPDATE profile SET name = COALESCE($1, name), email = COALESCE($2, email), country = COALESCE($3, country), state_of_country = COALESCE($4, state_of_country) WHERE user_id = $5 RETURNING name, email, country, state_of_country`,
      [name, email, country, stateOfCountry, userId]
    );
    res.json(result.rows[0])
  } catch (error) {
    console.error(error);
  } finally {
    client.release();
  }
};

module.exports = { updateProfile, getProfile };
