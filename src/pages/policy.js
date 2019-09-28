import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Description from '../components/description.js';
import AsyncComponent from '../components/asyncComponent.js'

const styles = theme => ({
  container:{
    marginBottom: 100
  },
  headers: {
    marginTop: theme.spacing.unit * 1.2,
    marginBottom: theme.spacing.unit * 2
  }
})

const description = `These are my illustrations. They were made with paper and marker or brush pen. I have released them under then name GENERIC ERROR.

The portraits are drawn and then the words are added after. The text is my response to the emotion I perceive in the person/creature I have drawn. The portraits mainly focus on the inner life of their subjects, despite having no real access to this information. As humans, we do this daily with the people we interact with.

The miscellaneous section contains selected illustrations.`

class Draw extends React.Component {
  state = {
    baseURL: 'https://s3.amazonaws.com/media.noahkernis.com/draw/',
    portraits: [
      'a_person_2018',
      'evil_2018',
      'i_made_the_cape_too_big_2018',
      'inside_out_2018',
      'its_hard_to_say_2018',
      'none_of_this_makes_sense_2018',
      'pair_is_a_story_2018',
      'this_wont_end_well_2018',
      'thought_and_emotion_2018',
      'what_was_that_2018',
      'when_confidence_wanes_2018',
      'when_do_we_get_to_dance_2018',
      'where_can_I_2018',
      'protector_of_what_2018',
      'keeping_it_cool_2018',
      'there_never_was_a_reality_2018',
      'i_like_your_chair_2018',
      'ready_2018',
      'im_here_2018',
      'i_just_had_it_2018',
      'what_day_is_it_2018'
    ],
    misc: [
      'still_counts_2018',
      'bleed_love_2018',
      'finally_got_that_itch_2018',
      'i_exist_2018',
      'still_got_it_2018',
      'remember_2018',
      'all_or_none_2018',
      'another_day_2018',
      'a_person_cant_ever_be_broken_2018',
      'singular_power_will_kill_us_all_2018',
      'people_are_animals_2018'
    ]
  }

  returnPortraits = () => {
    const { baseURL, portraits } = this.state

    return portraits.map((imageName, i) => {
      return (
        <AsyncComponent
          key={i}
          baseURL={baseURL}
          imageName={imageName + '.jpeg'}
          index={i}
        />
      )
    })
  }

  returnMisc = () => {
    const { baseURL, misc } = this.state

    return misc.map((imageName, i) => {
      return (
        <Grid key={i} item>
          <AsyncComponent
            key={i}
            baseURL={baseURL}
            imageName={imageName + '.jpeg'}
            index={i}
          />
        </Grid>
      )
    })
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.container}>
        <Description body={description}/>
        <Typography variant='h6' className={classes.headers}>
          Portraits
        </Typography>
        <Grid
          container
          spacing={16}
          alignItems='center'
          justify='center'
        >
          { this.returnPortraits() }
        </Grid>

        <Typography variant='h6' className={classes.headers}>
          Miscellaneous
        </Typography>
        <Grid
          container
          spacing={16}
          alignItems='center'
          justify='center'
        >
          { this.returnMisc() }
        </Grid>
      </div>
    );
  }
}

Draw.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Draw)
