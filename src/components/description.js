import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  layout: {
    marginBottom: theme.spacing(2.5),
    whiteSpace: 'pre-wrap'
  },
  headers: {
    marginTop: theme.spacing(1.2),
    marginBottom: theme.spacing(2.0)
  }
})

class Description extends React.Component {
  render() {
    const { classes, title, body } = this.props

    return (
      <React.Fragment>
        <div className={classes.layout}>
          <Typography variant="h6" className={classes.headers}>
            { title ? title : "Description" }
          </Typography>
        </div>
      </React.Fragment>
    );
  }
}

Description.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Description)
