import { combineReducers } from 'redux';
import global from './globalModule';
import article from './articleModule';

export default combineReducers({
  global,
  article,
});
