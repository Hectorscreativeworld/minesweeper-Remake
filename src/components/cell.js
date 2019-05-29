import React, { Component } from 'react'

class cell extends Component {
  render() {
    let rv = <> {this.props.character}</>
    if (this.props.character === '*') {
      rv = (
        <>
          <span>
            <img src="flag.png" alt="Smiley face" height="42" width="42" />
          </span>
        </>
      )
    } else if (this.props.character === 'F') {
      rv = (
        <>
          <span>
            <img src="mark-bomb.jpg" alt="Smiley face" height="42" width="42" />
          </span>
        </>
      )
    }
    return rv
  }
}

export default cell
