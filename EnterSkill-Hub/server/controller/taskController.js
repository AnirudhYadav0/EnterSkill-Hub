const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    const newTask = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      user: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      task: newTask,
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
const getMyTasks = async (req, res) => {
    try {
      const tasks = await Task.find({
        user: req.user.id,
      });
  
      return res.status(200).json({
        success: true,
        count: tasks.length,
        tasks,
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
  const updateTask = async (req, res) => {
    try {
      const task = await Task.findOne({
        _id: req.params.id,
        user: req.user.id,
      });
  
      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }
  
      const { title, description, status, priority, dueDate } = req.body;
  
      if (title) task.title = title;
      if (description) task.description = description;
      if (status) task.status = status;
      if (priority) task.priority = priority;
      if (dueDate) task.dueDate = dueDate;
  
      await task.save();
  
      return res.status(200).json({
        success: true,
        message: "Task updated successfully",
        task,
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
  const deleteTask = async (req, res) => {
    try {
      const task = await Task.findOne({
        _id: req.params.id,
        user: req.user.id,
      });
  
      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }
  
      await task.deleteOne();
  
      return res.status(200).json({
        success: true,
        message: "Task deleted successfully",
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

module.exports = { createTask, getMyTasks, updateTask, deleteTask };