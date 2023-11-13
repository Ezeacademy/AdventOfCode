import { RoundType } from "../types"

export default function solution(
  input: string
): [number, number, RoundType[], RoundType[]] {
  const rounds = input.split("\n")

  let myScorePart1 = 0
  let myScorePart2 = 0

  const pickValue: Record<string, 1 | 2 | 3> = {
    A: 1,
    B: 2,
    C: 3,
    X: 1,
    Y: 2,
    Z: 3,
  }

  const handValues: Record<string, 0 | 3 | 6> = {
    XA: 3,
    YA: 6,
    ZA: 0,
    XB: 0,
    YB: 3,
    ZB: 6,
    XC: 6,
    YC: 0,
    ZC: 3,
  }

  const handPickPart2: Record<string, "A" | "B" | "C"> = {
    AX: "C",
    BX: "A",
    CX: "B",
    AY: "A",
    BY: "B",
    CY: "C",
    AZ: "B",
    BZ: "C",
    CZ: "A",
  }

  const handResultValue: Record<string, 0 | 3 | 6> = {
    X: 0,
    Y: 3,
    Z: 6,
  }

  class Round {
    enanoPick: RoundType["enanoPick"]
    myPick: RoundType["myPick"]
    handResult: RoundType["handResult"]

    constructor(enanoPick: string, myPick: string, handResult: 0 | 3 | 6) {
      this.enanoPick =
        enanoPick === "A" ? "Rock" : enanoPick === "B" ? "Paper" : "Scissors"
      this.myPick =
        myPick === "A" || myPick === "X"
          ? "Rock"
          : myPick === "B" || myPick === "Y"
          ? "Paper"
          : "Scissors"
      this.handResult =
        handResult === 0 ? "Enano wins." : handResult === 3 ? "Draw." : "I win."
    }
  }

  let part1Rounds: RoundType[] = []
  let part2Rounds: RoundType[] = []

  rounds.forEach((round) => {
    const col1 = round[0]
    const col2 = round[2]
    const handResult = handValues[col2 + col1]
    myScorePart1 += pickValue[col2] + handResult
    part1Rounds.push(new Round(col1, col2, handResult))

    // my hand pick for part2 is not col2 anymore
    const myHandPick = handPickPart2[col1 + col2]
    const handResult2 = handResultValue[col2]
    myScorePart2 += pickValue[myHandPick] + handResult2
    part2Rounds.push(new Round(col1, myHandPick, handResult2))
  })

  return [myScorePart1, myScorePart2, part1Rounds, part2Rounds]
}
