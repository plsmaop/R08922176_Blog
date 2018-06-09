import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    textAlign: 'center',
  },
  button: {
    margin: theme.spacing.unit,
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  root: {
    textAlign: 'center',
    marginTop: '5%',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      snackBarOpen: false,
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
    const {
      classes, isLogin, isFetching,
      reqMsg,
    } = this.props;
    const { snackBarOpen } = this.state;
    const { handleLogin, handleInputChange, handleClose } = this;
    if (isLogin) {
      return (<Redirect to="/" />);
    }
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
        <div className={classes.wrapper}>
          <Button
            variant="raised"
            color="primary"
            className={classes.button}
            onClick={handleLogin}
            disabled={isFetching}
          >
            登入
          </Button>
          {isFetching && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={!reqMsg.isReqSuccess && snackBarOpen && !isFetching}
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
  reqMsg: PropTypes.object.isRequired,
  classes: PropTypes.objectOf(String).isRequired,
  userLogin: PropTypes.func.isRequired,
};

export default withStyles(styles)(Login);
