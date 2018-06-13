import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router';
import Snackbar from '@material-ui/core/Snackbar';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ButtonProgress from '../../components/buttonProgress';
import './editor.css';

const styles = theme => ({
  content: {
    marginTop: '5%',
  },
  textField: {
    marginLeft: '2%',
    marginRight: '2%',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '95%',
    paddingBottom: '1%',
  },
  editor: {
    marginTop: '2%',
  },
});

class EditorToHTML extends Component {
  constructor() {
    super();
    this.state = {
      editorState: EditorState.createEmpty(),
      snackBarOpen: false,
      redirectToLogin: false,
      redirectToArticle: false,
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSendOut = this.handleSendOut.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  onEditorStateChange(editorState) {
    this.setState({ editorState });
    const contentState = editorState.getCurrentContent();
    this.props.updateContent(JSON.stringify(convertToRaw(contentState)));

    const plainText = contentState.getPlainText();
    const len = plainText.length;
    if (len < 20 && len > 0) this.props.updatePartialContent(`${plainText}...`);
    // console.log(htmlToDraft(draftToHtml(convertToRaw(editorState.getCurrentContent()))));
  }
  handleTitleChange(e) {
    this.props.updateTitle(e.target.value);
  }
  handleSendOut() {
    this.props.postArticle();
    this.setState({ snackBarOpen: true });
  }
  handleClose() {
    this.setState({ snackBarOpen: false });
  }
  render() {
    document.title = '發表文章';
    const { articleDetail } = this.props;
    const {
      handleTitleChange, handleSendOut, handleClose,
    } = this;
    const {
      editorState, snackBarOpen, redirectToLogin,
      redirectToArticle,
    } = this.state;
    const {
      isLogin, isFetching, classes,
      reqMsg,
    } = this.props;
    if (redirectToLogin) return (<Redirect to="/login" />);
    if (redirectToArticle) return (<Redirect to={`/article/${articleDetail._id}`} />);
    if (reqMsg.content === '發文成功') {
      setTimeout(() => this.setState({ snackBarOpen: false }), 1500);
      setInterval(() => this.setState({ redirectToArticle: true }), 2000);
    }
    if (!isLogin && !reqMsg.isReqSuccess) {
      setTimeout(() => this.setState({ snackBarOpen: false }), 1500);
      setTimeout(() => this.setState({ redirectToLogin: true }), 2000);
    }
    return (
      <div>
        <Typography variant="headline" component="h2">
          發表文章
        </Typography>
        <div className={classes.content}>
          <Paper elevation={1}>
            <div className={classes.container}>
              <TextField
                label="輸入標題"
                margin="normal"
                className={classes.TextField}
                fullWidth
                onChange={e => handleTitleChange(e)}
              />
            </div>
            <div className={classes.editor}>
              <Editor
                editorState={editorState}
                wrapperClassName="rdw-editor-wrapper"
                editorClassName="demo-editor rdw-editor-main"
                onEditorStateChange={this.onEditorStateChange}
              />
            </div>
          </Paper>
          <ButtonProgress handleClick={handleSendOut} isFetching={isFetching} type="發文" />
        </div>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={snackBarOpen && !isFetching}
          onClose={handleClose}
          ContentProps={{ 'aria-describedby': 'message-id' }}
          message={<span id="message-id">{reqMsg.content}</span>}
        />
      </div>
    );
  }
}

EditorToHTML.propTypes = {
  updateTitle: PropTypes.func.isRequired,
  updateContent: PropTypes.func.isRequired,
  updatePartialContent: PropTypes.func.isRequired,
  postArticle: PropTypes.func.isRequired,
  isLogin: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  articleDetail: PropTypes.objectOf(String).isRequired,
  classes: PropTypes.objectOf(String).isRequired,
  reqMsg: PropTypes.shape({
    content: PropTypes.string.isRequired,
    isReqSuccess: PropTypes.bool.isRequired,
  }).isRequired,
};

export default withStyles(styles)(EditorToHTML);
