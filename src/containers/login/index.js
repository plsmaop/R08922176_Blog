import { connect } from 'react-redux';
import Login from './loginComponent';
import { actions } from '../../redux/userModule';

const { userLogin } = actions;

export default connect(null, { userLogin })(Login);
