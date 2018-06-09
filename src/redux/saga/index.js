import { fork } from 'redux-saga/effects';
import { loginFlow, registerFlow, userAuth, logout } from './userSaga';

export default function* rootSaga() {
  yield fork(loginFlow);
  yield fork(registerFlow);
  yield fork(userAuth);
  yield fork(logout);
}
