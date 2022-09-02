// from https://dev.to/mtliendo/building-connect4-adding-logic-d57

import React from "react"
import { useReducer } from 'react'
import Layout from "../components/layout"
import Row from "../components/row"
import { generateNewBoard, play } from '../utils/gameUtils'

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'newGame':
      return {
        ...initialGameState,
        board: action.board,
      }
    case 'togglePlayer':
      return {
        ...state,
        currentPlayer: action.nextPlayer,
        board: action.board,
      }
    case 'endGame':
      return {
        ...state,
        gameOver: true,
        message: action.message,
        board: action.board,
      }
    case 'updateMessage':
      return {
        ...state,
        message: action.message,
      }
    default:
      throw Error(`Action "${action.type}" is not a valid action.`)
  }
}

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


  return (
    <Layout>
        <h1 class="text-xl">Connect4 Page</h1>
        <table>
        <tbody>
          {gameState.board.map((row, i) => (
            <Row key={i} row={row} play={play} gameState={gameState} dispatchGameState={dispatchGameState} />
          ))}
        </tbody>
      </table>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {dispatchGameState({ type: 'newGame', board: generateNewBoard()})}}>New game</button>
      <div>{gameState.message}</div>
    </Layout>
  )
}

export default Connect4