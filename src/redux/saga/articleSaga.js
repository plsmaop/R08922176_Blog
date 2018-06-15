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
    const dateTime = Date.now();
    const timestamp = Math.floor(dateTime / 1000);
    const data = {
      title,
      content,
      id,
      partialContent,
      time: new Date(),
      timestamp,
    };
    /* if (id) {
      return yield call(post, '/article/updateArticle', data);
    } else {
      return yield call(post, '/article/addArticle', data);
    } */
    return yield call(post, '/article/newArticle', data);
  } catch (err) {
    console.log(err);
    return yield put({ code: 2, message: '網路異常，請稍候重試' });
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
            code: res.code,
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
            code: res.code,
          });
        } else {
          yield put({
            type: globalActionsTypes.SET_MESSAGE,
            msgContent: res.message,
            isReqSuccess: false,
            code: res.code,
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
    return yield put({ code: 2, message: '網路異常，請稍候重試' });
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
          code: res.code,
        });
      } else {
        yield put({
          type: globalActionsTypes.SET_MESSAGE,
          msgContent: res.message,
          isReqSuccess: false,
          code: res.code,
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
    return yield put({ code: 2, message: '網路異常，請稍候重試' });
  } finally {
    yield put({ type: globalActionsTypes.FETCH_END });
  }
}

export function* delArticle(id) {
  yield put({ type: globalActionsTypes.FETCH_START });
  try {
    return yield call(del, `/article/${id}`);
  } catch (err) {
    return yield put({ code: 2, message: '網路異常，請稍候重試' });
  } finally {
    yield put({ type: globalActionsTypes.FETCH_END });
  }
}

export function* delArticleFlow() {
  while (true) {
    const req = yield take(ArticleActionsTypes.DEL_ARTICLE);
    const res = yield call(delArticle, req.id);
    console.log(res);
    if (res) {
      if (res.code === 0) {
        yield put({
          type: globalActionsTypes.SET_MESSAGE,
          msgContent: res.message,
          isReqSuccess: true,
          code: res.code,
        });
      } else {
        yield put({
          type: globalActionsTypes.SET_MESSAGE,
          msgContent: res.message,
          isReqSuccess: false,
          code: res.code,
        });
      }
    } else {
      yield put({
        type: globalActionsTypes.SET_MESSAGE,
        msgContent: '網路異常，請稍候重試',
        isReqSuccess: false,
        code: 2,
      });
    }
  }
}

export function* getArticleFlow() {
  while (true) {
    const req = yield take(ArticleActionsTypes.GET_ARTICLE);
    console.log(req);
    const res = yield call(getArticle, req.id);
    if (res) {
      if (res.code === 0) {
        yield put({ type: ArticleActionsTypes.RECIEVE_ARTICLE, data: res.data });
        yield put({
          type: globalActionsTypes.SET_MESSAGE,
          msgContent: res.message,
          isReqSuccess: true,
          code: res.code,
        });
      } else {
        yield put({
          type: globalActionsTypes.SET_MESSAGE,
          msgContent: res.message,
          isReqSuccess: false,
          code: res.code,
        });
      }
    } else {
      yield put({
        type: globalActionsTypes.SET_MESSAGE,
        msgContent: '網路異常，請稍候重試',
        isReqSuccess: false,
        code: 2,
      });
    }
  }
}
