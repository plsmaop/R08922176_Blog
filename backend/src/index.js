import path from 'path';
import express from 'express';
import favicon from 'serve-favicon';
import http from 'http';
import compression from 'compression';
import connectHistoryApiFallback from 'connect-history-api-fallback';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import apiRouter from './api';
import dbUrl from './config';

// config
const backend = express();
const server = http.Server(backend);
const port = process.env.PORT || 3001;
backend.use(compression());
backend.use(favicon(path.join(__dirname, 'favicon.ico')));
backend.use(cors({ credentials: true, origin: true }));
backend.use(bodyParser.urlencoded({ xtended: false }));
backend.use(cookieParser('i_am_lazyeeeee'));
backend.use(session({
  secret: 'i_am_lazyeeeee',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 1000 * 60,
    secure: false,
    httpOnly: false,
  },
}));


// router
backend.use('/', connectHistoryApiFallback());
backend.use('/api', apiRouter);

// data base
mongoose.Promise = bluebird;
mongoose.connect(dbUrl, (err) => {
  if (err) {
    console.log(err, 'failde to connect to db');
    return;
  }
  console.log('connect to db successfully');
  backend.listen(port, (error) => {
    if (error) {
      console.error('err:', error);
    } else {
      console.info(`===> api server is running`);
    }
  });
});

if (process.env.NODE_ENV === 'production') {
  backend.use(express.static(path.join(__dirname, 'build')));
}
