import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';

const styles = {
  card: {
    Width: '100%',
    textAlign: 'left',
    marginTop: '3%',
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
    paddingTop: 0,
  },
};

const ArticleListItem = ({
  title, author, time,
  partialContent, _id, classes,
}) => (
  <Card className={classes.card} rounded>
    <CardHeader
      avatar={<Avatar aria-label="Recipe">{author[0]}</Avatar>}
      title={author}
      subheader={`發表日期： ${time}`}
    />
    <CardContent className={classes.content}>
      <Typography variant="headline">{title}</Typography>
      <Typography component="p" className={classes.pos}>
        {partialContent}
      </Typography>
    </CardContent>
    <CardActions>
      <Button
        size="small"
        component={Link}
        to={`/article/${_id}`}
      >閱讀全文
      </Button>
    </CardActions>
  </Card>
);

ArticleListItem.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  partialContent: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(String).isRequired,
};

export default withStyles(styles)(ArticleListItem);
