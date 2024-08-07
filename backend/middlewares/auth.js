// token is in cookies
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.auth = async (req, res, next) => {
  // extract userPayload if token present
  try {
    const token =
      req.header("Authorization").replace("Bearer ", "") || req.cookies.token;
    if (!token) {
      throw new Error("token missing");
    }
    const decodedPayload = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedPayload;
    console.log("req.user  : ", req.user);
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};
const getUserRole = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw "Unauthorisation access user is not there in db";
    }
    return user.accountType;
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};
exports.isStudent = async (req, res, next) => {
  const { userId } = req.user;
  try {
    if ((await getUserRole(userId)) !== "Student") {
      throw new Error("this is a student route only");
    }
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  const { userId } = req.user;
  try {
    if ((await getUserRole(userId)) !== "Admin") {
      throw new Error("this is admin route only");
    }
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};
exports.isInstructor = async (req, res, next) => {
  const { userId } = req.user;
  try {
    if ((await getUserRole(userId)) !== "Instructor") {
      throw new Error("this is instructor route only");
    }
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};
