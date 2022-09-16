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

test("checkHorizontal", () => {
    //arrange
    let board = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, 1   , 1   , null, 1   , null],
    ]
    let solver = new basicSolver(board, 1)

    //act
    let [count, minRow, minCol, maxRow, maxCol] = solver.checkHorizontal(5, 4, 1)

    //assert
    expect(count).toBe(3)
    expect(minRow).toBe(5)
    expect(minCol).toBe(2)
    expect(maxRow).toBe(5)
    expect(maxCol).toBe(5)
})

test("checkHorizontal-2", () => {
    //arrange
    let board = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, 1   , 1   , null, null, null],
    ]
    let solver = new basicSolver(board, 1)

    //act
    let [count, minRow, minCol, maxRow, maxCol] = solver.checkHorizontal(5, 1, 1)

    //assert
    expect(count).toBe(2)
    expect(minRow).toBe(5)
    expect(minCol).toBe(2)
    expect(maxRow).toBe(5)
    expect(maxCol).toBe(3)
})

test("checkVertical", () => {
    //arrange
    let board = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, 1   , null, null, null],
        [null, null, null, 1   , null, null, null],
    ]
    let solver = new basicSolver(board, 1)

    //act
    let [count, minRow, minCol, maxRow, maxCol] = solver.checkVertical(3, 3, 1)

    //assert
    expect(count).toBe(2)
    expect(minRow).toBe(4)
    expect(minCol).toBe(3)
    expect(maxRow).toBe(5)
    expect(maxCol).toBe(3)
})

test("checkDiag1", () => {
    //arrange
    let board = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, 1   , null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, 1   , null, null, null],
        [null, null, null, null, 1   , null, null],
    ]
    let solver = new basicSolver(board, 1)

    //act
    let [count, minRow, minCol, maxRow, maxCol] = solver.checkDiag1(3, 2, 1)

    //assert
    expect(count).toBe(3)
    expect(minRow).toBe(2)
    expect(minCol).toBe(1)
    expect(maxRow).toBe(5)
    expect(maxCol).toBe(4)
})

test("checkDiag1-2", () => {
    //arrange
    let board = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, 1   , null, null, null, null],
        [null, null, null, 1   , null, null, null],
        [null, null, null, null, 1   , null, null],
    ]
    let solver = new basicSolver(board, 1)

    //act
    let [count, minRow, minCol, maxRow, maxCol] = solver.checkDiag1(2, 1, 1)

    //assert
    expect(count).toBe(3)
    expect(minRow).toBe(3)
    expect(minCol).toBe(2)
    expect(maxRow).toBe(5)
    expect(maxCol).toBe(4)
})

test("checkDiag1-3", () => {
    //arrange
    let board = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, 1   , null, null, null, null, null],
        [null, null, 1   , null, null, null, null],
        [null, null, null, 1   , null, null, null],
        [null, null, null, null, null  , null, null],
    ]
    let solver = new basicSolver(board, 1)

    //act
    let [count, minRow, minCol, maxRow, maxCol] = solver.checkDiag1(5, 4, 1)

    //assert
    expect(count).toBe(3)
    expect(minRow).toBe(2)
    expect(minCol).toBe(1)
    expect(maxRow).toBe(4)
    expect(maxCol).toBe(3)
})

test("checkDiag2", () => {
    //arrange
    let board = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, 1   , null, null],
        [null, null, null, null, null, null, null],
        [null, null, 1   , null, null, null, null],
        [null, 1   , null, null, null, null, null],
    ]
    let solver = new basicSolver(board, 1)

    //act
    let [count, minRow, minCol, maxRow, maxCol] = solver.checkDiag2(3, 3, 1)

    //assert
    expect(count).toBe(3)
    expect(minRow).toBe(2)
    expect(minCol).toBe(1)
    expect(maxRow).toBe(5)
    expect(maxCol).toBe(4)
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

test("not3with2Attacks-diag", () => {
    //arrange
    let board = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, 2   , 1   , null],
        [null, null, null, 2   , 1   , 2   , null],
        [null, null, null, 1   , 1   , 2   , null],
        [null, null, 1   , 2   , 1   , 2   , null],
    ]
    let solver = new basicSolver(board, 1)

    //act
    let result = solver.not3with2Attacks()

    //assert
    expect(result).toBeTruthy()
    expect(board[4][2]).toBe(1)
})

