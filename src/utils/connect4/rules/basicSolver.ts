// Exporting the class which will be
// used in another file
// Export keyword or form should be

// used to use the class 
export class basicSolver {
  
    private readonly MAXCOLVALUE = 6
    private readonly MAXROWVALUE = 5

    private get opponentPlayer() {
        return 3-this.player
    }
    
    constructor(readonly board: (number | null)[][], readonly player: any) {}

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
    public getRowFree = (col: number): number => {
        for(let row = this.MAXROWVALUE; row >= 0; row--) {
            if (!this.board[row][col]) {
              return row
            }
        }
        return -1
    }

    public getRowColsFree = ():[row:number, col:number][] => {
        let freeColRowList: [number, number][] = []
        for(let col = 0; col <= this.MAXCOLVALUE; col++) {
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

    public checkHorizontal = (row:number, column:number, player:any):[count: number, minRow: number, minCol: number, maxRow: number, maxCol: number] => {
        let count = 0, minCol:number = Infinity, maxCol:number = -Infinity;
        for (let c = column-1; c >= Math.max(0, column-3); c--) {
            if (this.board[row][c] === player) {
                minCol = Math.min(minCol, c)
                maxCol = Math.max(maxCol, c)
                count++
            } 
            else { break }
        }     

        for (let c = column+1; c <= Math.min(this.MAXCOLVALUE, column+3); c++) {
            if (this.board[row][c] === player) {
                minCol = Math.min(minCol, c)
                maxCol = Math.max(maxCol, c)
                count++
            }
            else { break }
        }

        return [count, row, minCol, row, maxCol]
    }

    public checkVertical = (row:number, column:number, player:any):[count: number, minRow: number, minCol: number, maxRow: number, maxCol: number] => {
        let count = 0, minRow:number = Infinity, maxRow: number = -Infinity;
            
        for (let r = row+1; r <= Math.min(this.MAXROWVALUE, row+3); r++) {
            if (this.board[r][column] === player) {
                minRow = Math.min(minRow, r)
                maxRow = Math.max(maxRow, r)
                count++
            }
            else { break }
        }

        return [count, minRow, column, maxRow, column]
    }

    public checkDiag1 = (row:number, column:number, player:any):[count: number, minRow: number, minCol: number, maxRow: number, maxCol: number] => {
        let count = 0, minRow: number = Infinity, maxRow: number = -Infinity, minCol: number = Infinity, maxCol: number = -Infinity;
        for (let i = -1; row+i >= Math.max(0, row-3) && column+i >= Math.max(0, column-3); i--) {
            if (this.board[row+i][column+i] === player) {
                minRow = Math.min(row+i, minRow)
                maxRow = Math.max(row+i, maxRow)
                minCol = Math.min(column+i, minCol)
                maxCol = Math.max(column+i, maxCol)
                count++;
            }
            else { break }
        }
            
        for (let i = 1; row+i <= Math.min(this.MAXROWVALUE, row+3) && column+i <= Math.min(this.MAXCOLVALUE, column+3); i++) {
            if (this.board[row+i][column+i] === player) {
                minRow = Math.min(row+i, minRow)
                maxRow = Math.max(row+i, maxRow)
                minCol = Math.min(column+i, minCol)
                maxCol = Math.max(column+i, maxCol)
                count++;
            }
            else { break }
        }

        return [count, minRow, minCol, maxRow, maxCol]
    }

    public checkDiag2 = (row:number, column:number, player:any):[count: number, minRow: number, minCol: number, maxRow: number, maxCol: number] => {
        let count = 0, minRow: number = Infinity, maxRow: number = -Infinity, minCol: number = Infinity, maxCol: number = -Infinity;
        for (let i = -1; row+i >= Math.max(0, row-3) && column-i <= Math.min(this.MAXCOLVALUE, column+3); i--) {
            if (this.board[row+i][column-i] === player) {
                minRow = Math.min(row+i, minRow)
                maxRow = Math.max(row+i, maxRow)
                minCol = Math.min(column-i, minCol)
                maxCol = Math.max(column-i, maxCol)
                count++;
            }
            else { break }
        }

        for (let i = 1; row+i <= Math.min(this.MAXROWVALUE, row+3) && column-i >= Math.max(0, column-3); i++) {
            if (this.board[row+i][column-i] === player) {
                minRow = Math.min(row+i, minRow)
                maxRow = Math.max(row+i, maxRow)
                minCol = Math.min(column-i, minCol)
                maxCol = Math.max(column-i, maxCol)
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
        console.log("winRightAway: player: %d", player)
        for(let col = 0; col <= this.MAXCOLVALUE; col++)
        {
            let row = this.getRowFree(col)
            if (row != -1 && this.checkWinMove(row, col, player)) {
                console.log("found 4 for player: %d", player)
                this.board[row][col] = this.player
                return true
            }
        }
        return false
    }

    /**
     * Check if next turn it's possible to put a coin there
     * @param row 
     * @param col 
     * @returns
     */
    private isPlayable = (row:number, col:number):boolean => {
        //outside board
        if (row < 0 || row > this.MAXROWVALUE || col < 0 || col > this.MAXCOLVALUE) {
            return false
        }

        return ((row === this.MAXROWVALUE) || (row + 1 <= this.MAXROWVALUE && this.board[row+1][col] != null))
    }

    /**
     * Check if board is free there
     * @param row 
     * @param col 
     * @returns 
     */
    private isFree = (row:number, col:number):boolean => {
        //outside board
        if (row < 0 || row > this.MAXROWVALUE || col < 0 || col > this.MAXCOLVALUE) {
            return false
        }
        return !this.board[row][col]
    }

    /**
     * Check if board is free and playable there
     * @param row 
     * @param col 
     * @returns 
     */
    private isFreeAndPlayable = (row:number, col:number):boolean => {
        return this.isFree(row, col) && this.isPlayable(row, col)
    }

    /**
     * Block opponent if he can align 3 coins with 2 immediate attacks
     * @returns successful
     */
    public not3with2Attacks = ():boolean => {
        let rowColsFreeList = this.getRowColsFree()
        console.log("not3with2Attacks")
        for(let i=0; i < rowColsFreeList.length; i++) {
            const [row, col] = rowColsFreeList[i]

            let [count, minRow, minCol, maxRow, maxCol] = this.checkHorizontal(row, col, this.opponentPlayer)
            minCol = Math.min(minCol, col)
            maxCol = Math.max(maxCol, col)
            console.log("row: %d, col: %d, horizontal count: %d", row, col, count)

            if (count == 2 && 
                this.isFreeAndPlayable(row, minCol-1) && 
                this.isFreeAndPlayable(row, maxCol+1)) {
                    this.board[row][col] = this.player
                    return true
            }

            [count, minRow, minCol, maxRow, maxCol] = this.checkDiag1(row, col, this.opponentPlayer)
            minCol = Math.min(minCol, col)
            maxCol = Math.max(maxCol, col)
            minRow = Math.min(minRow, row)
            maxRow = Math.max(maxRow, row)
            console.log("row: %d, col: %d, diag1 count: %d", row, col, count)

            if (count == 2 &&
                this.isFreeAndPlayable(minRow-1, minCol-1) &&
                this.isFreeAndPlayable(maxRow+1, maxCol+1)) {
                    this.board[row][col] = this.player
                    return true
            }

            [count, minRow, minCol, maxRow, maxCol] = this.checkDiag2(row, col, this.opponentPlayer)
            minCol = Math.min(minCol, col)
            maxCol = Math.max(maxCol, col)
            minRow = Math.min(minRow, row)
            maxRow = Math.max(maxRow, row)
            console.log("row: %d, col: %d, diag2 count: %d", row, col, count)

            if (count == 2 &&
                this.isFreeAndPlayable(maxRow+1,minCol-1) &&
                this.isFreeAndPlayable(minRow-1,maxCol+1)) {
                    this.board[row][col] = this.player
                    return true
            }
        }

        return false
    }

    /**
     * Try to play 3 coins aligned
     * @returns successful 
     */
    private play3aligned = ():boolean => {
        let rowColsFreeList = this.getRowColsFree()
        let rowColsFreeList2: [row:number, col:number][] = []
        console.log("play3aligned")
        for(let i=0; i < rowColsFreeList.length; i++) {
            const [row, col] = rowColsFreeList[i]
            
            // Don't play there if next turn opponent can win
            let upDontWin = (row === 0) || (row > 0 && !this.checkWinMove(row-1, col, this.opponentPlayer))
            if (!upDontWin) { continue }

            let [count, minRow, minCol, maxRow, maxCol] = this.checkHorizontal(row, col, this.player)
            minCol = Math.min(minCol, col)
            maxCol = Math.max(maxCol, col)
            console.log("row: %d, col: %d, horizontal count: %d", row, col, count)

            if (count == 2 && (this.isFree(row, minCol-1) || this.isFree(row, maxCol+1))) {
                rowColsFreeList2.push(rowColsFreeList[i])
                continue
            }

            [count, minRow, minCol, maxRow, maxCol] = this.checkVertical(row, col, this.player)
            minRow = Math.min(minRow, row)
            maxRow = Math.max(maxRow, row)
            console.log("row: %d, col: %d, vertical count: %d", row, col,count)
            if (count == 2 && this.isFree(minRow-1, col)) {
                rowColsFreeList2.push(rowColsFreeList[i])
                continue
            }

            [count, minRow, minCol, maxRow, maxCol] = this.checkDiag1(row, col, this.player)
            minCol = Math.min(minCol, col)
            maxCol = Math.max(maxCol, col)
            minRow = Math.min(minRow, row)
            maxRow = Math.max(maxRow, row)
            console.log("row: %d, col: %d, diag1 count: %d", row, col, count)

            if (count == 2 && (this.isFree(minRow-1, minCol-1) || this.isFree(maxRow+1, maxCol+1))) {
                rowColsFreeList2.push(rowColsFreeList[i])
                continue
            }

            [count, minRow, minCol, maxRow, maxCol] = this.checkDiag2(row, col, this.player)
            minCol = Math.min(minCol, col)
            maxCol = Math.max(maxCol, col)
            minRow = Math.min(minRow, row)
            maxRow = Math.max(maxRow, row)
            console.log("row: %d, col: %d, diag2 count: %d", row, col, count)

            if (count == 2 && (this.isFree(maxRow+1, minCol-1) || this.isFree(minRow-1, maxCol+1))) {
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
        //block if try 3 with 2 simultaneous attacks
        if (this.not3with2Attacks()) return
        // try play 3
        if (this.play3aligned()) return
        this.playRandomSmart()
    }
}