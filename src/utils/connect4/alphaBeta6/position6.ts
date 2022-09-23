
export class position6 {
    public static readonly WIDTH = 7
    public static readonly HEIGHT = 6
    public static readonly NBCOINS = 42

    public height:bigint[] = [BigInt(0), BigInt(7), BigInt(14), BigInt(21), BigInt(28), BigInt(35), BigInt(42)]
    public moves: number = 0
    public bitboard: bigint[] = [BigInt(0), BigInt(0)]
    
    constructor(readonly inputboard: (number | null)[][]) {
        
    }

    public canPlay = (col: number):boolean => {
        return this.height[col] % BigInt(7) != BigInt(6)     // this.height[col] should not have 6,13,20,27,34,41,48
    }

    public isWinningMove = (col: number):boolean => {
        let pos = BigInt(this.bitboard[this.moves & 1]) // copy the bitboard
        pos ^= BigInt(1) << this.height[col] //adding the play to pos

        //horizontal
        let m = pos & (pos >> BigInt(position6.HEIGHT+1))
        if (m & (m >> BigInt(2*(position6.HEIGHT+1)))) return true
        
        //diag1
        m = pos & (pos >> BigInt(position6.HEIGHT))
        if (m & (m >> BigInt(2*position6.HEIGHT))) return true
        
        //diag2
        m = pos & (pos >> BigInt(position6.HEIGHT+2))
        if (m & (m >> BigInt(2*(position6.HEIGHT+2)))) return true
        
        //vertical
        m = pos & (pos >> BigInt(1))
        if (m & (m >> BigInt(2))) return true

        return false
    }

    public play = (col: number) => {
        let move = BigInt(1) << this.height[col]++
        this.bitboard[this.moves & 1] ^= move
        this.moves++
    }

    public unplay = (col: number) => {
        this.moves--
        let move = BigInt(1) << --this.height[col]
        this.bitboard[this.moves & 1] ^= move
    }

    public playSequence = (seq:string):number => {
        for(let indexSeq = 0; indexSeq < seq.length; indexSeq++) {
            let col = parseInt(seq[indexSeq]) - 1
            if (col < 0 || col >= position6.WIDTH || !this.canPlay(col) || this.isWinningMove(col))
                return indexSeq
            this.play(col)
        }
        return seq.length
    }
}