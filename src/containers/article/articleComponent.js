import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router';
import LoadingScreen from '../../components/loadingScreen';
import ButtonProgress from '../../components/buttonProgress';
import Alert from '../../components/alert';

const styles = {
  card: {
    Width: '100%',
    textAlign: 'left',
    borderStyle: 'none',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pos: {
    marginTop: 0,
  },
  content: {
    marginTop: 0,
  },
  sub: {
    paddingTop: 0,
  },
  title: {
    fontSize: '3em',
  },
  noToolBar: {
    display: 'none !important',
  },
};

class Article extends Component {
  constructor() {
    super();
    this.state = { alertOpen: false };
    this.delArticle = this.delArticle.bind(this);
  }
  componentDidMount() {
    const { id, getArticle } = this.props;
    getArticle(id);
  }
  delArticle() {
    this.setState({ alertOpen: true });
  }
  render() {
    const {
      isFetching, classes, reqMsg,
      username,
    } = this.props;
    const {
      author, title, content,
      time,
    } = this.props.articleDetail;
    if (reqMsg.content === '刪除成功!') return (<Redirect to="/" />);
    if (reqMsg.content === '登入逾期，請重新登入') return (<Redirect to="/login" />);
    if (reqMsg.content === '載入文章失敗'
      || reqMsg.content === '文章不存在'
      || reqMsg.content === '網路異常，請稍候重試'
    ) return (<Redirect to="/404" />);
    const editorState = content ?
      EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
      : EditorState.createEmpty();
    const authorFunction = author === username ? (
      <Grid container spacing={24} direction="row" className={classes.author}>
        <ButtonProgress
          type="編輯"
          isFetching={isFetching}
          className={classes.content}
          handleClick={() => alert('尚未開放')}
        />
        <ButtonProgress
          type="刪除"
          isFetching={isFetching}
          className={classes.content}
          handleClick={this.delArticle}
        />
      </Grid>) : null;
    if (isFetching) {
      document.title = '載入中...';
      return (<LoadingScreen type="文章載入中" />);
    }
    document.title = title;
    return (
      <div>
        <Card className={classes.card} elevation={0}>
          <CardHeader title={title} classes={{ title: classes.title }} />
          <CardHeader
            avatar={<Avatar aria-label="Recipe">{author ? author[0] : null}</Avatar>}
            title={author}
            subheader={`發表日期： ${time}`}
            className={classes.sub}
          />
          <CardContent className={classes.content}>
            {authorFunction}
            <Editor
              editorState={editorState}
              toolbarClassName={classes.noToolBar}
              readOnly
            />
          </CardContent>
        </Card>
        <Alert
          id={this.props.id}
          open={this.state.alertOpen}
          delArticle={this.props.delArticle}
        />
      </div>
    );
  }
}

Article.propTypes = {
  articleDetail: PropTypes.objectOf(String).isRequired,
  getArticle: PropTypes.func.isRequired,
  delArticle: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  classes: PropTypes.objectOf(String).isRequired,
  reqMsg: PropTypes.shape({
    content: PropTypes.string.isRequired,
    isReqSuccess: PropTypes.bool.isRequired,
  }).isRequired,
};

export default withStyles(styles)(Article);
