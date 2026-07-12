const express = require("express");
const {
    createTask,
    getMyTasks,
    updateTask,
    deleteTask,
  } = require("../controller/taskController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getMyTasks);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;