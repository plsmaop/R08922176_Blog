import { connect } from 'react-redux';
import Article from './articleComponent';
import { actions } from '../../redux/articleModule';

const { getArticle } = actions;
const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id,
  isFetching: state.global.isFetching,
  reqMsg: state.global.msg,
  articleDetail: state.article.articleDetail,
});

export default connect(mapStateToProps, { getArticle })(Article);
