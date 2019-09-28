import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Parser from 'html-react-parser'

const styles = theme => ({
  layout: {
    marginBottom: theme.spacing.unit * 2.5,
    whiteSpace: 'pre-wrap'
  },
  headers: {
    marginTop: theme.spacing.unit * 1.2,
    marginBottom: theme.spacing.unit * 2
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
          <Typography variant="body1" className={classes.headers}>
            { Parser(body ? body : '') }
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
