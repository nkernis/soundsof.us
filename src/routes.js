import React from 'react'
import { Route, Switch } from 'react-router-dom'
import SoundsOfUs from './pages/soundsofus.js'
import About from './pages/about.js'
// import Policy from './pages/policy.js'
import FourZeroFour from './pages/404.js'

export default () => {
  const childProps = {}

  return (
    <Switch>
      <Route path="/" exact component={SoundsOfUs} props={childProps} />
      <Route path="/about" exact component={About} props={childProps} />
      {/* <Route path="/policy" exact component={Policy} props={childProps} /> */}
      <Route path="*" component={FourZeroFour} props={childProps} />
    </Switch>
  )
}
