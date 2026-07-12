const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const skillRoutes = require("./routes/skillRoutes");
const ideaRoutes = require("./routes/ideaRoutes");
const taskRoutes = require("./routes/taskRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// Load environment variables
dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/ideas", ideaRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("EntreSkill Hub API Running");
});
app.get("/api/test", (req, res) => {
    res.json({
      success: true,
      message: "API Working Successfully"
    });
  });

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

