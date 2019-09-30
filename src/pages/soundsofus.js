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
		padding: theme.spacing(2.0),
		textAlign: "center"
	},
	description: {
		padding: theme.spacing(5.0)
	}
})

class SoundsOfUs extends React.Component {

	state = {
		baseURL: "https://s3.amazonaws.com/media.noahkernis.com/audio/",
		sounds: [
			// "in_my_mind_addiction.mp3",
			// "in_my_mind_addiction.mp3",
			// "in_my_mind_addiction.mp3",
			// "in_my_mind_addiction.mp3",
			// "in_my_mind_addiction.mp3",
			"in_my_mind_addiction.mp3",
			"in_my_mind_addiction.mp3",
			"in_my_mind_addiction.mp3",
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
				<div className={classes.container} key={i} >
					<Description title='In My Mind: Addiction'/>
					<img src={"https://loremflickr.com/200/200/home,earth?random=" + i} />
					<AudioPlayer src={baseURL + soundName} />
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
				<Typography variant='h3' className={classes.description}>
					SOUNDS FOR LISTENING
				</Typography>
				<Grid
					container
					spacing={10}
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

SoundsOfUs.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SoundsOfUs)
