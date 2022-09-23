import { batchTest } from '../../__tests__/testUtils';
import { alphaBetaLevel6Solver } from '../alphaBeta6Solver';


test("batchTest", () => {
    let filesTest = ["Test_L3_R1"]
    let solver = new alphaBetaLevel6Solver(1)
    batchTest(filesTest, solver, 10)
})

