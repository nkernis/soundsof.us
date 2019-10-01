import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ReactTimeout from 'react-timeout'
import { useTimer } from "use-timer"
import { ReactMic } from 'react-mic'
import "p5/lib/addons/p5.sound.min"
import p5 from "p5"
import P5Wrapper from "./P5Wrapper"
import _audio from "./_audio"

const styles = (theme) => ({
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
		border: "1px solid black",
		padding: "5px",
		margin: "10px 2px 10px 2px",
		fontWeight: "bold",
		verticalAlign: "top",
		'&:hover': {
			background: "black",
			color: "white"
		}
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
	},
	'@keyframes blinker': {
        from: {background: "red"},
        to: {background: "white",}
	},
	blinking: {
		borderRadius: "18px",
		width: "80px",
		height: "45px",
		background: "white",
		border: "1px solid black",
		padding: "5px",
		margin: "10px 2px 10px 2px",
		verticalAlign: "top",
		animationName: '$blinker',
		animationDuration: '1s',
		animationIterationCount: 'infinite',
	}
})

const mic = new p5.AudioIn()
const soundRec = new p5.SoundRecorder()

mic.start()
soundRec.setInput(mic)

const Timer = (props) => {
	const { classes, recButtonAction, playAction, saveAction, isRecording } = props
	const { time, start, pause, reset } = useTimer({endTime: 60})

	return (
		<React.Fragment>
			<button className={isRecording ? classes.blinking : classes.recButtons} onClick={() => recButtonAction(reset, start, pause)}>
				{ isRecording ? "STOP RECORDING": "RECORD SOUND" }
			</button>
			<button className={classes.recButtons} onClick={playAction}>PLAY SOUND</button>
			<button className={classes.recButtons} onClick={saveAction}>SAVE SOUND</button>
			<p>Recorder Time: <b>{time} seconds</b> [Max: 25 seconds]</p>
		</React.Fragment>
	)
}

class Recorder extends React.Component {
	state = {
		// baseURL: "http://localhost:3001/api/v1/sounds/new",
		baseURL: "https://api.soundsof.us/.netlify/functions/server/api/v1/sounds/new",
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
					<Timer 
						classes={classes} 
						recButtonAction={this.recButtonAction} 
						playAction={this.playBack} 
						saveAction={this.save} 
						isRecording={this.state.recording}
					/>
					<input
						ref="input"
						maxLength = "40"
						placeholder='Name [Max: 40 char]'
						value={this.state.soundName}
						onChange={(e)=>{this.setState({soundName:e.target.value});}}
						onFocus={()=>{this.refs.input.select()}}
					/>
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

	recButtonAction = (resetTimer, startTimer, pauseTimer) => {
		const { recording } = this.state

		if (!recording) {
			this.startRec(resetTimer, startTimer)
		} else {
			this.stopRec(pauseTimer)
		}

	}


	startRec = (resetTimer, startTimer) => {		
		let soundFile = new p5.SoundFile()
		soundRec.record(soundFile)
		
		resetTimer()
		startTimer()

		this.props.setTimeout(this.stopRec, 25000)

		this.setState({
			recording: true,
			soundFile: soundFile
		})
	}

	stopRec = (pauseTimer) => {
		if (this.state.recording) {
			soundRec.stop()
			
			this.props.clearTimeout()

			pauseTimer()

			this.setState({
				recording: false,
				recButtonText: "START REC"
			})
		}
	}

	playBack = () => {
		if (this.state.soundFile) {
			this.state.soundFile.play()
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

				fetch(this.state.baseURL, fetchOptions)
					.then(res => {
						console.log(res.status)
						window.location.reload()
					})
			} else {
				alert("Sound must have a name.\n\n\"Because it is my name! Because I cannot have another in my life!\"")
			}
		} else {
			alert("I - the website - can't save the audio.\n\nTry recording first - just a thought...")
		}
	}

	render() {
		const { recording } = this.state
		const { classes } = this.props

		return (
			<React.Fragment>
				<div className={classes.layout}>
					{this.showRecorder(classes, recording)}
				</div>

				{ recording ? <P5Wrapper sketch={(carl) => _audio(carl, "haha")}/> : ""}
			</React.Fragment>
		)
	}
}

Recorder.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ReactTimeout(Recorder))
