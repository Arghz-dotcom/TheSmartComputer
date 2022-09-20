/*
import { alphaBetaLevel4Solver } from '../alphaBeta4Solver';
import { generateNewBoard } from '../../gameUtils';
import { position4 as position } from '../position4';
import { readFileSync } from 'fs'
import { positionInterface } from '../../alphaBeta/positionInterface';
import { alphaBetaSolverInterface } from '../../alphaBeta/alphaBetaSolverInterface';
*/

import { batchTest } from "../../__tests__/testUtils"
import { alphaBetaLevel4Solver } from "../alphaBeta4Solver"

/*
test("batchTest", () => {
    let path = require("path");
    let absPath = path.resolve("./src/utils/data/Test_L3_R1")
    let data = readFileSync(absPath, "utf-8")
    let splitted = data.split(/\r?\n/);
    let nbReadRows = Math.min(50, splitted.length)
    let totalNodeCount = 0, totalTimeMs = 0
    
    for(let indexRow = 0; indexRow < nbReadRows; indexRow++) {
        let emptyBoard = generateNewBoard()
        
        let [toPlaySequence, expectedScore] = splitted[indexRow].split(' ')
        let pos:positionInterface = new position(emptyBoard)
        pos.playSequence(toPlaySequence)
        let solver:alphaBetaSolverInterface = new alphaBetaLevel4Solver(1)
        
        let score = solver.solve(pos, 25)
        totalTimeMs += solver.elapsedTimeMs
        totalNodeCount += solver.nodeCount

        expect(parseInt(expectedScore)-score).toBe(0)
    }

    let meanTime = (totalTimeMs/nbReadRows).toFixed(2)
    let meanNbPos = (totalNodeCount/nbReadRows).toFixed(2)
    let kpos = (totalNodeCount/totalTimeMs).toFixed(2)
    console.log("Mean time: %d, mean nb pos: %d, k pos/s: %d", meanTime, meanNbPos, kpos)
})*/
test("batchTest", () => {
    let filesTest = ["Test_L3_R1"]
    let solver = new alphaBetaLevel4Solver(1)
    batchTest(filesTest, solver)
})


