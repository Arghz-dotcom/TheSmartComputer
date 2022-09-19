import { position4 as position } from "./position4";

export class alphaBetaLevel4Solver {
    public nodeCount: number = 0

    constructor(readonly player: any) {}

    private maxAlphaBeta = (p: position):number => {
        return Math.trunc((position.NBCOINS + 1 - p.nbMoves())/2)
    }

    public negamax = (p: position, alpha:number, beta: number):number => {
        this.nodeCount++

        if (p.nbMoves() == position.NBCOINS)
            return 0

        for(let col = 0; col < position.WIDTH; col++)
            if (p.canPlay(col) && p.isWinningMove(col))
                return this.maxAlphaBeta(p)
        
        let max = this.maxAlphaBeta(p)
        if (beta > max) {
            beta = max
            if (alpha >= beta) return beta
        }

        for(let col = 0; col < position.WIDTH; col++) {
            if(p.canPlay(col)) {
                p.play(col)
                let score = -this.negamax(p, -beta, -alpha)
                p.unplay(col)
                if (score >= beta) return score
                alpha = Math.max(alpha, score)
            }
        }

        return alpha
    }
    
    
    public solve = (p: position):number => {
        this.nodeCount = 0

        return this.negamax(p, -position.NBCOINS/2, position.NBCOINS/2)
    }
}