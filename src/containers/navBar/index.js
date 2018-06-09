import { connect } from 'react-redux';
import NavBar from './navBarComponent';
import { actions } from '../../redux/userModule';

const { userAuth, userLogout } = actions;
const mapStateToProps = state => ({
  isLogin: state.user.isLogin,
  isFetching: state.user.isFetching,
  userInfo: state.user.userInfo,
  reqMsg: state.user.msg,
});

export default connect(mapStateToProps, { userAuth, userLogout })(NavBar);
