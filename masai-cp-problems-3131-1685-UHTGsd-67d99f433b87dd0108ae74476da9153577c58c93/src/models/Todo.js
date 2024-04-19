// create Schema and model for todo

// module.exports = Todo; (model name should be Todo)
const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Todo', todoSchema);