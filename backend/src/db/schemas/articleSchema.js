import mongoose from 'mongoose';

export default new mongoose.Schema({
  title: String,
  content: String,
  commentCount: Number,
  time: String,
  author: String,
  isPublish: Boolean,
});
