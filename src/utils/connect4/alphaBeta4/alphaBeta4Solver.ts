import { position4 as position } from "./position4";

export class alphaBetaLevel4Solver {
    public nodeCount: number = 0

    constructor(readonly board: (number | null)[][], readonly player: any) {}

    public negamax = (p: position, alpha:number, beta: number):number => {
        this.nodeCount++

        if (p.nbMoves == position.NBCOINS)
            return 0

        for(let col = 0; col < position.WIDTH; col++)
            if (p.canPlay(col) && p.isWinningMove(col))
                return (position.NBCOINS + 1 - p.nbMoves)/2
        
        let max = (position.NBCOINS - 1 - p.nbMoves)/2
        if (beta > max) {
            beta = max
            if (alpha >= beta) return beta
        }

        for(let col = 0; col < position.WIDTH; col++) {
            if(p.canPlay(col)) {
                let p2 = new position()
                p2.play(col)
                let score = -this.negamax(p2, -beta, -alpha)
                if (score >= beta) return score
                alpha = Math.max(alpha, score)
            }
        }

        return alpha
    }
    
    
    public solve = ():number => {
        this.nodeCount = 0

        let p = new position(this.board)
        return this.negamax(p, -position.NBCOINS/2, position.NBCOINS/2)
    }
}