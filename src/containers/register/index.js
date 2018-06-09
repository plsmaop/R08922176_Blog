import { connect } from 'react-redux';
import Register from './registerComponent';
import { actions } from '../../redux/userModule';

const { userRegister } = actions;
const mapStateToProps = state => ({
  isFetching: state.user.isFetching,
  reqMsg: state.user.msg,
});

export default connect(mapStateToProps, { userRegister })(Register);
