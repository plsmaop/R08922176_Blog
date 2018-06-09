import { connect } from 'react-redux';
import Login from './loginComponent';
import { actions } from '../../redux/userModule';

const { userLogin } = actions;
const mapStateToProps = state => ({
  isLogin: state.user.isLogin,
  isFetching: state.user.isFetching,
  reqMsg: state.user.msg,
});

export default connect(mapStateToProps, { userLogin })(Login);
