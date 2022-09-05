
export class alphaBetaSolver {

    private bitBoardPosition: BigInt = BigInt(0)
    private bitBoardMask: BigInt = BigInt(0)
    private player: any
    
    constructor(board: null[][], currentPlayer: any) {
        let bitboard = this.boardToBitBoard(board)
        this.bitBoardPosition = bitboard[0]
        this.bitBoardMask = bitboard[1]
        this.player = currentPlayer
    }

    /**
     * Convert string to BigInt
     * @param x string as '001110000' in binary
     * @returns the bigint
     */
    private stringToBigInt = (x: string):bigint => {
        let result: bigint = BigInt(0)
        let shift: number = 0
        for (let i = x.length-1; i >=0; i--) {
            result += BigInt(x[i]) << BigInt(shift++)
        }
        return result
    }

    /**
     * Convert input board to bitboard
     * @param board input board
     * @returns [bitboard position, bitboard mask]
     */
    private boardToBitBoard = (board: null[][]):[BigInt, BigInt] => {
        //need 49 bits
        /*def get_position_mask_bitmap(board, player):
        position, mask = '', ''
        # Start with right-most column
        for j in range(6, -1, -1):
            # Add 0-bits to sentinel 
            mask += '0'
            position += '0'
            # Start with bottom row
            for i in range(0, 6):
                mask += ['0', '1'][board[i, j] != 0]
                position += ['0', '1'][board[i, j] == player]
        return int(position, 2), int(mask, 2)
        */
        let position:string = '', mask:string = ''
        for(let j = 6; j >= 0; j--) {
            // Add 0-bits to sentinel
            mask += '0'
            position += '0'
            for(let i = 0; i < 6; i++) {
                mask += board[i][j] ? '0' : '1'
                position += board[i][j] === this.player ? '0' : '1'
            }
        }
        return [this.stringToBigInt(position), this.stringToBigInt(mask)]
    }



    public solve = () => {
    }
}