import { fork } from 'redux-saga/effects';
import { loginFlow, registerFlow, userAuth } from './userSaga';

export default function* rootSaga() {
  yield fork(loginFlow);
  yield fork(registerFlow);
  yield fork(userAuth);
}
