import { put, take, call } from 'redux-saga/effects';
import { get, post } from '../../api';
import { actionsTypes } from '../globalModule';
import { actionsTypes as articleActionsTypes } from '../articleModule';

export function* login(username, password) {
  yield put({ type: actionsTypes.FETCH_START });
  try {
    return yield call(post, '/user/login', { username, password });
  } catch (error) {
    console.log(error);
    return yield put({ code: 2, message: '網路異常，請稍候重試' });
  } finally {
    yield put({ type: actionsTypes.FETCH_END });
  }
}

export function* register(username, password) {
  yield put({ type: actionsTypes.FETCH_START });
  try {
    return yield call(post, '/user/register', { username, password });
  } catch (error) {
    console.log(error);
    return yield put({ code: 2, message: '網路異常，請稍候重試' });
  } finally {
    yield put({ type: actionsTypes.FETCH_END });
  }
}

export function* loginFlow() {
  while (true) {
    const request = yield take(actionsTypes.USER_LOGIN);
    const res = yield call(login, request.username, request.password);
    console.log(res);
    if (res) {
      const isReqSuccess = (res.code === 0);
      yield put({
        type: actionsTypes.SET_MESSAGE,
        msgContent: res.message,
        isReqSuccess,
        code: res.code,
      });
      if (res.code === 0) {
        yield put({ type: actionsTypes.RECIEVE_USER_INFO, data: res.data });
      }
    } else {
      yield put({
        type: actionsTypes.SET_MESSAGE,
        msgContent: '網路異常，請稍候重試',
        isReqSuccess: false,
        code: 2,
      });
    }
  }
}

export function* registerFlow() {
  while (true) {
    const request = yield take(actionsTypes.USER_REGISTER);
    const res = yield call(register, request.username, request.password);
    if (res) {
      const isReqSuccess = (res.code === 0);
      yield put({
        type: actionsTypes.SET_MESSAGE,
        msgContent: res.message,
        isReqSuccess,
        code: res.code,
      });
    } else {
      yield put({
        type: actionsTypes.SET_MESSAGE,
        msgContent: '網路異常，請稍候重試',
        isReqSuccess: false,
        code: 2,
      });
    }
  }
}

export function* userAuth() {
  while (true) {
    yield take(actionsTypes.USER_AUTH);
    try {
      yield put({ type: actionsTypes.FETCH_START });
      const res = yield call(get, '/user/userInfo');
      console.log(res);
      if (res) {
        if (res.code === 0) {
          yield put({ type: actionsTypes.RECIEVE_USER_INFO, data: res.data });
        } else if (res.code === 1) {
          yield put({ type: actionsTypes.CLEAR_USER_INFO });
        }
      } else {
        yield put({
          type: actionsTypes.SET_MESSAGE,
          msgContent: '網路異常，請稍候重試',
          isReqSuccess: false,
          code: res.code,
        });
      }
    } catch (err) {
      console.log(err);
      yield put({
        type: actionsTypes.SET_MESSAGE,
        msgContent: '網路異常，請稍候重試',
        isReqSuccess: false,
        code: 2,
      });
    } finally {
      yield put({ type: actionsTypes.FETCH_END });
    }
  }
}

export function* logout() {
  while (true) {
    yield take(actionsTypes.USER_LOGOUT);
    try {
      yield put({ type: actionsTypes.FETCH_START });
      const res = yield call(get, '/user/logout');
      if (res && res.code === 0) {
        yield put({ type: actionsTypes.CLEAR_USER_INFO });
        yield put({ type: articleActionsTypes.CLEAR_DRAFT });
        yield put({
          type: actionsTypes.SET_MESSAGE,
          msgContent: res.message,
          isReqSuccess: true,
          code: res.code,
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      yield put({ type: actionsTypes.FETCH_END });
    }
  }
}
