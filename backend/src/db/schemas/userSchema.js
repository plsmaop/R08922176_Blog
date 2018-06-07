import mongoose from 'mongoose';

export default new mongoose.Schema({
  username: String,
  password: String,
  type: String,
});
