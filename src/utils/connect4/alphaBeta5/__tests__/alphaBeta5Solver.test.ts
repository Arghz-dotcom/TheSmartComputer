import { batchTest } from '../../__tests__/testUtils';
import { alphaBetaLevel5Solver } from '../alphaBeta5Solver';


test("batchTest", () => {
    let filesTest = ["Test_L3_R1"]
    let solver = new alphaBetaLevel5Solver(1)
    batchTest(filesTest, solver)
})

