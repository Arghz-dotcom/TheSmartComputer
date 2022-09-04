// Exporting the class which will be
// used in another file
// Export keyword or form should be
// used to use the class 
export class basicSolver {
  
    private board: null[][]
    private player: any
    
    constructor(board: null[][], player: any) {
        this.board = board, this.player = player
    }

    /*
    * Genrate random int
    * @param min 
    * @param max 
    * @returns random int - min & max inclusive
    */
    private generateRandomNumber = (min: number, max: number) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; 
    }

    private playRandom = () => {
        let available = false
        do {
          let col = this.generateRandomNumber(0,6)
          for(let r = 5; r >= 0; r--) {
            console.log('row: %d, col: %d', r, col)
            if (!this.board[r][col]) {
              this.board[r][col] = this.player
              available = true
              break
            }
          }
        } while(!available)
    }

    public player2Play = () => {
        this.playRandom()
    }
}