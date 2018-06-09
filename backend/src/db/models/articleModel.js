import mongoose from 'mongoose';
import schemas from '../schemas';

const { articleSchema } = schemas;

export default mongoose.model('Article', articleSchema);
