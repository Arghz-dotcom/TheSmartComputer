// Exporting the class which will be
// used in another file
// Export keyword or form should be

import { createPortal } from "react-dom";

// used to use the class 
export class basicSolver {
  
    private board: null[][]
    private player: any
    
    constructor(board: null[][], currentPlayer: any) {
        this.board = board, this.player = currentPlayer
    }

    /**
    * Generate random int
    * @param min 
    * @param max 
    * @returns random int - min & max inclusive
    */
    private generateRandomNumber = (min: number, max: number) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; 
    }

    /**
     * get first row free in column
     * @param column column in board
     * @returns return row if available, otherwise -1
     */
    private getRowFree = (column: number): number => {
        let row = -1
        for(let r = 5; r >= 0; r--) {
            if (!this.board[r][column]) {
              row = r
              break
            }
        }
        return row
    }

    /**
     * Play a random column
     */
    private playRandom = () => {
        let available = false
        do {
          let col = this.generateRandomNumber(0,6)
          let row = this.getRowFree(col)
          if (row != -1)
          {
            this.board[row][col] = this.player
            available = true
            break
          }
        } while(!available)
    }

    /**
     * Check if playing there is winning
     * @param row row on the board
     * @param column column on the board
     * @param player player to check
     */
    private checkWinMove = (row:number, column:number, player:any):boolean => {
        console.log('Analyse player: %d, row: %d, column: %d', player, row, column)
        // horizontal
        let count = 0;
        for (let c = column-1; c >= Math.max(0, column-3); c--) {
            if (this.board[row][c] === player) {
                count++
            } 
            else { break }
        }     

        for (let c = column+1; c <= Math.min(6, column+3); c++) {
            if (this.board[row][c] === player) {
                count++
            }
            else { break}
        }
        if (count >= 3) {
            console.log('player: %d win move horizontal', player)
            return true;
        }
            
        
        // vertical
        count = 0;
        for (let r = row-1; r >= Math.max(0, row-3); r--) {
            if (this.board[r][column] === player) {
                count++
            }  
            else {break}
        }
            
        for (let r = row+1; r <= Math.min(5, row+3); r++) {
            if (this.board[r][column] === player) {
                count++
            }
            else {break}
        }

        if (count >= 3) {
            console.log('player: %d win move vertical', player)
            return true;
        }
            

        // diag 1
        count = 0;
        for (let i = -1; row+i >= Math.max(0, row-3) && column+i >= Math.max(0, column-3); i--) {
            if (this.board[row+i][column+i] === player) {
                count++;
            }
            else {break}
        }
            
        for (let i = 1; row+i <= Math.min(5, row+3) && column+i <= Math.min(6, column+3); i++) {
            if (this.board[row+i][column+i] === player) {
                count++;
            }
            else {break}
        }
            
        if (count >= 3) {
            console.log('player: %d win move diag 1', player)
            return true;
        }

        // diag 2
        count = 0;
        for (let i = -1; row+i >= Math.max(0, row-3) && column-i <= Math.min(6, column+3); i--) {
            if (this.board[row+i][column+i] === player) {
                count++;
            }
            else {break}
        }

        for (let i = 1; row+i <= Math.min(5, row+3) && column-i >= Math.max(0, column-3); i++) {
            if (this.board[row+i][column+i] === player) {
                count++;
            }
            else {break}
        }

        if (count >= 3) {
            console.log('player: %d win move diag 2', player)
            return true;
        } 

        return false;
    }

    /**
     * Play a winning/block move
     */
    private winRightAway = (player:any):boolean => {
        for(let col = 0; col < 7; col++)
        {
            let row = this.getRowFree(col)
            if (row != -1) {
                if (this.checkWinMove(row, col, player)) {
                    this.board[row][col] = this.player
                    return true
                }
            }
        }
        return false
    }

    public solve = () => {
        if (this.winRightAway(this.player)) return
        let oppositePlayer = 3 - this.player
        if (this.winRightAway(oppositePlayer)) return
        this.playRandom()
    }
}