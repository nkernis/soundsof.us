import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Description from '../components/description.js';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Recorder from '../components/recorder.js';
import AudioPlayer from "react-h5-audio-player";

const styles = theme => ({
	container: {
		padding: theme.spacing.unit * 1.2,
	},
	audio: {
		width: "600",
		height: "166",
		borderRadius: "25px",
	}
})

const description = "WORDS"

class ItpVideo extends React.Component {

	state = {
		baseURL: "https://s3.amazonaws.com/media.noahkernis.com/audio/",
		sounds: [
			"in_my_mind_addiction.mp3",
			"in_my_mind_addiction.mp3"
		]
	}

	// componentWillMount() {
	// 	fetch("http://localhost:3000/api/v1/books")
	// 		.then(res => res.json())
	// 		.then(sounds => this.setState({
	// 			sounds: sounds
	// 		}))
	// }

	returnPortraits = (classes) => {
		const { baseURL, sounds } = this.state

		return sounds.map((soundName, i) => {
			return (
				<div className={classes.container} >
					<Description title='In My Mind: Addiction' body={description} />
					{/* <audio controls className={classes.audio} key={i}>
						<source src={baseURL + soundName} type="audio/mpeg" />
						Your browser does not support the audio tag. <br />
						The audio is available here: https://s3.amazonaws.com/media.noahkernis.com/audio/in_my_mind_addiction.mp3
					</audio> */}
					<AudioPlayer src={baseURL + soundName } />
				</div>
			)
		})
	}

	render() {
		const { classes } = this.props

		return ( 
		<React.Fragment >
			<Recorder/>
			<div className={classes.container}>
				<Typography variant='h6' className={classes.headers}>
					BELOW HERE ARE SOUNDS
				</Typography>
				<Grid
					container
					spacing={16}
					alignItems='center'
					justify='center'
				>
					{ this.returnPortraits(classes) }
				</Grid>
			</div>	
		</React.Fragment>
		)
	}
}

ItpVideo.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ItpVideo)
