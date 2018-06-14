import { connect } from 'react-redux';
import NavBar from './navBarComponent';
import { actions } from '../../redux/globalModule';
import { actions as articleActions } from '../../redux/articleModule';

const { userAuth, userLogout } = actions;
const { getArticleList } = articleActions;
const mapStateToProps = state => ({
  isLogin: state.global.isLogin,
  isFetching: state.global.isFetching,
  userInfo: state.global.userInfo,
  reqMsg: state.global.msg,
});

export default connect(mapStateToProps, { userAuth, userLogout, getArticleList })(NavBar);
