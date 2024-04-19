// complete below functions

const Todo = require('../models/Todo');
// Welcome message controller
const welcomeMessage = (req, res) => {
  res.status(200).json({ message: "Welcome to todo CRUD application" });
};
// Get all todos controller
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Create todo controller
const createTodo = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: "Title and Description are mandatory" });
  }
  try {
    const todo = new Todo({
      title,
      description,
      status: "pending",
      createdAt: Date.now()
    });
    await todo.save();
    res.status(201).json({ message: "Todo created successfully", todo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update todo controller
const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const todo = await Todo.findByIdAndUpdate(id, { status }, { new: true });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo updated successfully", todo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Delete todo controller
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  welcomeMessage,
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
};