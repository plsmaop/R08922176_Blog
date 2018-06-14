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
import Snackbar from '@material-ui/core/Snackbar';

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
  bar: {
  },
};

class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null,
      snackBarOpen: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSnackBarClose = this.handleSnackBarClose.bind(this);
  }
  componentDidMount() {
    this.props.userAuth();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.reqMsg.content.length > 0) {
      this.setState({ snackBarOpen: true });
    }
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
  handleSnackBarClose() {
    this.setState({ snackBarOpen: false });
  }
  render() {
    const {
      classes, isLogin, isFetching,
      userInfo, reqMsg, getArticleList,
    } = this.props;
    const { anchorEl, snackBarOpen } = this.state;
    const open = Boolean(anchorEl);
    const login = (isLogin || (!isFetching && userInfo._id)) ? (
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
          <MenuItem
            onClick={this.handleClose}
            component={({ ...props }) => <Link to="/editor" {...props} />}
          >發文
          </MenuItem>
          <MenuItem onClick={this.handleClose}>我的文章</MenuItem>
          <MenuItem onClick={this.handleLogout}>登出</MenuItem>
        </Menu>
        <Button
          variant="raised"
          color="primary"
          onClick={this.handleMenu}
        > {`Hi, ${userInfo.username}`}
        </Button>
      </div>
    ) :
      (
        <div>
          <Button
            variant="raised"
            color="primary"
            component={({ ...props }) => <Link to="/login" {...props} />}
          >登入
          </Button>
          <Button
            variant="raised"
            color="primary"
            component={({ ...props }) => <Link to="/register" {...props} />}
          >註冊
          </Button>
        </div>
      );
    if (snackBarOpen) {
      setTimeout(() => this.setState({ snackBarOpen: false }), 1500);
    }
    return (
      <div className={classes.root}>
        <AppBar position="fixed" color="primary" elevation={0} className={classes.bar}>
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
              component={({ ...props }) => <Link to="/" {...props} />}
              onClick={getArticleList}
            >ㄅㄌㄍ
            </Typography>
            <Button
              variant="raised"
              color="primary"
              component={({ ...props }) => <Link to="/articleList" {...props} />}
              onClick={getArticleList}
            >文章列表
            </Button>
            {login}
          </Toolbar>
        </AppBar>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={snackBarOpen && reqMsg.content.length > 0 && !isFetching}
          onClose={this.handleSnackBarClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{reqMsg.content}</span>}
        />
      </div>
    );
  }
}

NavBar.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  userInfo: PropTypes.objectOf(String).isRequired,
  getArticleList: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(String).isRequired,
  userAuth: PropTypes.func.isRequired,
  userLogout: PropTypes.func.isRequired,
  reqMsg: PropTypes.shape({
    content: PropTypes.string.isRequired,
    isReqSuccess: PropTypes.bool.isRequired,
  }).isRequired,
};

export default withStyles(styles)(NavBar);
