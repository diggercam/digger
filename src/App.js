import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Thumbnail from './Thumbnail';
import NavButton from './NavButton';
import TrackInfo from './TrackInfo';
import PlayerControl from './PlayerControl';
import Sound from 'react-sound';
import stream from './xhr'
import { Line, Circle } from 'rc-progress';

const baseUrl = 'http://radiooooo.com/media/images/'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // url: 'http://ms1-eu.radiooooo.com/media-server/links/1513121356_536e126a-7119-481b-b309-437d792b0fb6.mp3'
      url: '',
      title: ''
    }

    var socket = window.io.connect('http://localhost:4000');

    socket.on('message', ({ song, context }) => {
      console.log('got message', { song, context })

      this.setState({
        url: song.mp3,
        title: `${song.artists} - ${song.title}`,
        cover: `${baseUrl}${song.picture}`,
        decade: context.decade,
        country: context.country,
        trackLength: song.length
      })
    });
  }


  // componentDidMount() {
  //   return stream()
  //     .then(result => { console.log(result.data.url); return result.data })
  //     .then(song => this.setState({
  //       url: song.mp3,
  //       title: `${song.artists} - ${song.title}`,
  //       cover: `${baseUrl}${song.picture}`
  //     }))

  //   // this.togglePlay()

  // }

  previousTrack() {

  }

  nextTrack() {

  }

  render() {
    return (
      <div className="App">

        <div className="homeButton">
          <i className="fa fa-star whiteButton"></i>
        </div>
        <div className="settingsButton">
          <i className="fa fa-bars whiteButton"></i>
        </div>

        <div className="controls">
        <NavButton action="previous" direction="left" />
        <Thumbnail coverUrl={this.state.cover} />
        <NavButton action="next" direction="right" />
        </div>

        <PlayerControl trackName={this.state.title} 
                       trackUrl={this.state.url}
                       trackLength={this.state.trackLength}
                       country={this.state.country}
                       year={this.state.decade}
        />

      </div>
    );
  }
}

export default App;
