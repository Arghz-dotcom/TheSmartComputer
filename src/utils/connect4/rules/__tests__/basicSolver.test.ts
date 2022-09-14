import { basicSolver } from "../basicSolver"
import { generateNewBoard } from "../../gameUtils"



test("getRowFree", () => {
    // arrange
    let board = generateNewBoard()
    board[5][0] = 1
    let solver = new basicSolver(board, 1)

    //act
    let result = solver.getRowFree(0)

    //assert
    expect(result).toBe(4)
})

test("getRowFree-noAvailableCol", () => {
    // arrange
    const board = [
        [2, null, null, null, null, null, null],
        [1, null, null, null, null, null, null],
        [2, null, null, null, null, null, null],
        [1, null, null, null, null, null, null],
        [2, null, null, null, null, null, null],
        [1, null, null, null, null, null, null],
    ]
    let solver = new basicSolver(board, 1)

    //act
    let result = solver.getRowFree(0)

    //assert
    expect(result).toBe(-1)
})

test("getRowColsFree", () => {
    //arrange
    const board = [
        [2, null, null, null, null, null, null],
        [1, null, null, null, null, null, null],
        [2, null, null, null, null, null, null],
        [1, null, null, 1   , null, null, null],
        [2, 2   , null, 2   , null, null, null],
        [1, 1   , null, 1   , null, null, null],
    ]
    let solver = new basicSolver(board, 1)

    //act
    let result = solver.getRowColsFree()

    //assert
    expect(result.length).toBe(6)
    expect(result[0][0]).toBe(3)
    expect(result[0][1]).toBe(1)
    expect(result[1][0]).toBe(5)
    expect(result[1][1]).toBe(2)
})

test("not3with2Attacks-Horizontal", () => {
    //arrange
    let board = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, 2   , 2   , null, null, null],
    ]
    let solver = new basicSolver(board, 1)

    //act
    let result = solver.not3with2Attacks()

    //assert
    expect(result).toBeTruthy()
    expect(board[5][1]).toBe(1)
})

test("not3with2Attacks-Horizontal-2", () => {
    //arrange
    let board = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, 2   , 2   , null, null, null],
        [1   , 1   , 1   , 1   , 1   , null, null],
    ]
    let solver = new basicSolver(board, 1)

    //act
    let result = solver.not3with2Attacks()

    //assert
    expect(result).toBeTruthy()
    expect(board[4][1]).toBe(1)
})

test("not3with2Attacks-Horizontal-3", () => {
    //arrange
    let board = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, 2   , 2   , null, null, null, null],
        [1   , 1   , 1   , 1   , 1   , null, null],
    ]
    let solver = new basicSolver(board, 1)

    //act
    let result = solver.not3with2Attacks()

    //assert
    expect(result).toBeTruthy()
    expect(board[4][3]).toBe(1)
})

