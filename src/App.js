import React, { Component } from 'react'
// import cell from './components/cell'
import bomb from './components/2Bomb.png'
import ImageCell from './components/ImageCell'
/* Type conversion: String to Number, check out Unary Operator in this link https://www.w3schools.com/js/js_type_conversion.asp */

/* React Docs: Check out the first few pages (philosphy) https://reactjs.org/docs/getting-started.html */
class App extends Component {
  state = {
    board: [],
    status: '',
    idGame: '',
    difficulty: 0
  }
  componentDidMount() {
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ difficulty: this.state.difficulty })
    }

    fetch('https://minesweeper-api.herokuapp.com/games', request)
      .then(response => {
        return response.json()
      })
      .then(game => {
        console.log(game)
        this.setState({
          board: game.board,
          status: game.state,
          idGame: game.id
        })
        console.log(game)
      })
  }
  tdCellClick = (row, col) => {
    console.log('clicked', row, col)
    fetch(
      `https://minesweeper-api.herokuapp.com/games/${this.state.idGame}/check`,
      {
        method: 'POST',
        body: JSON.stringify({
          row: row,
          col: col
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(response => response.json())
      .then(newGameState => {
        this.setState({
          board: newGameState.board,
          status: newGameState.state,
          idGame: newGameState.id
        })
      })
  }

  checkFlag = (event, row, col) => {
    event.preventDefault()
    console.log('clicked', row, col)
    fetch(
      `https://minesweeper-api.herokuapp.com/games/${this.state.idGame}/flag`,
      {
        method: 'POST',
        body: JSON.stringify({
          row: row,
          col: col
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(response => response.json())
      .then(newGameState => {
        this.setState({
          board: newGameState.board,
          status: newGameState.state,
          idGame: newGameState.id
        })
      })
  }
  checkCell = cell => {
    let cellClass = 'tdBox'
    if (this.state.difficulty === 0) {
      cellClass += ' big'
    } else if (this.state.difficulty === 1) {
      cellClass += ' medium'
    } else {
      cellClass += ' small'
    }
    if (cell === '_') {
      cellClass += ' reveal'
      return 'tdBox reveal'
    } else if (cell === 'F') {
      cellClass += ' flag'
    } else if (cell === '*') {
      cellClass += ' bomb'
    } else if (cell === '@') {
      cellClass += ' cellFlagBomb'
    } else if (+cell >= 1 && +cell <= 8) {
      cellClass += ' number'
    }
    return cellClass
  }
  resetGame = () => {
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ difficulty: +this.state.difficulty })
    }

    fetch('https://minesweeper-api.herokuapp.com/games', request)
      .then(response => {
        return response.json()
      })
      .then(game => {
        console.log(game)
        this.setState({
          board: game.board,
          status: game.state,
          idGame: game.id
        })
        console.log(game)
      })
  }
  recordDifficulty = event => {
    console.log(event.target)
    this.setState(
      {
        difficulty: +event.target.value // unary + operator: '+event'
      },
      () => {
        const request = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            difficulty: +this.state.difficulty
          })
        }

        fetch('https://minesweeper-api.herokuapp.com/games', request)
          .then(response => {
            return response.json()
          })
          .then(game => {
            console.log(game)
            this.setState({
              board: game.board,
              status: game.state,
              idGame: game.id
            })
            console.log(game)
          })
      }
    )
  }
  render() {
    console.log('State: ', this.state)

    return (
      <main>
        <div className="MainNav">
          <h1 className="mainTitle"> Mine Swipe </h1>
          <section>
            <img
              src={bomb}
              alt="Bomb"
              // height="80px"
              // width="80px"
            />
          </section>
        </div>
        <button className="button" onClick={this.resetGame}>
          Reset
        </button>
        <label> Choose difficulty </label>
        <select onChange={this.recordDifficulty}>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
        {this.state.status === 'lost' ? (
          <div>
            <h1> You lose </h1>
          </div>
        ) : null}
        {this.state.status === 'won' ? (
          <div>
            <h1> You win! </h1>
          </div>
        ) : null}
        <table>
          <tbody>
            {this.state.board.map((row, i) => (
              <tr key={i}>
                {row.map((column, a) => (
                  <td
                    key={a}
                    className={this.checkCell(this.state.board[i][a])}
                    onClick={() => this.tdCellClick(i, a)}
                    onContextMenu={event => this.checkFlag(event, i, a)}
                  >
                    <ImageCell character={this.state.board[i][a]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    )
  }
}

export default App
