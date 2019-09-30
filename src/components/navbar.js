import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  a: {
    color: 'inherit',
    textDecoration: 'none',
    marginRight: theme.spacing(2.0),
    '&:hover': {
		fontStyle: "italic"
    }
  },
  selected: {
    color: 'inherit',
    textDecoration: 'none',
    fontStyle: 'italic',
    marginRight: theme.spacing(2.0),
    marginBottom: theme.spacing(2.0)
  },
  navbar: {
	marginBottom: "40px"
  }
})

class NavBar extends React.Component {
  state = {
    pages: [
      'ABOUT',
      'POLICY'
    ]
  }

  returnNavbar = (path) => {
    const { pages } = this.state
    const { classes } = this.props

    return pages.map((pageName, i) => {
      let pageNameL =  pageName.toLowerCase()
      let selected = path === pageNameL

      return (
        <Grid key={i} item className={classes.navbar}>
          <Typography
            component="a"
            variant="h5"
            gutterBottom
            href={'/' + pageNameL}
            className={selected ? classes.selected : classes.a}
          >
            { pageName }
          </Typography>
        </Grid>
      )
    })
  }

  render() {
    const { classes } = this.props
    const path = window.location.pathname.substr(1)
    const isRoot = path === ''

    return (
		<div >
      <Grid container>
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Typography component="a" variant="h1" gutterBottom href="/" className={isRoot ? classes.selected : classes.a}>
             SOUNDS OF US
            </Typography>
          </Grid>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
          { this.returnNavbar(path) }
          </Grid>
        </Grid>
      </Grid>
	  </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar)
