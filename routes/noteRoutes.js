const express = require("express");
const Joi = require("joi");
const Note = require("../models/note");
const router = express.Router();

const noteSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().valid("Work", "Personal", "Others").default("Others"),
});

router.post("/", async (req, res) => {
  try {
    const { error, value } = noteSchema.validate(req.body);
    if (error) {
      console.error("Validation failed:", error.details[0].message);
      return res.status(400).json({ error: error.details[0].message });
    }

    const newNote = await Note.create(value);
    res.status(201).json(newNote);
  } catch (err) {
    console.error("Error creating note:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  const { category, title } = req.query;
  const where = {};
  if (category) where.category = category;
  if (title) where.title = { [Op.like]: `%${title}%` };

  try {
    const notes = await Note.findAll({
      where,
      order: [["created_at", "DESC"]],
    });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/toggle/:id", async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });

    note.completed = !note.completed;
    await note.save();

    res.status(200).json(note);
  } catch (err) {
    console.error("Error toggling note completion:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error, value } = noteSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const note = await Note.findByPk(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });

    await note.update(value);
    res.status(200).json(note);
  } catch (err) {
    console.error("Error updating note:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });

    await note.destroy();
    res.status(204).end();
  } catch (err) {
    console.error("Error deleting note:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
