import { connect } from 'react-redux';
import NavBar from './navBarComponent';
import { actions } from '../../redux/globalModule';

const { userAuth, userLogout } = actions;
const mapStateToProps = state => ({
  isLogin: state.global.isLogin,
  isFetching: state.global.isFetching,
  userInfo: state.global.userInfo,
  reqMsg: state.global.msg,
});

export default connect(mapStateToProps, { userAuth, userLogout })(NavBar);
