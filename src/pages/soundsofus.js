import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Recorder from '../components/recorder.js';
import AudioPlayer from "react-h5-audio-player";

const styles = theme => ({
	container: {
		padding: theme.spacing(2.0),
		textAlign: "center"
	},
	card: {
		padding: theme.spacing(2.0),
		textAlign: "center",
		minWidth: 275,
		maxWidth: 275,
		boxShadow: "none"
	},
	sectionTitle: {
		padding: theme.spacing(5.0),
		paddingBottom: theme.spacing(8.0),
		fontSize: "3.5vw",
	},
	cardTitle: {
		fontSize: 15,
		paddingBottom: 10
	}
})

class SoundsOfUs extends React.Component {
	state = {
		baseURL: "https://s3.amazonaws.com/media.soundsof.us/",
		// baseFetchURL: "http://localhost:3001/.netlify/functions/server/api/v1/sounds",
		baseFetchURL: "https://api.soundsof.us/.netlify/functions/server/api/v1/sounds",
		sounds: []
	}
	
	componentDidMount() {
		this.getSounds()
	}

	getSounds = () =>  {
		fetch(this.state.baseFetchURL)
			.then(res => res.json())
			.then(data => {
				let sounds = data.Contents
				sounds.shift()
				sounds.reverse()
				this.setState({
					sounds: sounds
				})
			})
			.catch(err => {
				console.log(err)
			})
	}

	returnSoundCard = (classes) => {
		const { baseURL, sounds } = this.state

		return sounds.map((sound, i) => {
			let uri = baseURL + encodeURIComponent(sound.Key)

			return (
				<Card className={classes.card} key={i}>
					<CardContent>
						<Typography variant="h6" className={classes.cardTitle}>
							{ sound.Key.replace(/audio\/[^]*\+--\+/g, '').replace(/.wav/g, '') }
						</Typography>
						<img 
							src={"https://loremflickr.com/200/200/home,earth?random=" + i} 
							alt="Random - earth or home from loremflickr.com. Have been manipulated by filters to create odd effects."
							style={{paddingBottom: 10}}
						/>
						<AudioPlayer src={uri} />
					</CardContent>
				</Card>
			)
		})
	}

	render() {
		const { classes } = this.props

		return ( 
		<React.Fragment >
			<Recorder />
			<div className={classes.container}>
				<Typography variant='h2' className={classes.sectionTitle}>
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
