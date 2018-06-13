import { connect } from 'react-redux';
import Editor from './editorComponent';
import { actions } from '../../redux/articleModule';

const {
  updateTitle, updateContent, updatePartialContent,
  postArticle,
} = actions;
const mapStateToProps = state => ({
  isLogin: state.global.isLogin,
  isFetching: state.global.isFetching,
  reqMsg: state.global.msg,
});

export default connect(mapStateToProps, {
  updateTitle,
  updateContent,
  updatePartialContent,
  postArticle,
})(Editor);
