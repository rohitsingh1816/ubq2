// mongoDB connection setup

// use mongoDB url here don't keep in .env
const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/todo_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};
module.exports = connectDB;