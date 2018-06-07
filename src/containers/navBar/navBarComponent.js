import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      auth: true,
      anchorEl: null,
    };
  }
  handleChange(event, checked) {
    this.setState({ auth: checked });
  }
  handleMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  }
  handleClose() {
    this.setState({ anchorEl: null });
  }
  componentDidMount() {
    this.props.userAuth();
  }
  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              ㄅㄌㄍ
            </Typography>
            <Button
              color="inherit"
              component={({ ...props }) => <Link to="/articleList" {...props} />}
            >文章列表
            </Button>
            <Button
              color="inherit"
              component={({ ...props }) => <Link to="/login" {...props} />}
            >登入
            </Button>
            <Button
              color="inherit"
              component={({ ...props }) => <Link to="/register" {...props} />}
            >註冊
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.objectOf(String).isRequired,
  userAuth: PropTypes.func.isRequired,
};

export default withStyles(styles)(NavBar);
