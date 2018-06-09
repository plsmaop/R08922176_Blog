import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
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
    display: 'inline-block',
  },
};

class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  componentDidMount() {
    this.props.userAuth();
  }
  handleMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  }
  handleClose() {
    this.setState({ anchorEl: null });
  }
  handleLogout() {
    this.setState({ anchorEl: null });
    this.props.userLogout();
  }
  render() {
    const {
      classes, isLogin, isFetching,
      userInfo,
    } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const login = (isLogin && !isFetching && userInfo) ? (
      <div>
        <IconButton
          aria-owns={open ? 'menu-appbar' : null}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>我的文章</MenuItem>
          <MenuItem onClick={this.handleLogout}>登出</MenuItem>
        </Menu>
        <Button
          color="inherit"
          onClick={this.handleMenu}
        > {`Hi, ${userInfo.username}`}
        </Button>
      </div>
    ) :
      (
        <div>
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
        </div>
      );
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
              component={({ ...props }) => <Link to="/" {...props} />}
            >ㄅㄌㄍ
            </Typography>
            <Button
              color="inherit"
              component={({ ...props }) => <Link to="/articleList" {...props} />}
            >文章列表
            </Button>
            {login}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  userInfo: PropTypes.objectOf(String).isRequired,
  classes: PropTypes.objectOf(String).isRequired,
  userAuth: PropTypes.func.isRequired,
  userLogout: PropTypes.func.isRequired,
};

export default withStyles(styles)(NavBar);