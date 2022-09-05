import { basicSolver } from "./basicSolver";


export const generateNewBoard = ():null[][] => [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
]

export const deepCloneBoard = (board:null[][]) => [
    [...board[0]],
    [...board[1]],
    [...board[2]],
    [...board[3]],
    [...board[4]],
    [...board[5]],
  ]

  const checkVertical = (board:null[][]) => {
    // Check only if row is 3 or greater
    for (let r = 3; r < 6; r++) {
      for (let c = 0; c < 7; c++) {
        if (board[r][c]) {
          if (
            board[r][c] === board[r - 1][c] &&
            board[r][c] === board[r - 2][c] &&
            board[r][c] === board[r - 3][c]
          ) {
            return board[r][c]
          }
        }
      }
    }
  }
  
  const checkHorizontal = (board:null[][]) => {
    // Check only if column is 3 or less
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c]) {
          if (
            board[r][c] === board[r][c + 1] &&
            board[r][c] === board[r][c + 2] &&
            board[r][c] === board[r][c + 3]
          ) {
            return board[r][c]
          }
        }
      }
    }
  }
  
  const checkDiagonalRight = (board:null[][]) => {
    // Check only if row is 3 or greater AND column is 3 or less
    for (let r = 3; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c]) {
          if (
            board[r][c] === board[r - 1][c + 1] &&
            board[r][c] === board[r - 2][c + 2] &&
            board[r][c] === board[r - 3][c + 3]
          ) {
            return board[r][c]
          }
        }
      }
    }
  }
  
  const checkDiagonalLeft = (board:null[][]) => {
    // Check only if row is 3 or greater AND column is 3 or greater
    for (let r = 3; r < 6; r++) {
      for (let c = 3; c < 7; c++) {
        if (board[r][c]) {
          if (
            board[r][c] === board[r - 1][c - 1] &&
            board[r][c] === board[r - 2][c - 2] &&
            board[r][c] === board[r - 3][c - 3]
          ) {
            return board[r][c]
          }
        }
      }
    }
  }
  
  const checkDraw = (board:null[][]) => {
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 7; c++) {
        if (board[r][c] === null) {
          return null
        }
      }
    }
    return 'draw'
  }
  
  const checkForWin = (board:null[][]) => {
    return (
      checkVertical(board) ||
      checkDiagonalRight(board) ||
      checkDiagonalLeft(board) ||
      checkHorizontal(board) ||
      checkDraw(board)
    )
  }

  // triggered when a user clicks a cell
  export const play = (c:number, gameState:any, dispatchGameState:any) => {
    if (!gameState.gameOver) {
      let board = deepCloneBoard(gameState.board)
      //check if cell is taken by starting at the bottom row and working up
      for (let r = 5; r >= 0; r--) {
        if (!board[r][c]) {
          board[r][c] = gameState.currentPlayer
          break
        }
      }

      // Check status of board
      let result = checkForWin(board)
      if (result === gameState.player1) {
        dispatchGameState({
          type: 'endGame',
          message: 'Player (red) wins!',
          board,
        })
      } else if (result === 'draw') {
        dispatchGameState({
          type: 'endGame',
          message: 'Draw Game!',
          board,
        })
      } else { // AI to play
        let solver = new basicSolver(board, gameState.player2)
        solver.solve()
        result = checkForWin(board)
        if (result === gameState.player2) {
          dispatchGameState({
            type: 'endGame',
            message: 'Player (yellow) wins!',
            board,
          })
        } else if (result === 'draw') {
          dispatchGameState({
            type: 'endGame',
            message: 'Draw Game!',
            board,
          })
        } else {
          const nextP = gameState.player1
          dispatchGameState({ type: 'togglePlayer', nextP, board })
        }
      }
    }
    // it's gameover and a user clicked a cell
    else {
      dispatchGameState({
        type: 'updateMessage',
        message: 'Game Over. Please start a new game.',
      })
    }
  }

  