// Exporting the class which will be
// used in another file
// Export keyword or form should be

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
     * @param col column in board
     * @returns return row if available, otherwise -1
     */
    private getRowFree = (col: number): number => {
        for(let row = 5; row >= 0; row--) {
            if (!this.board[row][col]) {
              return row
            }
        }
        return -1
    }

    private getRowColsFree = ():[number, number][] => {
        let freeColRowList: [number, number][] = []
        for(let col = 0; col < 7; col++) {
            let row = this.getRowFree(col)
            if (row != -1) {
                freeColRowList.push([row, col])
            }
        }
        return freeColRowList
    }

    private chooseRowColRandom = (list:[number, number][]):[number, number] => {
        const weights:number[] = [1,1.3,2,3,2,1.3,1] //sum=11.6
        let sumWeights = 0
        for(let i = 0; i < list.length; i++) {
            const [, col] = list[i]
            sumWeights += weights[col]
        }
        let rnd = this.generateRandomNumber(0, sumWeights)
        let curWeight = 0
        for(let i = 0; i < list.length; i++) {
            const [, col] = list[i]
            curWeight += weights[col]
            if (curWeight >= rnd) {
                return list[i]
            }
        }
        return list[list.length-1]
    }

    /**
     * Play a random column, but not where opponent can win next run
     */
    private playRandomSmart = () => {
        let rowColsFreeList = this.getRowColsFree()
        let freeColRowSmartList: [number, number][] = []
        let opponentPlayer = 3 - this.player
        for(let i = 0; i < rowColsFreeList.length; i++) {
            const [row, col] = rowColsFreeList[i]
            if (row > 0 && this.checkWinMove(row-1, col, opponentPlayer)) {
                continue
            }
            freeColRowSmartList.push(rowColsFreeList[i])
        }
        const [row, col] = freeColRowSmartList.length > 0
                         ? this.chooseRowColRandom(freeColRowSmartList)
                         : this.chooseRowColRandom(rowColsFreeList)
        this.board[row][col] = this.player
    }

    /**
     * Check if playing there is winning
     * @param row row on the board
     * @param column column on the board
     * @param player player to check
     */
    private checkWinMove = (row:number, column:number, player:any):boolean => {
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
            else { break }
        }
        if (count >= 3) {
            return true;
        }
            
        
        // vertical
        count = 0;
        for (let r = row-1; r >= Math.max(0, row-3); r--) {
            if (this.board[r][column] === player) {
                count++
            }  
            else { break }
        }
            
        for (let r = row+1; r <= Math.min(5, row+3); r++) {
            if (this.board[r][column] === player) {
                count++
            }
            else { break }
        }

        if (count >= 3) {
            return true;
        }
            

        // diag 1
        count = 0;
        for (let i = -1; row+i >= Math.max(0, row-3) && column+i >= Math.max(0, column-3); i--) {
            if (this.board[row+i][column+i] === player) {
                count++;
            }
            else { break }
        }
            
        for (let i = 1; row+i <= Math.min(5, row+3) && column+i <= Math.min(6, column+3); i++) {
            if (this.board[row+i][column+i] === player) {
                count++;
            }
            else { break }
        }
            
        if (count >= 3) {
            return true;
        }

        // diag 2
        count = 0;
        for (let i = -1; row+i >= Math.max(0, row-3) && column-i <= Math.min(6, column+3); i--) {
            if (this.board[row+i][column+i] === player) {
                count++;
            }
            else { break }
        }

        for (let i = 1; row+i <= Math.min(5, row+3) && column-i >= Math.max(0, column-3); i++) {
            if (this.board[row+i][column+i] === player) {
                count++;
            }
            else { break }
        }

        if (count >= 3) {
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
            if (row != -1 && this.checkWinMove(row, col, player)) {
                this.board[row][col] = this.player
                return true
            }
        }
        return false
    }

    /**
     * Block opponent if he can do trick 3 on baseline
     * @returns successful block
     */
    private not3onBaseline = ():boolean => {
        let oppositePlayer = 3 - this.player
        for(let col = 0; col < 3; col++) {
            if (!this.board[5][col] && this.board[5][col+1] === oppositePlayer && this.board[5][col+2] === oppositePlayer && !this.board[5][col+3] && !this.board[5][col+4]) {
                this.board[5][col+3] = this.player
                return true
            }
        }
        for(let col = 0; col < 3; col++) {
            if (!this.board[5][col] && !this.board[5][col+1]&& this.board[5][col+2] === oppositePlayer && this.board[5][col+3] === oppositePlayer && !this.board[5][col+4]) {
                this.board[5][col+1] = this.player
                return true
            }
        }
        return false
    }

    public solve = () => {
        // can win immediately
        if (this.winRightAway(this.player)) return
        let oppositePlayer = 3 - this.player
        //can block opponent
        if (this.winRightAway(oppositePlayer)) return
        //block if try 3 on baseline
        if (this.not3onBaseline()) return
        this.playRandomSmart()
    }
}