const Skill = require("../models/Skill");
const BusinessIdea = require("../models/BusinessIdea");
const Task = require("../models/Task");

const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalSkills = await Skill.countDocuments({ user: userId });

    const totalIdeas = await BusinessIdea.countDocuments({
      user: userId,
    });

    const totalTasks = await Task.countDocuments({
      user: userId,
    });

    const pendingTasks = await Task.countDocuments({
      user: userId,
      status: "Pending",
    });

    const completedTasks = await Task.countDocuments({
      user: userId,
      status: "Completed",
    });

    return res.status(200).json({
      success: true,
      dashboard: {
        totalSkills,
        totalIdeas,
        totalTasks,
        pendingTasks,
        completedTasks,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { getDashboard };