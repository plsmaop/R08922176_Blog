import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import { Redirect } from 'react-router';
import ButtonProgress from '../../components/buttonProgress';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
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
    marginTop: '5%',
    textAlign: 'center',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      snackBarOpen: false,
      redirect: false,
    };
    this.handleRegister = this.handleRegister.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.reqMsg.content === '註冊成功，請使用這組帳密登入') {
      // setTimeout(() => this.setState({ snackBarOpen: false }), 1500);
      setTimeout(() => this.setState({ redirect: true }), 2000);
    }
  }
  handleRegister() {
    const { username, password } = this.state;
    this.props.userRegister(username, password);
    // this.setState({ snackBarOpen: true });
  }
  handleInputChange(event, type) {
    if (type === 'username') this.setState({ username: event.target.value });
    else if (type === 'password') this.setState({ password: event.target.value });
  }
  handleClose() {
    this.setState({ snackBarOpen: false });
  }
  render() {
    document.title = '註冊';
    const { snackBarOpen, redirect } = this.state;
    const { classes, isFetching, reqMsg } = this.props;
    const { handleRegister, handleInputChange, handleClose } = this;
    if (redirect) return (<Redirect to="/login" />);
    return (
      <div className={classes.root}>
        <Typography variant="title" color="inherit" className={classes.flex}>
          輸入帳密註冊
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
        <ButtonProgress handleClick={handleRegister} isFetching={isFetching} type="註冊" />
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

Register.propTypes = {
  classes: PropTypes.objectOf(String).isRequired,
  isFetching: PropTypes.bool.isRequired,
  userRegister: PropTypes.func.isRequired,
  reqMsg: PropTypes.shape({
    content: PropTypes.string.isRequired,
    isReqSuccess: PropTypes.bool.isRequired,
  }).isRequired,
};

export default withStyles(styles)(Register);
