// create routes for todo
const express = require('express');
const router = express.Router();
// Import controller
const {
  welcomeMessage,
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
} = require('../controllers/todoController');
// Routes
router.get('/', welcomeMessage);
router.get('/todos', getTodos);
router.post('/todos/create', createTodo);
router.patch('/todos/:id', updateTodo);
router.delete('/todos/:id', deleteTodo);
module.exports = router;












