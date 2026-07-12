const BusinessIdea = require("../models/BusinessIdea");

// Create Business Idea
const createIdea = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const newIdea = await BusinessIdea.create({
      title,
      description,
      category,
      user: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Business idea created successfully",
      idea: newIdea,
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
// Get My Business Ideas
const getMyIdeas = async (req, res) => {
    try {
      const ideas = await BusinessIdea.find({
        user: req.user.id,
      });
  
      return res.status(200).json({
        success: true,
        count: ideas.length,
        ideas: ideas,
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
  // Update Business Idea
const updateIdea = async (req, res) => {
    try {
      const idea = await BusinessIdea.findOne({
        _id: req.params.id,
        user: req.user.id,
      });
  
      if (!idea) {
        return res.status(404).json({
          success: false,
          message: "Business idea not found",
        });
      }
  
      const { title, description, category, status } = req.body;
  
      if (title) idea.title = title;
      if (description) idea.description = description;
      if (category) idea.category = category;
      if (status) idea.status = status;
  
      await idea.save();
  
      return res.status(200).json({
        success: true,
        message: "Business idea updated successfully",
        idea: idea,
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
  // Delete Business Idea
const deleteIdea = async (req, res) => {
    try {
      const idea = await BusinessIdea.findOne({
        _id: req.params.id,
        user: req.user.id,
      });
  
      if (!idea) {
        return res.status(404).json({
          success: false,
          message: "Business idea not found",
        });
      }
  
      await idea.deleteOne();
  
      return res.status(200).json({
        success: true,
        message: "Business idea deleted successfully",
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

  module.exports = { createIdea, getMyIdeas, updateIdea, deleteIdea };