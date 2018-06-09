import mongoose from 'mongoose';
import schemas from '../schemas';

const { userSchema } = schemas;

export default mongoose.model('User', userSchema);
