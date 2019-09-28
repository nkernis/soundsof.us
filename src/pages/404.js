import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  container: {
    marginBottom: 100
  },
  media: {
    height: '600px',
    [theme.breakpoints.down('xs')]: {
      width: '80vw',
      height: 'auto'
    }
  }
})

class FourZeroFour extends React.Component {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.container}>
        <img
          className={classes.media}
          src='https://s3.amazonaws.com/media.noahkernis.com/images/404.jpeg'
          alt='404.jepg'
        />
        <Typography variant="body1">
          [ 404 - Please try a differnt page ]
        </Typography>
      </div>
    );
  }
}


FourZeroFour.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FourZeroFour)
