import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Line, Circle } from 'rc-progress';
import Sound from 'react-sound';

//ms
const progressFerquency = 200

class PlayerControl extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playing: false,
      trackTime: 0
    }

    this.togglePlay = this.togglePlay.bind(this)
  }

  componentDidMount() {
    this.togglePlay()
  }

  componentWillUnmount() {
    
  }

  stopTrackTimer() {
    clearInterval(this.timerId);
  }

  tick() {
    this.setState((prevState, props) => {
      const currentTime = prevState.trackTime + progressFerquency / 1000
      const progressPercent = (currentTime / props.trackLength) * 100

      // console.log(progressPercent)

      return {
        trackTime: currentTime,
        progressPercent
      }
    })
  }

  togglePlay() {
    this.setState(prevState => ({
      playing: !prevState.playing
    }))

    if (this.timerId) {
      clearInterval(this.timerId)
      return this.timerId = 0
    }

    this.timerId = setInterval(
      () => this.tick(),
      progressFerquency
    );
  }

  render() {
    const { track, currentTime, duration } = this.props;

    return (

      <div>
        <div className="firstLine">
          <div className="playButton button floating">
            <i className={`fa fa-${this.state.playing ? 'pause' : 'play'} button flex-none`} onClick={this.togglePlay}></i>
          </div>
          <div className="likeButton button floating">
            <i className="fa fa-heart button flex-none"></i>
          </div>
          <div className="floating trackTitle">
            <span>{this.props.trackName}</span>
          </div>
        </div>

        <div className="secondLine">
          
            <span className="context">{this.props.country}</span>
          
          
            <div className="flex-auto progress">
            <Sound url={this.props.trackUrl} playStatus={this.state.playing ? 'PLAYING' : 'PAUSED'} />
            <Line percent={this.state.progressPercent} strokeWidth="3" trailWidth="1"  strokeColor="orange" />
            </div>
            <span className="context">{this.props.year}</span>


          
        </div>
      </div>

    );
  }
}

export default PlayerControl