import { alphaBetaLevel4Solver } from '../alphaBeta4Solver';
import { generateNewBoard } from '../../gameUtils';
import { position4 as position } from '../position4';
import { readFileSync } from 'fs'

test("batchTest", () => {
    let path = require("path");
    let absPath = path.resolve("./src/utils/data/Test_L3_R1")
    let data = readFileSync(absPath, "utf-8")
    let splitted = data.split(/\r?\n/);
    let nbReadRows = Math.min(10, splitted.length)
    
    for(let indexRow = 0; indexRow <nbReadRows; indexRow++) {
        let emptyBoard = generateNewBoard()
        
        let [toPlaySequence, expectedScore] = splitted[indexRow].split(' ')
        let pos = new position(emptyBoard)
        pos.playSequence(toPlaySequence)
        let solver = new alphaBetaLevel4Solver(1)
        let score = solver.solve(pos)

        expect(parseInt(expectedScore)-score).toBe(0)
    }

})

