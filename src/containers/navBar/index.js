import { connect } from 'react-redux';
import NavBar from './navBarComponent';
import { actions } from '../../redux/userModule';

const { userAuth } = actions;

export default connect(null, { userAuth })(NavBar);
