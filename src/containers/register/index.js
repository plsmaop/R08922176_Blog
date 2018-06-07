import { connect } from 'react-redux';
import Register from './registerComponent';
import { actions } from '../../redux/userModule';

const { userRegister } = actions;

export default connect(null, { userRegister })(Register);
