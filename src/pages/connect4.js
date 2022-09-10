// from https://dev.to/mtliendo/building-connect4-adding-logic-d57

import React from "react"
import { useReducer } from 'react'
import Layout from "../components/layout"
import Row from "../components/connect4/row"
import { generateNewBoard, play } from '../utils/connect4/gameUtils'
import { basicSolver } from "../utils/connect4/basicSolver"

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'newGame':
      if (state.playerFirst === 'ComputerFirst')  {
        let solver = new basicSolver(action.board, initialGameState.player2)
        solver.solve()
      }
      return {
        ...initialGameState,
        board: action.board,
        playerFirst: state.playerFirst,
      }
    case 'togglePlayer':
      return {
        ...state,
        currentPlayer: action.nextP,
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
    case 'playerFirst':
      return {
        ...state,
        playerFirst: action.playerFirst
      }
    default:
      throw Error(`Action "${action.type}" is not a valid action.`)
  }
}

const initialGameState = {
  player1: 1,
  player2: 2,
  currentPlayer: 1,
  board: generateNewBoard(),
  gameOver: false,
  message: '',
  playerFirst: 'HumanFirst'
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
      <div>Message: {gameState.message}</div>
      <div>
        <input type="radio" value="HumanFirst" name="player" checked={gameState.playerFirst === 'HumanFirst'} onChange={() => {dispatchGameState({ type: 'playerFirst', playerFirst: 'HumanFirst'})}} /> HumanFirst<br/>
        <input type="radio" value="ComputerFirst" name="player" checked={gameState.playerFirst === 'ComputerFirst'} onChange={() => {dispatchGameState({ type: 'playerFirst', playerFirst: 'ComputerFirst'})}}/> Computer First
      </div>
    </Layout>
  )
}

export default Connect4