import { alphaBetaSolverInterface } from "../alphaBeta/alphaBetaSolverInterface"
import { generateNewBoard } from "../gameUtils";
import { position4 as position } from "./position4";

export class alphaBetaLevel4Solver implements alphaBetaSolverInterface {
    public nodeCount: number = 0
    public elapsedTimeMs: number = 0
    private pos!: position;

    constructor(readonly player: number) {}

    private maxAlphaBeta():number {
        return Math.trunc((position.NBCOINS + 1 - this.pos.nbMoves())/2)
    }

    public negamax(alpha:number, beta: number, depth: number):number {
        this.nodeCount++

        if (depth == 0 || this.pos.nbMoves() == position.NBCOINS)
            return 0

        for(let col = 0; col < position.WIDTH; col++)
            if (this.pos.canPlay(col) && this.pos.isWinningMove(col))
                return this.maxAlphaBeta()
        
        let max = this.maxAlphaBeta()
        if (beta > max) {
            beta = max
            if (alpha >= beta) return beta
        }

        for(let col = 0; col < position.WIDTH; col++) {
            if(this.pos.canPlay(col)) {
                this.pos.play(col)
                let score = -this.negamax(-beta, -alpha, depth - 1)
                this.pos.unplay(col)
                if (score >= beta) return score
                alpha = Math.max(alpha, score)
            }
        }

        return alpha
    }

    public playSequence(seq:string) {
        this.pos = new position(generateNewBoard())
        this.pos.playSequence(seq)
    }
    
    
    public solve(maxDepth: number):number {
        this.nodeCount = 0

        let startTime = Date.now()
        let result = this.negamax(-position.NBCOINS/2, position.NBCOINS/2, maxDepth)
        this.elapsedTimeMs = Date.now() - startTime

        return result
    }
}