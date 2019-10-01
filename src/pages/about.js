import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  container:{
    marginBottom: 100
  }
})

class About extends React.Component {
//   state = {}

  render() {
    const { classes } = this.props

    return (
      <div className={classes.container}>
		  THIS SHOULD WORK - ABOUT
      </div>
    );
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(About)
