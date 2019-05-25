import React, { Component } from 'react'
import { request } from 'http'

class App extends Component {
  state = {
    game: {
      board: []
    }
  }
  componentDidMount() {
    const difficulty = { number: 0 }
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(difficulty)
    }
    fetch('https://minesweeper-api.herokuapp.com/games', request).then(
      response => {
        // console.log(response.json())
        return response.json()

      }).then(game => {
        this.setState(
          board: game.board)}
        )
      })
  }
  render() {
    return (<div>{
    this.state.board.map
    
    
    }</div>)
  }
}

export default App
