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
backend.use(cors({ credentials: true, origin: true }));
backend.use(bodyParser.urlencoded({ xtended: false }));
backend.use(cookieParser('i_am_lazyeeeee'));
backend.use(session({
  secret: 'i_am_lazyeeeee',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 1000 * 30 },
}));


// router
backend.use('/', connectHistoryApiFallback());
// server.use('/', require('./main'));
// server.use('/admin', require('./admin'));
backend.use('/api', apiRouter);

// data base
mongoose.Promise = bluebird;
mongoose.connect(`mongodb://${dbUrl}`, (err) => {
  if (err) {
    console.log(err, 'failde to connect to db');
    return;
  }
  console.log('connect to db successfully');
  backend.listen(port, (error) => {
    if (error) {
      console.error('err:', error);
    } else {
      console.info(`===> api server is running at port ${port}`);
    }
  });
});

// backend.use('/', (req, res) => res.sendFile(__dirname+'/build/index.html'));
// backend.use(express.static(__dirname+'/build'));
