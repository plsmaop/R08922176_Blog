import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = props => (<Slide direction="up" {...props} />);

class Alert extends React.Component {
  constructor() {
    super();
    this.state = { open: false };
    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.open) this.setState({ open: true });
  }
  handleClose() {
    this.setState({ open: false });
  }
  handleDelete() {
    this.setState({ open: false });
    this.props.delArticle(this.props.id);
  }
  render() {
    const { handleClose } = this;
    const { open } = this.state;
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">你確定要刪除文章嗎？</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
               按下刪除之後不能復原喔
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDelete} color="primary">
              OK，我要刪
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              我再想想
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Alert.propTypes = {
  open: PropTypes.bool.isRequired,
  delArticle: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default Alert;
