import { connect } from 'react-redux';
import Login from './loginComponent';
import { actions } from '../../redux/globalModule';

const { userLogin } = actions;
const mapStateToProps = state => ({
  isLogin: state.global.isLogin,
  isFetching: state.global.isFetching,
  reqMsg: state.global.msg,
});

export default connect(mapStateToProps, { userLogin })(Login);
