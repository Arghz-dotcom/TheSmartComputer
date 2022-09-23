import { batchTest } from "../../__tests__/testUtils"
import { alphaBetaLevel4Solver } from "../alphaBeta4Solver"


test("batchTest", () => {
    let filesTest = ["Test_L3_R1"]
    let solver = new alphaBetaLevel4Solver(1)
    batchTest(filesTest, solver, 50)
})


