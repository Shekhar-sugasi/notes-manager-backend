const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");

// Define Note Model
const Note = sequelize.define("Note", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.ENUM("Work", "Personal", "Others"),
    defaultValue: "Others",
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW, // Default current date/time
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW, // Default current date/time
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Default value for completed
  },
});

module.exports = Note;
