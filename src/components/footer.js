import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  container: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0
  },
  text: {
    fontFamily: 'Helvetica',
    fontSize: '.7em'
  }
})

class Footer extends React.Component {
  render() {
    const {
      classes
    } = this.props

    return (
        <div className={classes.container}>
          < Typography variant="overline" className={classes.text}>
            All The Rights - All Of Time - All To Noah Kernis
          </Typography>
        </div>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer)
