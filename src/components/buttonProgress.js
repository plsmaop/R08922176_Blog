import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

const ButtonProgress = ({
  handleClick, isFetching, type,
  classes,
}) => (
  <div className={classes.wrapper}>
    <Button
      variant="raised"
      color="primary"
      className={classes.button}
      onClick={handleClick}
      disabled={isFetching}
    >
      {type}
    </Button>
    {isFetching && <CircularProgress size={24} className={classes.buttonProgress} />}
  </div>
);

ButtonProgress.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(String).isRequired,
};

export default withStyles(styles)(ButtonProgress);
