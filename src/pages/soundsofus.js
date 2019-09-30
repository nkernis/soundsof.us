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
		baseURL: "https://s3.amazonaws.com/media.soundsof.us/",
		sounds: []
	}
	
	componentDidMount() {
		fetch("http://localhost:3001/api/v1/sounds")
			.then(res => res.json())
			.then(data => {
				let sounds = data.Contents
				sounds.shift()
				sounds.reverse()
				
				this.setState({
					sounds: sounds
				})
			})
	}

	returnSoundCard = (classes) => {
		const { baseURL, sounds } = this.state

		return sounds.map((sound, i) => {
			let uri = baseURL + encodeURIComponent(sound.Key)

			return (
				<div className={classes.container} key={i} >
					<Description title={sound.Key}/>
					<img src={"https://loremflickr.com/200/200/home,earth?random=" + i} alt="Random - earth or home from loremflickr.com. Have been manipulated by filters to create odd effects."/>
					<AudioPlayer src={uri} />
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
					{ this.returnSoundCard(classes) }
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
