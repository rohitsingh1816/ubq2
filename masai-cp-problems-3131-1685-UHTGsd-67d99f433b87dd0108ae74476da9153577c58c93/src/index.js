// create server setup here

// export app
// module.exports =app
const express = require('express');
const app = express();
// Import routes
const todoRoutes = require('./routes/todoRoutes');
// Middleware
app.use(express.json());
// Routes
app.use('/', todoRoutes);
// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app;