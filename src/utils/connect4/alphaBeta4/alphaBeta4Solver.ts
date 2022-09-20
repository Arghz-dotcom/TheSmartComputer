import { position4 as position } from "./position4";

export class alphaBetaLevel4Solver {
    public nodeCount: number = 0
    public elapsedTimeMs: number = 0

    constructor(readonly player: number) {}

    private maxAlphaBeta = (p: position):number => {
        return Math.trunc((position.NBCOINS + 1 - p.nbMoves())/2)
    }

    public negamax = (p: position, alpha:number, beta: number, depth: number):number => {
        this.nodeCount++

        if (depth == 0 || p.nbMoves() == position.NBCOINS)
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
                let score = -this.negamax(p, -beta, -alpha, depth - 1)
                p.unplay(col)
                if (score >= beta) return score
                alpha = Math.max(alpha, score)
            }
        }

        return alpha
    }
    
    
    public solve = (p: position, maxDepth: number):number => {
        this.nodeCount = 0

        let startTime = Date.now()
        let result = this.negamax(p, -position.NBCOINS/2, position.NBCOINS/2, maxDepth)
        this.elapsedTimeMs = Date.now() - startTime

        return result
    }
}