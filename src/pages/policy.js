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

class Policy extends React.Component {
render() {
    const { classes } = this.props

    return (
      <div className={classes.container}>
		<Typography variant="h2" style={{marginBottom: 25}}>
        	POLICY
        </Typography>
		{/* <div className={classes.content}>
			<Typography variant="h5" style={{marginBottom: 25}}>
				HEADER
			</Typography>
			<p>
			</p>
		</div> */}
      </div>
    );
  }
}

Policy.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Policy)
