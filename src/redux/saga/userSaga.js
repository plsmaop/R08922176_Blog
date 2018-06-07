import { put, take, call } from 'redux-saga/effects';
import { get, post } from '../../api';
import { actionsTypes } from '../userModule';

export function* login(username, password) {
  yield put({ type: actionsTypes.FETCH_START });
  try {
    return yield call(post, '/user/login', { username, password });
  } catch (error) {
    yield put({ type: actionsTypes.SET_MESSAGE, msgContent: '帳號或密碼錯誤', msgType: 0 });
  } finally {
    yield put({ type: actionsTypes.FETCH_END });
  }
}

export function* register(username, password) {
  yield put({ type: actionsTypes.FETCH_START });
  try {
    return yield call(post, '/user/register', { username, password });
  } catch (error) {
    yield put({ type: actionsTypes.SET_MESSAGE, msgContent: '註冊失敗', msgType: 0 });
  } finally {
    yield put({ type: actionsTypes.FETCH_END });
  }
}

export function* loginFlow() {
  while (true) {
    const request = yield take(actionsTypes.USER_LOGIN);
    const response = yield call(login, request.username, request.password);
    if (response && response.code === 0) {
      yield put({ type: actionsTypes.SET_MESSAGE, msgContent: '登入成功', msgType: 1 });
      yield put({ type: actionsTypes.RECIEVE_USER_INFO, data: response.data });
    }
  }
}

export function* registerFlow() {
  while (true) {
    const request = yield take(actionsTypes.USER_REGISTER);
    const response = yield call(register, request.username, request.password);
    if (response && response.code === 0) {
      yield put({ type: actionsTypes.SET_MESSAGE, msgContent: '註冊成功!', msgType: 1 });
      yield put({ type: actionsTypes.RECIEVE_USER_INFO, data: response.data });
    }
  }
}

export function* userAuth() {
  while (true) {
    yield take(actionsTypes.USER_AUTH);
    try {
      yield put({ type: actionsTypes.FETCH_START });
      const response = yield call(get, '/user/userInfo');
      if (response && response.code === 0) {
        yield put({ type: actionsTypes.RESPONSE_USER_INFO, data: response.data });
      }
    } catch (err) {
      console.log(err);
    } finally {
      yield put({ type: actionsTypes.FETCH_END });
    }
  }
}
