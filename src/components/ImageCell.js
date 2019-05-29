import React, { Component } from 'react'
// import bombAudio from './component/001_dropped_bomb.mp3'
import bomb from './mark-bomb.jpg'

class ImageCell extends Component {
  render() {
    let returnValue = <>{this.props.character}</>
    if (this.props.character === '*') {
      returnValue = (
        <>
          {/* <audio
            ref="audio_tag"
            src="./component/001_dropped_bomb.mp3"
            controls
            autoPlay
          /> */}
        </>
      )
    } else if (this.props.character === 'F') {
      returnValue = (
        <>
          {/* <span>
            <img src="flag.png" alt="Smiley face" height="42" width="42" />
          </span> */}
        </>
      )
    } else if (this.props.character === '@') {
      returnValue = (
        <>
          <span>:skull_and_crossbones:</span>
        </>
      )
    }
    return returnValue
  }
}

export default ImageCell
