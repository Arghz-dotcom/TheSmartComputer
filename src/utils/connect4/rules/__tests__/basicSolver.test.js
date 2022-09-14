import { basicSolver } from "../basicSolver"

let solver = new basicSolver([], null)

test("hello", () => {
    expect(solver.hello()).toBe("hello world")
})