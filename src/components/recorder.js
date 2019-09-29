import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import "p5/lib/addons/p5.sound.min"
import p5 from "p5"

const mic = new p5.AudioIn()
mic.start()

const soundRec = new p5.SoundRecorder()
soundRec.setInput(mic)

const soundFile = new p5.SoundFile()

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
	start = () => {
		soundRec.record(soundFile)

	}

	stop = () => {
		soundRec.stop()
		let soundBlob = soundFile.getBlob()
		console.log(soundBlob)

		let formData = new FormData()

		formData.append('soundBlob', soundBlob)

		let fetchOptions = {
			method: 'POST',
			body: formData,
			headers: new Headers({
				'enctype': 'multipart/form-data'
			})
		}

		fetch("http://localhost:3001/api/v1/sounds/new", fetchOptions)
			.then(res => {
				console.log(res.status)
			})
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
					<button onClick={this.start}>start</button>
					<button onClick={this.stop}>stop</button>
				</div>
			</React.Fragment>
		)
	}
}

Recorder.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Recorder)
