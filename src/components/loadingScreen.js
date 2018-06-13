import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const style = theme => ({
  load: {
    textAlign: 'center',
    marginTop: '10%',
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

const LoadingScreen = ({ classes, type }) => (
  <div className={classes.load}>
    <CircularProgress className={classes.progress} size={100} />
    <h3>{type}</h3>
  </div>
);

LoadingScreen.propTypes = {
  classes: PropTypes.objectOf(String).isRequired,
  type: PropTypes.string.isRequired,
};

export default withStyles(style)(LoadingScreen);
