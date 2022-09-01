import React from "react"
import { useReducer } from 'react'
import Layout from "../components/layout"
import Row from "../components/row"

const gameReducer = (state,action) => { return state}

const initialGameState = {
  player1: 1,
  player2: 2,
  currentPlayer: 1,
  board: [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ],
  gameOver: false,
  message: '',
}


const Connect4 = () => {
  const [gameState, dispatchGameState] = useReducer(
    gameReducer,
    initialGameState
  )

  const play = (c) => {}

  return (
    <Layout>
        <h1 class="text-xl">Connect4 Page</h1>
        <table>
        <tbody>
          {gameState.board.map((row, i) => (
            <Row key={i} row={row} play={play} />
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export default Connect4