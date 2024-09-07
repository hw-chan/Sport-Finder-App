const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db/pool");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const signup = async (req, res) => {
  const client = await pool.connect();
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    const userResult = await client.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    );

    if (userResult.rows.length > 0) {
      return res.status(400).json({ message: "Username already exists." });
    }

    const result = await client.query(
      `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id`,
      [username, hashedPassword]
    );
    const userId = result.rows[0].id;

    await client.query(
      `INSERT INTO profile (user_id, name, email, country, state_of_country) VALUES ($1, $2, $3, $4, $5)`,
      [userId, "", "", "", ""]
    );

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
};

const login = async (req, res) => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      `SELECT * FROM users WHERE username = $1`,
      [req.body.username]
    );
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    const passwordIsValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).json({ auth: false, token: null });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: 86400 }
    );

    res.status(200).json({ auth: true, token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
};

module.exports = {
  login,
  signup,
};
