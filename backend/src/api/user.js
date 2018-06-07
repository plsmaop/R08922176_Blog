import express from 'express';
import functions from '../functions';
import models from '../db/models/index';

const { UserModel } = models;
const { hash, response, decrypt } = functions;

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username.length === 0) {
    response(res, 400, 2, '帳號不可為空');
    return;
  }
  if (password.length === 0) {
    response(res, 400, 2, '密碼不可為空');
    return;
  }
  UserModel.findOne({ username }).then((userInfo) => {
    if (!userInfo) {
      response(res, 400, 1, '帳號或密碼錯誤');
      return;
    }
    hash.matchPassword(password, userInfo.password).then((isMatch) => {
      if (isMatch) {
        const data = {};
        data.username = userInfo.username;
        data.userType = userInfo.type;
        data.userId = userInfo._id;
        // setting session
        req.session.userInfo = data;
        response(res, 200, 0, '登入成功', data);
      }
      else response(res, 400, 1, '帳號或密碼錯誤');
    });
  }).catch((err) => {
    console.log(err);
    response(res);
  });
});

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (username.length === 0) {
    response(res, 400, 2, '帳號不可為空');
    return;
  }
  if (password.length === 0) {
    response(res, 400, 2, '密碼不可為空');
    return;
  }
  UserModel.findOne({ username })
    .then((data) => {
      if (data) {
        response(res, 200, 1, '帳號已存在');
        return;
      }
      hash.hashPassword(password).then((hashPwd) => {
        const user = new UserModel({
          username,
          password: hashPwd,
          type: username === 'admin' ? 'admin' : 'user',
        });
        console.log(user);
        user.save()
          .then(() => {
            UserModel.findOne({ username })
              .then((userInfo) => {
                const data = {};
                data.username = userInfo.username;
                data.userType = userInfo.type;
                data.userId = userInfo._id;
                console.log(data);
                response(res, 200, 0, '註冊成功', data);
              });
          });
      });
    }).catch((err) => {
      console.log(err);
      response(res);
    });
});

router.get('/userInfo', (req, res) => {
  if (req.session.userInfo) {
    response(res, 200, 0, '', req.session.userInfo);
  } else {
    response(res, 200, 1, '請重新登入', req.session.userInfo);
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

export default router;
