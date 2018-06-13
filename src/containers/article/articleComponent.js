import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { Redirect } from 'react-router';
import LoadingScreen from '../../components/loadingScreen';

const styles = {
  card: {
    Width: '100%',
    textAlign: 'left',
    marginTop: '3%',
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

  },
  sub: {
    paddingTop: 0,
  },
  title: {
    fontSize: '3em',
  },
};

class Article extends Component {
  componentDidMount() {
    const { id, getArticle } = this.props;
    getArticle(id);
  }
  render() {
    const { isFetching, classes, reqMsg } = this.props;
    const {
      author, title, content,
      time,
    } = this.props.articleDetail;
    const editorState = content ?
      EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
      : EditorState.createEmpty();
    document.title = title;
    if (isFetching) return (<LoadingScreen type="文章載入中" />);
    if (reqMsg.content === '載入文章失敗' || reqMsg.content === '文章不存在') return (<Redirect to="/404" />);
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
            <Typography component="p" className={classes.pos}>
              <Editor editorState={editorState} readOnly />
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

Article.propTypes = {
  articleDetail: PropTypes.objectOf(String).isRequired,
  getArticle: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  classes: PropTypes.objectOf(String).isRequired,
  reqMsg: PropTypes.shape({
    content: PropTypes.string.isRequired,
    isReqSuccess: PropTypes.bool.isRequired,
  }).isRequired,
};

export default withStyles(styles)(Article);
