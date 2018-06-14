export const actionsTypes = {
  UPDATING_TITLE: 'UPDATING_TITLE',
  UPDATING_CONTENT: 'UPDATING_CONTENT',
  UPDATING_PARTIAL_CONTENT: 'UPDATING_PARTIAL_CONTENT',
  POST_ARTICLE: 'POST_ARTICLE',
  CLEAR_DRAFT: 'CLEAR_DRAFT',
  SET_ARTICLE_ID: 'SET_ARTICLE_ID',
  GET_ARTICLE_LIST: 'GET_ARTICLE_LIST',
  RECIEVE_ARTICLE_LIST: 'RECIEVE_ARTICLE_LIST',
  GET_ARTICLE: 'GET_ARTICLE',
  RECIEVE_ARTICLE: 'RECIEVE_ARTICLE',
  DEL_ARTICLE: 'DEL_ARTICLE',
};

export const actions = {
  updateTitle: title => ({
    type: actionsTypes.UPDATING_TITLE,
    title,
  }),
  updateContent: content => ({
    type: actionsTypes.UPDATING_CONTENT,
    content,
  }),
  updatePartialContent: partialContent => ({
    type: actionsTypes.UPDATING_PARTIAL_CONTENT,
    partialContent,
  }),
  postArticle: () => ({ type: actionsTypes.POST_ARTICLE }),
  getArticleList: () => ({
    type: actionsTypes.GET_ARTICLE_LIST,
  }),
  getArticle: id => ({
    type: actionsTypes.GET_ARTICLE,
    id,
  }),
  delArticle: id => ({
    type: actionsTypes.DEL_ARTICLE,
    id,
  }),
};

const initialState = {
  articleDraft: {
    title: '',
    content: '',
    id: '',
    partialContent: '',
  },
  articleList: [],
  articleDetail: {},
  pageNum: 1,
  total: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.UPDATING_TITLE:
      return {
        ...state,
        articleDraft: {
          ...state.articleDraft,
          title: action.title,
        },
      };
    case actionsTypes.UPDATING_CONTENT:
      return {
        ...state,
        articleDraft: {
          ...state.articleDraft,
          content: action.content,
        },
      };
    case actionsTypes.UPDATING_PARTIAL_CONTENT:
      return {
        ...state,
        articleDraft: {
          ...state.articleDraft,
          partialContent: action.partialContent,
        },
      };
    case actionsTypes.CLEAR_DRAFT:
      return {
        ...state,
        articleDraft: {
          title: '',
          content: '',
          id: '',
          partialContent: '',
        },
      };
    case actionsTypes.SET_ARTICLE_ID:
      return {
        ...state,
        articleDraft: {
          ...state.articleDraft,
          id: action.id,
        },
      };
    case actionsTypes.RECIEVE_ARTICLE_LIST:
      return {
        ...state,
        articleList: [...action.data.list],
        total: action.data.total,
      };
    case actionsTypes.RECIEVE_ARTICLE:
      return {
        ...state,
        articleDetail: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
