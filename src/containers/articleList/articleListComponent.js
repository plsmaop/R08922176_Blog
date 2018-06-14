import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ArticleListItem from '../../components/articleListItem';
import LoadingScreen from '../../components/loadingScreen';

const styles = {
  content: {
    marginTop: '5%',
    marginBottom: '1%',
  },
  header: {
    marginTop: '10%',
  },
};

class ArticleList extends Component {
  componentDidMount() {
    this.props.getArticleList();
  }
  render() {
    document.title = 'ㄅㄌㄍ';
    const { articleList, isFetching, classes } = this.props;
    if (isFetching) {
      document.title = '載入中...';
      return (<LoadingScreen type="文章列表載入中" />);
    }
    document.title = 'ㄅㄌㄍ';
    return (
      <div>
        <Typography variant="headline" component="h2">
          文章列表
        </Typography>
        <div className={classes.content}>
          {
            articleList.length > 0 ?
              articleList.map(article =>
                <ArticleListItem {...article} key={article._id} />)
            : null
          }
        </div>
      </div>
    );
  }
}

ArticleList.propTypes = {
  getArticleList: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  articleList: PropTypes.arrayOf(Object).isRequired,
  classes: PropTypes.objectOf(String).isRequired,
};

export default withStyles(styles)(ArticleList);
