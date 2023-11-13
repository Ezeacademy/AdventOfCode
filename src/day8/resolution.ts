import { Grid } from "../types"

export default function resolution(
  input: string
): [number, number, Grid, number, number] {
  const lines = input.split("\n")
  const grid: Grid = []
  const width = lines[0].length
  const height = lines.length
  let visibleTrees = (width + height) * 2 - 4
  let higherScenicScore = 1

  lines.forEach((line, idx) => {
    grid.push([])
    for (const num of line) {
      grid[idx].push(Number(num))
    }
  })

  function solveDay(
    posY: number,
    posX: number,
    grid: Grid,
    gridWidth: number,
    gridHeight: number
  ): [boolean, number] {
    let left = posX - 1
    let right = posX + 1
    let up = posY - 1
    let down = posY + 1

    let tempScore = 0
    let totalScore = 1
    let isVisible = false

    while (left >= 0) {
      tempScore += 1
      if (grid[posY][left] >= grid[posY][posX]) break
      if (left === 0) isVisible = true
      left--
    }
    totalScore *= tempScore
    tempScore = 0

    while (right < gridWidth) {
      tempScore += 1
      if (grid[posY][right] >= grid[posY][posX]) break
      if (right === gridWidth - 1 && !isVisible) isVisible = true
      right++
    }
    totalScore *= tempScore
    tempScore = 0

    while (up >= 0) {
      tempScore += 1
      if (grid[up][posX] >= grid[posY][posX]) break
      if (up === 0 && !isVisible) isVisible = true
      up--
    }
    totalScore *= tempScore
    tempScore = 0

    while (down < gridHeight) {
      tempScore += 1
      if (grid[down][posX] >= grid[posY][posX]) break
      if (down === gridHeight - 1 && !isVisible) isVisible = true
      down++
    }
    totalScore *= tempScore

    return [isVisible, totalScore]
  }

  for (let rowIdx = 1; rowIdx < height - 1; rowIdx++) {
    let colIdx = 1
    for (; colIdx < width - 1; colIdx++) {
      const [isVisible, scenicScore] = solveDay(
        rowIdx,
        colIdx,
        grid,
        width,
        height
      )
      if (isVisible) visibleTrees++
      if (scenicScore > higherScenicScore) higherScenicScore = scenicScore
    }
  }

  return [visibleTrees, higherScenicScore, grid, width, height]
}
