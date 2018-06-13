import { take, call, put, select } from 'redux-saga/effects';
import { get, post, del, patch } from '../../api';
import { actionsTypes as globalActionsTypes } from '../globalModule';
import { actionsTypes as ArticleActionsTypes } from '../articleModule';

export function* postArticle() {
  yield put({ type: globalActionsTypes.FETCH_START });
  try {
    const title = yield select(state => state.article.articleDraft.title);
    const content = yield select(state => state.article.articleDraft.content);
    const id = yield select(state => state.article.articleDraft.id);
    const partialContent = yield select(state => state.article.articleDraft.partialContent);
    const data = {
      title,
      content,
      id,
      partialContent,
      time: new Date(),
    };
    /* if (id) {
      return yield call(post, '/article/updateArticle', data);
    } else {
      return yield call(post, '/article/addArticle', data);
    } */
    return yield call(post, '/article/newArticle', data);
  } catch (err) {
    console.log(err);
    return yield put({ type: globalActionsTypes.SET_MESSAGE, msgContent: '網路錯誤', isReqSuccess: false });
  } finally {
    yield put({ type: globalActionsTypes.FETCH_END });
  }
}

export function* postArticleFlow() {
  while (true) {
    const request = yield take(ArticleActionsTypes.POST_ARTICLE);
    /* if (request.data.title.length === 0) {
      yield put({ type: globalActionsTypes.SET_MESSAGE, msgContent: '標題不可空白', isReqSuccess: false });
    } else if (request.data.content.length === 0) {
      yield put({ type: globalActionsTypes.SET_MESSAGE, msgContent: '內容不可空白', isReqSuccess: false });
    } */
    if (1) {
      const res = yield call(postArticle);
      if (res) {
        if (res.code === 0) {
          yield put({
            type: globalActionsTypes.SET_MESSAGE,
            msgContent: res.message,
            isReqSuccess: true,
          });
          yield put({
            type: ArticleActionsTypes.RECIEVE_ARTICLE,
            data: res.data,
          });
          yield put({ type: ArticleActionsTypes.CLEAR_DRAFT });
        } else if (res.code === 1) {
          // 請重新登入
          yield put({ type: globalActionsTypes.CLEAR_USER_INFO });
          yield put({
            type: globalActionsTypes.SET_MESSAGE,
            msgContent: res.message,
            isReqSuccess: false,
          });
        } else {
          yield put({
            type: globalActionsTypes.SET_MESSAGE,
            msgContent: res.message,
            isReqSuccess: false,
          });
        }
      }
    }
  }
}

export function* getArticleList() {
  yield put({ type: globalActionsTypes.FETCH_START });
  try {
    return yield call(get, '/article/articleList');
  } catch (err) {
    return yield put({ type: globalActionsTypes.SET_MESSAGE, msgContent: '網路錯誤', isReqSuccess: false });
  } finally {
    yield put({ type: globalActionsTypes.FETCH_END });
  }
}

export function* getArticleListFlow() {
  while (true) {
    const req = yield take(ArticleActionsTypes.GET_ARTICLE_LIST);
    const res = yield call(getArticleList, req.pageNum);
    if (res) {
      if (res.code === 0) {
        res.data.pageNum = req.pageNum;
        yield put({ type: ArticleActionsTypes.RECIEVE_ARTICLE_LIST, data: res.data });
        yield put({
          type: globalActionsTypes.SET_MESSAGE,
          msgContent: res.message,
          isReqSuccess: true,
        });
      } else {
        yield put({
          type: globalActionsTypes.SET_MESSAGE,
          msgContent: res.message,
          isReqSuccess: false,
        });
      }
    }
  }
}

export function* getArticle(id) {
  yield put({ type: globalActionsTypes.FETCH_START });
  try {
    return yield call(get, `/article/${id}`);
  } catch (err) {
    return yield put({ type: globalActionsTypes.SET_MESSAGE, msgContent: '網路錯誤', isReqSuccess: false });
  } finally {
    yield put({ type: globalActionsTypes.FETCH_END });
  }
}

export function* getArticleFlow() {
  while (true) {
    const req = yield take(ArticleActionsTypes.GET_ARTICLE);
    const res = yield call(getArticle, req.id);
    if (res) {
      if (res.code === 0) {
        yield put({ type: ArticleActionsTypes.RECIEVE_ARTICLE, data: res.data });
        yield put({
          type: globalActionsTypes.SET_MESSAGE,
          msgContent: res.message,
          isReqSuccess: false,
        });
      } else {
        yield put({
          type: globalActionsTypes.SET_MESSAGE,
          msgContent: res.message,
          isReqSuccess: false,
        });
      }
    }
  }
}
