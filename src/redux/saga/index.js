import { fork } from 'redux-saga/effects';
import { loginFlow, registerFlow, userAuth, logout } from './globalSaga';
import { getArticleListFlow, getArticleFlow, postArticleFlow, delArticleFlow } from './articleSaga';

export default function* rootSaga() {
  yield fork(loginFlow);
  yield fork(registerFlow);
  yield fork(userAuth);
  yield fork(logout);
  yield fork(getArticleListFlow);
  yield fork(getArticleFlow);
  yield fork(postArticleFlow);
  yield fork(delArticleFlow);
}
