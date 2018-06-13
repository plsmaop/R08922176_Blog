import { connect } from 'react-redux';
import Register from './registerComponent';
import { actions } from '../../redux/globalModule';

const { userRegister } = actions;
const mapStateToProps = state => ({
  isFetching: state.global.isFetching,
  reqMsg: state.global.msg,
});

export default connect(mapStateToProps, { userRegister })(Register);
