import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { ReactMic } from 'react-mic'
import "p5/lib/addons/p5.sound.min"
import p5 from "p5"

const styles = theme => ({
	layout: {
		marginBottom: "5px",
		whiteSpace: 'pre-wrap',
		textAlign: "center"
	},
	micViz: {
		borderRadius: "18px",
		width: "25vw",
		height: "100px",
		maxWidth: "360px",
		minWidth: "300px"
	},
	recButtons: {
		borderRadius: "18px",
		width: "80px",
		height: "45px",
		background: "white",
		borderColor: "black",
		padding: "5px",
		margin: "10px 2px 10px 2px",
		verticalAlign: "top"
	},
	showRec: {
		display: "inline-block",
		lineHeight: "100px",
		borderRadius: "18px",
		background: "#5ffdff",
		color: "#000",
		width: "25vw",
		height: "100px",
		maxWidth: "360px",
		minWidth: "300px",
		fontSize: "20px"
	}
})

const mic = new p5.AudioIn()
mic.start()

const soundRec = new p5.SoundRecorder()
soundRec.setInput(mic)

const soundFile = new p5.SoundFile()

class Recorder extends React.Component {
	state = {
		baseURL: "http://localhost:3001/api/v1/sounds/new",
		showRecorder: false,
		recording: false,
		soundFile: false,
		soundName: ""
	}

	showRecorder = (classes, recording) => {
		if (this.state.showRecorder) {
			return (
				<React.Fragment>
					< ReactMic
						record={recording}
						className={classes.micViz}
						strokeColor={"#ffffff"}
						backgroundColor={"#ff76ff"}
					/>
					<br/>
					<button className={classes.recButtons} onClick={this.startRec}>START REC</button>
					<button className={classes.recButtons} onClick={this.stopRec}>STOP REC</button>
					<button className={classes.recButtons} onClick={this.playBack}>PLAY SOUND</button>
					<button className={classes.recButtons} onClick={this.save}>SAVE SOUND</button>
					<br/>
					<input
						ref="input"
						placeholder='NAME FOR SOUND'
						value={this.state.soundName}
						onChange={(e)=>{this.setState({soundName:e.target.value});}}
						onFocus={()=>{this.refs.input.select()}}
					/>
					<p>length: {soundFile.duration()}</p>
				</React.Fragment>
			)
		} else {
			return (
				<div className={classes.showRec} onClick={() => {this.setState({showRecorder:true})}}>
					Record A Sound...						
				</div>
			)
		}
	}

	startRec = () => {
		soundRec.record(soundFile)
		
		this.setState({
			recording: true
		})
	}

	stopRec = () => {
		soundRec.stop()

		this.setState({
			recording: false,
			soundFile: soundFile
		})
	}

	playBack = () => {
		if (this.state.soundFile) {
			soundFile.play()
			console.log(soundFile.isPlaying())
			console.log(soundFile.currentTime())
		} else {
			alert("I - the website - can't play back the audio.\n\nYou have not recorded any sound yet fool!")
		}
		
	}

	save = () => {
		if (this.state.soundFile) {
			let soundBlob = this.state.soundFile.getBlob()
			let formData = new FormData()

			if (this.state.soundName) {
				formData.append('soundBlob', soundBlob, this.state.soundName)

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
			} else {
				alert("Sound must have a name.\n\n\"Because it is my name! Because I cannot have another in my life!\"")
			}
		} else {
			alert("I - the website - can't save the audio.\n\nTry recording first - just a thought...")
		}
	}

	render() {
		const { recording, soundFile } = this.state
		const { classes } = this.props

		return (
			<React.Fragment>
				<div className={classes.layout}>
					{this.showRecorder(classes, recording)}
				</div>

			</React.Fragment>
		)
	}
}

Recorder.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Recorder)
