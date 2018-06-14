const dbUrl = process.env.NODE_ENV === 'production' ?
  process.env.MONGODB : 'mongodb://b03102082:webprogramming2018@ds151840.mlab.com:51840/blog';

export default dbUrl;
