const jwt = require("jsonwebtoken");

exports.isAuthenticated = (req, res, next) => {
  try {
    // 1️⃣ Get token from cookie (primary)
    let token = req.cookies?.token;

    // 2️⃣ Optional: allow token from Authorization header
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Token missing",
      });
    }

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Attach user id to request
    req.id = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token",
    });
  }
};
