// action types
export const actionsTypes = {
  FETCH_START: 'FETCH_START',
  FETCH_END: 'FETCH_END',
  USER_LOGIN: 'USER_LOGIN',
  USER_LOGOUT: 'USER_LOGOUT',
  CLEAR_USER_INFO: 'CLEAR_USER_INFO',
  USER_REGISTER: 'USER_REGISTER',
  RECIEVE_USER_INFO: 'RECIEVE_USER_INFO',
  SET_MESSAGE: 'SET_MESSAGE',
  USER_AUTH: 'USER_AUTH',
};

// action creators
export const actions = {
  userLogin: (username, password) => ({
    type: actionsTypes.USER_LOGIN,
    username,
    password,
  }),
  userLogout: () => ({ type: actionsTypes.USER_LOGOUT }),
  userRegister: (username, password) => ({
    type: actionsTypes.USER_REGISTER,
    username,
    password,
  }),
  clearMsg: () => ({
    type: actionsTypes.SET_MESSAGE,
    msgType: 1,
    msgContent: '',
  }),
  userAuth: () => ({ type: actionsTypes.USER_AUTH }),
};

// msg type: 1 成功, 0 失敗
// initial state
const initialState = {
  isLogin: false,
  isFetching: false,
  msg: {
    isReqSuccess: true,
    content: '',
    code: 0,
  },
  userInfo: {
    username: '',
    userType: '',
    userId: '',
  },
};

// reudcer
export default (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.FETCH_START:
      return {
        ...state, isFetching: true,
      };
    case actionsTypes.FETCH_END:
      return {
        ...state, isFetching: false,
      };
    case actionsTypes.SET_MESSAGE:
      return {
        ...state,
        isFetching: false,
        msg: {
          isReqSuccess: action.isReqSuccess,
          content: action.msgContent,
          code: action.code,
        },
      };
    case actionsTypes.RECIEVE_USER_INFO:
      return {
        ...state,
        userInfo: action.data,
        isLogin: true,
      };
    case actionsTypes.CLEAR_USER_INFO:
      return {
        ...state,
        isLogin: false,
        userInfo: {},
      };
    default:
      return state;
  }
};
