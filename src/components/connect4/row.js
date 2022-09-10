import React from "react"
import * as gameStyles from '../../styles/Connect4.module.css'

const Row = ({ row, play, gameState, dispatchGameState }) => {
    return (
        <tr>
            {row.map((cell, i) => (
                <Cell key={i} value={cell} columnIndex={i} play={play} gameState={gameState} dispatchGameState={dispatchGameState} />
            ))}
         </tr>
    )
  }

  const Cell = ({ value, columnIndex, play, gameState, dispatchGameState }) => {
    let color = 'whiteCircle'

    if (value === 1) { color = 'redCircle'} 
    else if (value === 2) { color = 'yellowCircle'}
    
    return (
        <td>
            <div justify="center" align="center" className="h-70 w-70 bg-sky-500 cursor-pointer" onClick={() => {play(columnIndex, gameState, dispatchGameState)}} onKeyDown={() => {play(columnIndex, gameState, dispatchGameState)}}>
                <div className={gameStyles[color]} />
            </div>
        </td>
    )
  }
  
  export default Row