import { position6 } from "../position6"

test("CanPlay", () => {
    let position = new position6([])
    for(let r = 0; r < 5; r++)
        for(let c = 0; c < 7; c++) {
            position.height[c] = BigInt(r)
            expect(position.canPlay(c)).toBeTruthy()
        }
    for(let c = 0; c < 7; c++) {
        position.height[c] = BigInt(5)
        expect(position.canPlay(c)).toBeFalsy()
    }
})

test("Play", () => {
    let position = new position6([])
    position.play(0)
    expect(position.bitboard[0].toString(2)).toBe("1")
    position.play(0)
    expect(position.bitboard[1].toString(2)).toBe("10")
    position.play(0)
    expect(position.bitboard[0].toString(2)).toBe("101")
    position.play(0)
    expect(position.bitboard[1].toString(2)).toBe("1010")

    position = new position6([])
    position.play(1)
    expect(position.bitboard[0].toString(2)).toBe("10000000")
    position.play(1)
    expect(position.bitboard[1].toString(2)).toBe("100000000")
})

test("Unplay", () => {
    let position = new position6([])
    position.play(0)
    expect(position.bitboard[0].toString(2)).toBe("1")
    position.unplay(0)
    expect(position.bitboard[0].toString(2)).toBe("0")
    position.play(1)
    expect(position.bitboard[0].toString(2)).toBe("10000000")
    position.unplay(1)
    expect(position.bitboard[0].toString(2)).toBe("0")

    for(let i = 0; i < 3; i++)
        position.play(0)
    
    expect(position.bitboard[0].toString(2)).toBe("101")
    expect(position.bitboard[1].toString(2)).toBe("10")
    position.unplay(0)
    expect(position.bitboard[0].toString(2)).toBe("1")
    expect(position.bitboard[1].toString(2)).toBe("10")
    position.unplay(0)
    expect(position.bitboard[0].toString(2)).toBe("1")
    expect(position.bitboard[1].toString(2)).toBe("0")
})

test("isWinningMove-horizontal", () => {
    let position = new position6([])
    let l = position.playSequence("334323") //col: 223213
    /*
    .......
    .......
    .......
    ..2....
    ..22...
    .111...
    */
    expect(l).toBe(6)

    let result = position.isWinningMove(0)
    expect(result).toBeTruthy()
    result = position.isWinningMove(4)
    expect(result).toBeTruthy()
    result = position.isWinningMove(5)
    expect(result).toBeFalsy()
    result = position.isWinningMove(6)
    expect(result).toBeFalsy()
})

test("isWinningMove-diag1", () => {
    let position = new position6([])
    let l = position.playSequence("5443354556") //col: 4332243445
    /*
    .......
    .......
    ....1..
    ...12..
    ..112..
    ..2212.
    */
    expect(l).toBe(10)

    let result = position.isWinningMove(1)
    expect(result).toBeTruthy()
})
