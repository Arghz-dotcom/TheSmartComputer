import { generateNewBoard } from "../gameUtils"

export class position4 {
    public static readonly WIDTH = 7
    public static readonly HEIGHT = 6
    public static readonly NBCOINS = 42

    private height: number[] = new Array(7).fill(0)
    private moves: number = 0
    private board: (number | null)[][]
    
    constructor(readonly inputboard: (number | null)[][]) {
        this.board = [
            [...inputboard[5]],
            [...inputboard[4]],
            [...inputboard[3]],
            [...inputboard[2]],
            [...inputboard[1]],
            [...inputboard[0]],
          ]
    }

    public initialize() {
        this.board = generateNewBoard()

    }

    private currentPlayer(): number {
        return 1 + this.moves % 2
    }
    
    public nbMoves():number {
        return this.moves
    }

    public canPlay(col: number):boolean {
        return this.height[col] < position4.HEIGHT
    }

    public isWinningMove(col: number):boolean {
        if (this.height[col] >= 3
            && this.board[this.height[col]-1][col] === this.currentPlayer()
            && this.board[this.height[col]-2][col] === this.currentPlayer()
            && this.board[this.height[col]-3][col] === this.currentPlayer()
            )
            return true
        
        for(let dy = -1; dy <= 1; dy++) {
            let nb = 0
            for (let dx = -1; dx <= 1; dx += 2) {
                for(let x = col + dx, y = this.height[col] + dx * dy; x >= 0 && x < position4.WIDTH && y >= 0 && y < position4.HEIGHT && this.board[y][x] == this.currentPlayer(); nb++) {
                    x += dx
                    y += dx * dy
                }
            }
            if(nb >= 3) return true
        }

        return false
    }

    public play = (col: number) => {
        this.board[this.height[col]][col] = this.currentPlayer()
        this.height[col]++
        this.moves++
    }

    public unplay = (col: number) => {
        this.moves--
        this.height[col]--
        this.board[this.height[col]][col] = null
    }

    public playSequence = (seq:string):number => {
        for(let indexSeq = 0; indexSeq < seq.length; indexSeq++) {
            let col = parseInt(seq[indexSeq]) - 1
            if (col < 0 || col >= position4.WIDTH || !this.canPlay(col) || this.isWinningMove(col))
                return indexSeq
            this.play(col)
        }
        return seq.length
    }
}