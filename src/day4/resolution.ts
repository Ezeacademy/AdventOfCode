import { RangesLine } from "../types"

export default function resolution(
  input: string
): [number, number, RangesLine[]] {
  const lines = input.split("\n")
  let resultPart1 = 0
  let resultPart2 = 0
  let rangesLines: RangesLine[] = []

  lines.forEach((l, idx) => {
    let currLine = {} as RangesLine
    const line = l.split(",")
    const range1 = line[0].split("-")
    const range2 = line[1].split("-")
    const A = Number(range1[0])
    const B = Number(range1[1])
    const C = Number(range2[0])
    const D = Number(range2[1])

    currLine["ranges"] = line

    const R2ContainsR1 = A >= C && B <= D
    const R1ContainsR2 = C >= A && D <= B
    if (R2ContainsR1 || R1ContainsR2) {
      resultPart1 += 1
      resultPart2 += 1
      currLine["contains"] = true
      currLine["intersects"] = true

      if (R2ContainsR1 && R1ContainsR2) {
        currLine["areEqual"] = true
      } else {
        currLine["areEqual"] = false
        currLine["containsDetails"] = R2ContainsR1
          ? "R2ContainsR1"
          : "R1ContainsR2"
      }
      rangesLines.push(currLine)
      return
    } else {
      currLine["contains"] = false
      currLine["areEqual"] = false
    }

    const intersec1 = A >= C && A <= D
    const intersec2 = C >= A && C <= B
    if (intersec1 || intersec2) {
      resultPart2 += 1
      currLine["intersects"] = true
      currLine["intersection"] = intersec1 ? `${A}-${D}` : `${C}-${B}`
    } else {
      currLine["intersects"] = false
    }

    rangesLines.push(currLine)
  })

  return [resultPart1, resultPart2, rangesLines]
}
