import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import NavBar from '../containers/navBar';
import Router from './router';

const styles = {
  root: {
    textAlign: 'center',
    flexGrow: 1,
    marginTop: '10%',
  },
};

const App = ({ classes }) => (
  <div>
    <NavBar />
    <div className={classes.root}>
      <Grid container spacing={0} direction="row" align="center" justify="center">
        <Grid item xs={24} sm={9}>
          <Router />
        </Grid>
      </Grid>
    </div>
  </div>
);

App.propTypes = {
  classes: PropTypes.objectOf(String).isRequired,
};

export default withStyles(styles)(App);
