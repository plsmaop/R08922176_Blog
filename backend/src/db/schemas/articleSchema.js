import mongoose from 'mongoose';

export default new mongoose.Schema({
  title: String,
  content: String,
  partialContent: String,
  time: String,
  timestamp: String,
  author: String,
});
