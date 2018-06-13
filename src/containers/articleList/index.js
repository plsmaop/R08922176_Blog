import { connect } from 'react-redux';
import ArticleList from './articleListComponent';
import { actions } from '../../redux/articleModule';

const { getArticleList } = actions;

const mapStatToProps = state => ({
  articleList: state.article.articleList,
  isLogin: state.global.isLogin,
  isFetching: state.global.isFetching,
});

export default connect(mapStatToProps, { getArticleList })(ArticleList);
