import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
    };
    this.handleRegister = this.handleRegister.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleRegister() {
    const { username, password } = this.state;
    this.props.userLogin(username, password);
  }
  handleInputChange(event, type) {
    if (type === 'username') this.setState({ username: event.target.value });
    else if (type === 'password') this.setState({ password: event.target.value });
  }
  render() {
    const { classes } = this.props;
    const { handleRegister, handleInputChange } = this;
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
        <div>
          <Button
            variant="raised"
            color="primary"
            className={classes.button}
            onClick={handleRegister}
          >
            登入
          </Button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.objectOf(String).isRequired,
  userLogin: PropTypes.func.isRequired,
};

export default withStyles(styles)(Login);
