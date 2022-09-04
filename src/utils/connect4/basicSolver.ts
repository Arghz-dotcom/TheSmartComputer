// Exporting the class which will be
// used in another file
// Export keyword or form should be
// used to use the class 
export class basicSolver {
  
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

    public player2Play = (board:null[][], player:any) => {
        let available = false
        do {
          let col = this.generateRandomNumber(0,6)
          for(let r = 5; r >= 0; r--) {
            console.log('row: %d, col: %d', r, col)
            if (!board[r][col]) {
              board[r][col] = player
              available = true
              break
            }
          }
        } while(!available)
      }
}