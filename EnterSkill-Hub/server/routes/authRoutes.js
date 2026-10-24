const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controller/authController");
const protect = require("../middleware/authMiddleware");
router.get("/", (req, res) => {
    res.json({
      success: true,
      message: "Auth Route Working"
    });
  });

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected route accessed successfully",
    user: req.user,
  });
});


module.exports = router;