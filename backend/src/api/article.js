import express from 'express';
import functions from '../functions';
import models from '../db/models';

const router = express.Router();
const { ArticleModel } = models;
const { response } = functions;

router.post('/addArticle', (req, res) => {
  const {
    title, content, time,
    isPublish,
  } = req.body;
  const author = req.session.userInfo.username;
  const commentCount = 0;
  const tempArticle = new ArticleModel({
    title,
    content,
    isPublish,
    commentCount,
    time,
    author,
  });
  tempArticle.save().then((data) => {
    response(res, 200, 0, '保存成功', data);
  }).cancel((err) => {
    console.log(err);
    response(res);
  });
});

router.post('/updateArticle', (req, res) => {
  const {
    title,
    content,
    time,
    isPublish,
    id,
  } = req.body;
  ArticleModel.update(
    { _id: id },
    {
      title, content, time, isPublish,
    },
  ).then((result) => {
    console.log(result);
    response(res, 200, 0, '更新成功', result);
  }).cancel((err) => {
    console.log(err);
    response(res);
  });
});

router.get('/delArticle', (req, res) => {
  const { id } = req.query;
  ArticleModel.remove({ _id: id })
    .then((result) => {
      if (result.result.n === 1) {
        response(res, 200, 0, '删除成功!');
      } else {
        response(res, 200, 1, '文章不存在');
      }
    }).cancel((err) => {
      console.log(err);
      response(res);
    });
});

export default router;
