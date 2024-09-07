const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

function authenticateToken(req, res, next) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ error: "Access Denied" });
  }

  const token = authToken.split(" ")[1];

  try {
    jwt.verify(token, SECRET_KEY);
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid Token" });
    console.log(error);
  }
}

module.exports = authenticateToken;
