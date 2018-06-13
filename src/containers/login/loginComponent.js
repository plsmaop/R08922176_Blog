import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import { Redirect } from 'react-router';
import ButtonProgress from '../../components/buttonProgress';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    textAlign: 'center',
  },
  flex: {
    flex: 1,
  },
  root: {
    textAlign: 'center',
    marginTop: '5%',
  },
});

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      snackBarOpen: false,
      redirect: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleLogin() {
    const { username, password } = this.state;
    this.props.userLogin(username, password);
    this.setState({ snackBarOpen: true });
  }
  handleInputChange(event, type) {
    if (type === 'username') this.setState({ username: event.target.value });
    else if (type === 'password') this.setState({ password: event.target.value });
  }
  handleClose() {
    this.setState({ snackBarOpen: false });
  }
  render() {
    document.title = '登入';
    const {
      classes, isFetching,
      reqMsg,
    } = this.props;
    const { snackBarOpen, redirect } = this.state;
    const { handleLogin, handleInputChange, handleClose } = this;
    if (reqMsg.isReqSuccess && snackBarOpen) {
      setTimeout(() => this.setState({ snackBarOpen: false }), 1500);
      setTimeout(() => this.setState({ redirect: true }), 2000);
    }
    if (redirect) return (<Redirect to="/" />);
    return (
      <div className={classes.root}>
        <Typography variant="title" color="inherit" className={classes.flex}>
          輸入帳密登入
        </Typography>
        <TextField
          id="search"
          label="帳號"
          type="search"
          className={classes.textField}
          margin="normal"
          onChange={e => handleInputChange(e, 'username')}
        /><br />
        <TextField
          id="password-input"
          label="密碼"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
          onChange={e => handleInputChange(e, 'password')}
        />
        <ButtonProgress handleClick={handleLogin} isFetching={isFetching} type="登入" />
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={snackBarOpen && !isFetching}
          onClose={handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{reqMsg.content}</span>}
        />
      </div>
    );
  }
}

Login.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  classes: PropTypes.objectOf(String).isRequired,
  userLogin: PropTypes.func.isRequired,
  reqMsg: PropTypes.shape({
    content: PropTypes.string.isRequired,
    isReqSuccess: PropTypes.bool.isRequired,
  }).isRequired,
};

export default withStyles(styles)(Login);
