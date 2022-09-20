
export interface alphaBetaSolverInterface {
    nodeCount: number
    elapsedTimeMs: number

    playSequence(seq: string):void
    solve(maxDepth: number):number
  }