const dbUrl = process.env.NODE_ENV === 'production' ?
  process.env.MONGODB : 'mongodb://localhost:27017/blog';

export default dbUrl;
