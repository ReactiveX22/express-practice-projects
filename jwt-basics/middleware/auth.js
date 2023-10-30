const jwt = require("jsonwebtoken");
const { UnAuthError } = require("../errors");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnAuthError("No Token Provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const { id, username } = decodedToken;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new UnAuthError("Not Authorized");
  }
};

module.exports = authMiddleware;
