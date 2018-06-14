import { connect } from 'react-redux';
import Article from './articleComponent';
import { actions } from '../../redux/articleModule';

const { getArticle, delArticle } = actions;
const mapStateToProps = (state, ownProps) => ({
  isLogin: state.global.isLogin,
  id: ownProps.match.params.id,
  isFetching: state.global.isFetching,
  reqMsg: state.global.msg,
  username: state.global.userInfo.username,
  articleDetail: state.article.articleDetail,
});

export default connect(mapStateToProps, { getArticle, delArticle })(Article);
