import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';
import rootSaga from './saga';

const sagaMiddlewrae = createSagaMiddleware();

/*eslint-disable */
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk, sagaMiddlewrae),
);
sagaMiddlewrae.run(rootSaga);
store.subscribe(() => console.log(store.getState()));
/*eslint-disable */
  
export default store;
