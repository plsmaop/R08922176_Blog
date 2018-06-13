'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _connectHistoryApiFallback = require('connect-history-api-fallback');

var _connectHistoryApiFallback2 = _interopRequireDefault(_connectHistoryApiFallback);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// config
var backend = (0, _express2.default)();
var server = _http2.default.Server(backend);
var port = process.env.PORT || 3001;
backend.use((0, _compression2.default)());
backend.use((0, _cors2.default)({ credentials: true, origin: true }));
backend.use(_bodyParser2.default.urlencoded({ xtended: false }));
backend.use((0, _cookieParser2.default)('i_am_lazyeeeee'));
backend.use((0, _expressSession2.default)({
  secret: 'i_am_lazyeeeee',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 1000 * 60,
    secure: false,
    httpOnly: false
  }
}));

// router
backend.use('/', (0, _connectHistoryApiFallback2.default)());
backend.use('/api', _api2.default);

// data base
_mongoose2.default.Promise = _bluebird2.default;
_mongoose2.default.connect(_config2.default, function (err) {
  if (err) {
    console.log(err, 'failde to connect to db');
    return;
  }
  console.log('connect to db successfully');
  backend.listen(port, function (error) {
    if (error) {
      console.error('err:', error);
    } else {
      console.info('===> api server is running at port ' + port);
    }
  });
});

if (process.env.NODE_ENV === 'production') {
  backend.use(_express2.default.static(_path2.default.join(__dirname, 'build')));
}