import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  flex: {
    flex: 1,
  },
  root: {
    marginTop: '5%',
    textAlign: 'center',
  },
});

class Register extends Component {
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
    this.props.userRegister(username, password);
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
        <div>
          <Button
            variant="raised"
            color="primary"
            className={classes.button}
            onClick={handleRegister}
          >註冊
          </Button>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.objectOf(String).isRequired,
  userRegister: PropTypes.func.isRequired,
};

export default withStyles(styles)(Register);
