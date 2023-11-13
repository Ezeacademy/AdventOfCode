export default function resolution(
  input: string
): [
  string,
  string,
  { [key: string]: string[] },
  { [key: string]: string[] }[],
  { [key: string]: string[] }[]
] {
  const [stacksInput, movesInput] = input.split("\n\n")
  const stacksLines = stacksInput.split("\n").slice(0, -1)
  const movesLines = movesInput.split("\n")

  let stacks: { [key: string]: string[] } = {}

  function getCratesOnTop(stacks: { [key: string]: string[] }) {
    let result = ""
    for (let i = 1; i <= Object.keys(stacks).length; i++) {
      result += stacks[`stack${i}`].slice(-1)
    }
    return result
  }

  function mutateStacks(
    stacks: { [key: string]: string[] },
    source: string,
    target: string,
    amount: number,
    toMove: string[],
    part: 1 | 2
  ) {
    stacks[source] = stacks[source].slice(0, -amount)
    stacks[target] = [...stacks[target], ...toMove]
    if (part === 1)
      historyPart1.push({ ...stacks, mov: [String(amount), source, target] })
    if (part === 2)
      historyPart2.push({ ...stacks, mov: [String(amount), source, target] })
  }

  stacksLines.forEach((line) => {
    let stackIdx = 1
    let charIdx = 0
    for (const char of line) {
      if (char.match(/[A-Z]/)) {
        const objectKey = `stack${stackIdx}`
        if (!stacks[objectKey]) {
          stacks[objectKey] = [char]
        } else {
          stacks[objectKey] = [char, ...stacks[objectKey]]
        }
      }
      if (charIdx && charIdx % 4 === 0) stackIdx++
      charIdx++
    }
  })

  let stacksPart1 = { ...stacks }
  let stacksPart2 = { ...stacks }
  let historyPart1 = [{ ...stacks }]
  let historyPart2 = [{ ...stacks }]

  movesLines.forEach((line) => {
    const split = line.split(" ")
    const [amount, sourceStack, targetStack] = [
      Number(split[1]),
      `stack${split[3]}`,
      `stack${split[5]}`,
    ]
    let toBeMovedPart1 = stacksPart1[sourceStack].slice(-amount).reverse()
    let toBeMovedPart2 = stacksPart2[sourceStack].slice(-amount)

    mutateStacks(
      stacksPart1,
      sourceStack,
      targetStack,
      amount,
      toBeMovedPart1,
      1
    )
    mutateStacks(
      stacksPart2,
      sourceStack,
      targetStack,
      amount,
      toBeMovedPart2,
      2
    )
  })

  let cratesOnTopPart1 = getCratesOnTop(stacksPart1)
  let cratesOnTopPart2 = getCratesOnTop(stacksPart2)

  return [
    cratesOnTopPart1,
    cratesOnTopPart2,
    stacks,
    historyPart1,
    historyPart2,
  ]
}
