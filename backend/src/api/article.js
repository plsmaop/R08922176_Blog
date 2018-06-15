import express from 'express';
import functions from '../functions';
import models from '../db/models';

const router = express.Router();
const { ArticleModel } = models;
const { response } = functions;

router.post('/newArticle', (req, res) => {
  const {
    title, partialContent,
    content, time, timestamp,
  } = req.body;
  if (!req.session.userInfo) response(res, 200, 1, '登入逾期，請重新登入');
  else {
    const author = req.session.userInfo.username;
    const tempArticle = new ArticleModel({
      title,
      content,
      partialContent,
      time,
      author,
      timestamp,
    });
    tempArticle.save().then((data) => {
      response(res, 200, 0, '發文成功', data);
    }).catch((err) => {
      console.log(err);
      response(res, 200, 2, '發文失敗');
    });
  }
});

router.patch('/:id', (req, res) => {
  if (!req.session.userInfo) {
    response(res, 200, 1, '登入逾期，請重新登入');
    return;
  }
  const { id } = req.params;
  if (!id) {
    response(res, 200, 2, '文章不存在');
    return;
  }
  const {
    title,
    content,
    time,
    partialContent,
  } = req.body;
  const author = req.session.userInfo.username;
  ArticleModel.findOne({ _id: id }).then((result) => {
    if (!result) response(res, 200, 2, '文章不存在');
    else if (result.author !== author) response(res, 200, 1, '權限錯誤');
  }).catch((err) => {
    console.log(err);
    response(res, 200, 2, '更新失敗!');
  });
  ArticleModel.update(
    { _id: id },
    {
      title, content, time, partialContent,
    },
  ).then((result) => {
    console.log(result);
    if (result.author !== author) response(res, 200, 1, '權限錯誤');
    else response(res, 200, 0, '更新成功', result);
  }).catch((err) => {
    console.log(err);
    response(res, 200, 2, '更新失敗');
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    response(res, 200, 2, '文章不存在');
    return;
  }
  if (!req.session.userInfo) {
    response(res, 200, 1, '登入逾期，請重新登入');
    return;
  }
  const author = req.session.userInfo.username;
  /* ArticleModel.findOne({ _id: id }).then((result) => {
    if (!result) response(res, 200, 2, '文章不存在');
    else if (result.author !== author) response(res, 200, 1, '權限錯誤');
  }).catch((err) => {
    // console.log(err);
    // response(res, 200, 2, '刪除失敗!');
  }); */
  ArticleModel.remove({ _id: id })
    .then((result) => {
      if (result.n === 1) {
        response(res, 200, 0, '刪除成功!');
      } else {
        response(res, 200, 2, '文章不存在');
      }
    }).catch((err) => {
      // console.log(err);
      response(res, 200, 2, '刪除失敗!');
    });
});

router.get('/articleList', (req, res) => {
  const responseData = {
    total: 0,
    list: [],
  };
  ArticleModel.find({}, '_id title author time partialContent').sort({ timestamp: -1 }).then((result) => {
    responseData.list = result;
    response(res, 200, 0, '成功獲取文章列表', responseData);
  }).catch((err) => {
    response(res, 200, 2, '獲取文章列表失敗');
    console.log(err);
  });
});


router.get('/:id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    response(res, 200, 2, '文章不存在');
    return;
  }
  ArticleModel.findOne({ _id: id })
    .then((result) => {
      if (result) response(res, 200, 0, '成功載入文章', result);
      else response(res, 200, 2, '文章不存在');
    }).catch((err) => {
      response(res, 200, 2, '載入文章失敗');
      console.log(err);
    });
});

export default router;
