import { Enano } from "../types"

export default function solution(input: string): [Enano[], string[], number] {
  let enanos: Enano[] = []
  let currCollected: number[] = []
  let enanIndex = 0
  let bestEnanos: [acc: number, name: string][] = []
  let maxCollected: number[] = []

  const enanCalories = input.split("\n")
  console.log(enanCalories)

  enanCalories.reduce((acc: number, curr: number | string) => {
    if (curr === "") {
      let name = `enano${enanIndex + 1}`

      enanos.push({
        name,
        collected: currCollected,
        total: acc,
      })

      if (enanos.length <= 3) {
        bestEnanos.push([acc, name])
        maxCollected.push(acc)
      } else if (enanos.length > 3 && acc > Math.min(...maxCollected)) {
        bestEnanos.sort((a, b) => b[0] - a[0])
        bestEnanos.pop()
        bestEnanos.push([acc, name])
        maxCollected = bestEnanos.map((enano) => enano[0])
      }

      currCollected = []
      enanIndex++
      return 0
    }
    curr = Number(curr)
    currCollected.push(curr)
    return acc + curr
  }, 0)

  console.log(maxCollected)

  const bestEnanosTotal = maxCollected.reduce((acc, curr) => acc + curr)
  const bestEnanosNames = bestEnanos.map((enano) => enano[1])

  return [enanos, bestEnanosNames, bestEnanosTotal]
}
