import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppRoutes from './routes.js'
import NavBar from './components/navbar.js'
import withRoot from './components/withRoot'

const styles = theme => ({
  root: {
    minHeight: '100vh',
    overflow: 'hidden',
    display: 'block',
    position: 'relative',
    margin: "10px 10px 0px 10px",
  }
})

class App extends React.Component {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <NavBar />
        <AppRoutes />
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(App))
