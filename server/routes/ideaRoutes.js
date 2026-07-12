const express = require("express");
const { createIdea, getMyIdeas, updateIdea, deleteIdea } = require("../controller/ideaController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createIdea);
router.get("/", authMiddleware, getMyIdeas);
router.put("/:id", authMiddleware, updateIdea);
router.delete("/:id", authMiddleware, deleteIdea);

module.exports = router;