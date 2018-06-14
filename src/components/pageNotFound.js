import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  body: {
    margin: '20%',
  },
};

const PageNotFound = ({ classes }) => (
  <h1 className={classes.body}>I FUCK UP</h1>
);

PageNotFound.propTypes = {
  classes: PropTypes.objectOf(String).isRequired,
};

export default withStyles(styles)(PageNotFound);
