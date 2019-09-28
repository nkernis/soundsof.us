import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppRoutes from './routes.js'
import NavBar from './components/navbar.js'
import Footer from './components/footer.js'
import withRoot from './components/withRoot'

const styles = theme => ({
  root: {
    minHeight: '100vh',
    overflow: 'hidden',
    display: 'block',
    position: 'relative',
    marginLeft: theme.spacing.unit * 1.2,
    marginRight: theme.spacing.unit * 1.2
  }
})

class App extends React.Component {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <NavBar />
        <AppRoutes />
        <Footer />
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(App))
