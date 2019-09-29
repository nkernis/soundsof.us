import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import P5Wrapper from './P5Wrapper';
import Sketch from './sketch'

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

class Recorder extends React.Component {
	state = {
		baseURL: "http://localhost:3001/api/v1/sounds/new"
	}

	render() {
		const { recording, stream } = this.state
		const { classes} = this.props
		
		return (
			<React.Fragment>
				<div className={classes.layout}>
					<Typography variant="h6" className={classes.headers}>
						Recorder
					</Typography>
					<P5Wrapper sketch={(p5) => Sketch(p5, "carl")} carl="carl"/>
				</div>
			</React.Fragment>
		)
	}
}

Recorder.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Recorder)
