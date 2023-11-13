import { readFileSync } from "fs"

function resolutionPath(number) {
  return `../src/day${number}/resolution`
}

export async function getDayResolution(dayNumber) {
  try {
    const { default: resolution } = await import(resolutionPath(dayNumber))

    const input = readFileSync(`src/day${dayNumber}/input.txt`, {
      encoding: "utf-8",
      flag: "r",
    })
    return resolution(input)
  } catch (error) {
    console.error(error)
  }
}
