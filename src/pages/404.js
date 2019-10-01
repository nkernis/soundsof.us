import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { textAlign } from '@material-ui/system';

const styles = theme => ({
  container: {
	textAlign: "center"
  }
})

class FourZeroFour extends React.Component {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.container}>
        <Typography variant="h2">
          [ 404 - THIS IS NOT A PAGE ]
        </Typography>
      </div>
    );
  }
}


FourZeroFour.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FourZeroFour)
