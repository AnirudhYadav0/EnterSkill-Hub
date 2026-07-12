const Skill = require("../models/Skill");

// Add Skill
const addSkill = async (req, res) => { 
    try{
        const { name, category, level } = req.body;

        if (!name || !category) {
            return res.status(400).json({
                success: false,
                message: "Name and category are required",
            });
        } 
        const newSkill = await Skill.create({
            name,
            category,
            level,
            user: req.user.id,
        });
        return res.status(201).json({
            success: true,
message: "Skill added successfully",
skill: newSkill,
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

// Get My Skills
const getMySkills = async (req, res) => {
    try {
      const skills = await Skill.find({ user: req.user.id });
  
      return res.status(200).json({
        success: true,
        count: skills.length,
        skills: skills,
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
  // Delete Skill
const deleteSkill = async (req, res) => {
    try {
      const skill = await Skill.findOne({
        _id: req.params.id,
        user: req.user.id,
      });
  
      if (!skill) {
        return res.status(404).json({
          success: false,
          message: "Skill not found",
        });
      }
  
      await skill.deleteOne();
  
      return res.status(200).json({
        success: true,
        message: "Skill deleted successfully",
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
  // Update Skill
const updateSkill = async (req, res) => {
    try {
      const skill = await Skill.findOne({
        _id: req.params.id,
        user: req.user.id
      });
  
      if (!skill) {
        return res.status(404).json({
          success: false,
          message: "Skill not found"
        });
      }
  
      const { name, category, level } = req.body;
  
      if (name) skill.name = name;
      if (category) skill.category = category;
      if (level) skill.level = level;
  
      await skill.save();
  
      return res.status(200).json({
        success: true,
        message: "Skill updated successfully",
        skill: skill
      });
    } catch (error) {
      console.error(error);
  
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message
      });
    }
  };
  module.exports = { addSkill, getMySkills, deleteSkill, updateSkill };