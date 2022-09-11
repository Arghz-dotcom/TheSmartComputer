// Exporting the class which will be
// used in another file
// Export keyword or form should be

// used to use the class 
export class basicSolver {
  
    private get opponentPlayer() {
        return 3-this.player
    }
    
    constructor(readonly board: null[][], readonly player: any) {}

    /**
    * Generate random int
    * @param min 
    * @param max 
    * @returns random int - min & max inclusive
    */
    private generateRandomNumber = (min: number, max: number):number => {
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

    private getRowColsFree = ():[row:number, col:number][] => {
        let freeColRowList: [number, number][] = []
        for(let col = 0; col < 7; col++) {
            let row = this.getRowFree(col)
            if (row != -1) {
                freeColRowList.push([row, col])
            }
        }
        return freeColRowList
    }

    private chooseRowColRandom = (list:[row:number, col:number][]):[row:number, col:number] => {
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
        for(let i = 0; i < rowColsFreeList.length; i++) {
            const [row, col] = rowColsFreeList[i]
            if (row > 0 && this.checkWinMove(row-1, col, this.opponentPlayer)) {
                continue
            }
            freeColRowSmartList.push(rowColsFreeList[i])
        }
        const [row, col] = freeColRowSmartList.length > 0
                         ? this.chooseRowColRandom(freeColRowSmartList)
                         : this.chooseRowColRandom(rowColsFreeList)
        this.board[row][col] = this.player
    }

    private checkHorizontal = (row:number, column:number, player:any):[count: number, minRow: number, minCol: number, maxRow: number, maxCol: number] => {
        let count = 0, minCol:number = column, maxCol:number = column;
        for (let c = column-1; c >= Math.max(0, column-3); c--) {
            if (this.board[row][c] === player) {
                minCol = c
                count++
            } 
            else { break }
        }     

        for (let c = column+1; c <= Math.min(6, column+3); c++) {
            if (this.board[row][c] === player) {
                maxCol = c
                count++
            }
            else { break }
        }

        return [count, row, minCol, row, maxCol]
    }

    private checkVertical = (row:number, column:number, player:any):[count: number, minRow: number, minCol: number, maxRow: number, maxCol: number] => {
        let count = 0, minRow:number = row, maxRow: number = row;
        for (let r = row-1; r >= Math.max(0, row-3); r--) {
            if (this.board[r][column] === player) {
                minRow = r
                count++
            }  
            else { break }
        }
            
        for (let r = row+1; r <= Math.min(5, row+3); r++) {
            if (this.board[r][column] === player) {
                maxRow = r
                count++
            }
            else { break }
        }

        return [count, minRow, column, maxRow, column]
    }

    private checkDiag1 = (row:number, column:number, player:any):[count: number, minRow: number, minCol: number, maxRow: number, maxCol: number] => {
        let count = 0, minRow: number = row, maxRow: number = row, minCol: number = column, maxCol: number = column;
        for (let i = -1; row+i >= Math.max(0, row-3) && column+i >= Math.max(0, column-3); i--) {
            if (this.board[row+i][column+i] === player) {
                minRow = row+i
                minCol = column+i
                count++;
            }
            else { break }
        }
            
        for (let i = 1; row+i <= Math.min(5, row+3) && column+i <= Math.min(6, column+3); i++) {
            if (this.board[row+i][column+i] === player) {
                maxRow = row+i
                maxCol = column+i
                count++;
            }
            else { break }
        }

        return [count, minRow, minCol, maxRow, maxCol]
    }

    private checkDiag2 = (row:number, column:number, player:any):[count: number, minRow: number, minCol: number, maxRow: number, maxCol: number] => {
        let count = 0, minRow: number = row, maxRow: number = row, minCol: number = column, maxCol: number = column;
        for (let i = -1; row+i >= Math.max(0, row-3) && column-i <= Math.min(6, column+3); i--) {
            if (this.board[row+i][column+i] === player) {
                minRow = row+i
                maxCol = column-i
                count++;
            }
            else { break }
        }

        for (let i = 1; row+i <= Math.min(5, row+3) && column-i >= Math.max(0, column-3); i++) {
            if (this.board[row+i][column+i] === player) {
                maxRow = row+i
                minCol = column-i
                count++;
            }
            else { break }
        }

        return [count, minRow, minCol, maxRow, maxCol]
    }

    /**
     * Check if playing there is winning
     * @param row row on the board
     * @param column column on the board
     * @param player player to check
     */
    private checkWinMove = (row:number, column:number, player:any):boolean => {
        // horizontal
        let [count,,,,] = this.checkHorizontal(row, column, player)
        if (count >= 3) {
            return true;
        }
            
        // vertical
        [count,,,,] = this.checkVertical(row, column, player)
        if (count >= 3) {
            return true;
        }

        // diag 1
        [count,,,,] = this.checkDiag1(row, column, player)
        if (count >= 3) {
            return true;
        }

        // diag 2
        [count,,,,] = this.checkDiag2(row, column, player)
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
    private play3aligned = ():boolean => {
        let rowColsFreeList = this.getRowColsFree()
        let rowColsFreeList2: [row:number, col:number][] = []
        console.log("play3aligned")
        for(let i=0; i < rowColsFreeList.length; i++) {
            const [row, col] = rowColsFreeList[i]

            let [count, minRow, minCol, maxRow, maxCol] = this.checkHorizontal(row, col, this.player)
            minCol = Math.min(minCol, col)
            maxCol = Math.max(maxCol, col)
            console.log("row: %d, col: %d, horizontal count: %d", row, col, count)
            let leftFree = minCol-1>=0 && !this.board[row][minCol-1]
            let rightFree = maxCol+1<=6 && !this.board[row][maxCol+1]
            if (count == 2 && (leftFree || rightFree)) {
                rowColsFreeList2.push(rowColsFreeList[i])
                continue
            }

            [count, minRow, minCol, maxRow, maxCol] = this.checkVertical(row, col, this.player)
            minRow = Math.min(minRow, row)
            maxRow = Math.max(maxRow, row)
            console.log("row: %d, col: %d, vertical count: %d", row, col,count)
            if (count == 2 && minRow-1>=0 && !this.board[minRow-1][col]) {
                rowColsFreeList2.push(rowColsFreeList[i])
                continue
            }

            [count, minRow, minCol, maxRow, maxCol] = this.checkDiag1(row, col, this.player)
            minCol = Math.min(minCol, col)
            maxCol = Math.max(maxCol, col)
            minRow = Math.min(minRow, row)
            maxRow = Math.max(maxRow, row)
            console.log("row: %d, col: %d, diag1 count: %d", row, col, count)
            leftFree = minCol-1>=0 && minRow-1>=0 && !this.board[minRow-1][minCol-1]
            rightFree = maxCol+1<=6 && maxRow+1<=5 && !this.board[maxRow+1][maxCol+1]
            if (count == 2 && (leftFree || rightFree)) {
                rowColsFreeList2.push(rowColsFreeList[i])
                continue
            }

            [count, minRow, minCol, maxRow, maxCol] = this.checkDiag2(row, col, this.player)
            minCol = Math.min(minCol, col)
            maxCol = Math.max(maxCol, col)
            minRow = Math.min(minRow, row)
            maxRow = Math.max(maxRow, row)
            console.log("row: %d, col: %d, diag2 count: %d", row, col, count)
            leftFree = minCol-1>=0 && maxRow+1<=5 && !this.board[maxRow+1][minCol-1]
            rightFree = maxCol+1<=6 && minRow-1>=0 && !this.board[minRow-1][maxCol+1]
            if (count == 2 && (leftFree || rightFree)) {
                rowColsFreeList2.push(rowColsFreeList[i])
                continue
            }
        }

        if(rowColsFreeList2.length > 0) {
            const [row, col] = this.chooseRowColRandom(rowColsFreeList2)
            console.log("Play 3 aligned: row: %d, col: %d", row, col)
            this.board[row][col] = this.player
            return true
        }
        
        return false
    }

    public solve = () => {
        // can win immediately
        if (this.winRightAway(this.player)) return
        //can block opponent
        if (this.winRightAway(this.opponentPlayer)) return
        //block if try 3 on baseline
        if (this.not3onBaseline()) return
        // try play 3
        if (this.play3aligned()) return
        this.playRandomSmart()
    }
}