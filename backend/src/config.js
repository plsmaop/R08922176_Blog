const dbUrl = process.env.NODE_ENV === 'production' ?
  'plsmaop:Kevin19961@ds151840.mlab.com:51840/blog' : 'localhost:27017/blog';

export default dbUrl;
