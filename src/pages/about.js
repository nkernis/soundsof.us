import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
	container: {
		textAlign: "center !important"
	},
	content: {
		textAlign: "left",
		display: "inline-block",
		width: "80vw"
	}
})

class About extends React.Component {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.container}>
		<Typography variant="h2" style={{marginBottom: 25}}>
          ABOUT
        </Typography>

		<div className={classes.content}>
			<p>
				"Sounds of Us” is a platform where you document any sound you want to. The purpose is to
				let this community share their feelings and thoughts so as to get a better understanding
				for each one of you.
			</p>

			<p>
				You can record any sounds you want in the main page. If you don’t have any idea yet, click sounds that have been recorded to gain some inspiration. Or find one question you’d like to share below.
			</p>

			<ul>
				<li>Who are you? Vs.What are you?</li>
				<li>How does a moment of your life sound like?</li>
				<li>What is your favorite food and why?</li>
				<li>What is your favorite book or story and why?</li>
				<li>What kind of music do you listen to? Share it with us(you can play it online and it can be recorded)!</li>
				<li>What is your favorite activity?</li>
				<li>What do you do when you’ re feeling down or sad?</li>
				<li>What makes you happy?</li>
				<li>What advice would you give to future ITPers?</li>
				<li>Is there any person in ITP you want to thank?</li>
				<li>Before I die, I’ d like to...</li>
			</ul>
		</div>
      </div>
    );
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(About)
