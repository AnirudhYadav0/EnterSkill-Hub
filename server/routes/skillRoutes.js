const express = require("express");
const { addSkill, getMySkills, deleteSkill, updateSkill } = require("../controller/skillController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, addSkill);
router.get("/", authMiddleware, getMySkills);
router.delete("/:id", authMiddleware, deleteSkill);
router.put("/:id", authMiddleware, updateSkill);
module.exports = router;