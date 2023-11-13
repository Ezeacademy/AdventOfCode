import { RucksackGroupType, RucksackType } from "../types"

export default function resolution(
  input: string
): [number, number, RucksackType[], RucksackGroupType[]] {
  function getCharValue(char: string) {
    return char.toUpperCase() === char
      ? char.charCodeAt(0) - 38
      : char.charCodeAt(0) - 96
  }

  const lines = input.split("\n")
  let repeatedItem: string[] = []
  let currRucksuckGroup: string[] = []
  let groupNumber = 1

  class Rucksack {
    rucksack: RucksackType["rucksack"]
    misplacedItem: RucksackType["misplacedItem"]
    priority: RucksackType["priority"]

    constructor(rucksack: string, misplacedItem: string, priority: number) {
      ;(this.rucksack = rucksack),
        (this.misplacedItem = misplacedItem),
        (this.priority = priority)
    }
  }

  class RucksacksGroup {
    rucksacks: RucksackGroupType["rucksacks"]
    groupNumber: RucksackGroupType["groupNumber"]
    badge: RucksackGroupType["badge"]
    priority: RucksackGroupType["priority"]

    constructor(
      groupNumber: number,
      rucksucks: string,
      badge: string,
      priority: number
    ) {
      ;(this.groupNumber = groupNumber),
        (this.rucksacks = rucksucks),
        (this.badge = badge),
        (this.priority = priority)
    }
  }

  const total = lines.reduce(
    (acc: [number, number, Rucksack[], RucksacksGroup[]], curr, idx, lines) => {
      const line = Array.from(lines[idx])
      const half = line.length / 2
      const firstHalf = line.slice(0, half)
      const secondHalf = line.slice(half)
      let misplacedItem = ""

      firstHalf.forEach((item) => {
        if (secondHalf.includes(item)) {
          misplacedItem = item
          return
        }
      })

      if (repeatedItem.length) {
        repeatedItem = repeatedItem.filter((item) => line.includes(item))
      } else {
        repeatedItem = line
      }

      const itemPriority = getCharValue(misplacedItem)

      acc[0] += itemPriority

      const currRucksack = new Rucksack(lines[idx], misplacedItem, itemPriority)

      acc[2].push(currRucksack)
      currRucksuckGroup.push(lines[idx])

      if ((idx + 1) % 3 === 0) {
        const repeatedItemPriority = getCharValue(repeatedItem[0])
        acc[1] += repeatedItemPriority

        acc[3].push(
          new RucksacksGroup(
            groupNumber,
            currRucksuckGroup.join(" :: "),
            repeatedItem[0],
            repeatedItemPriority
          )
        )

        repeatedItem = []
        currRucksuckGroup = []
        groupNumber++
      }

      return acc
    },
    [0, 0, [], []]
  )

  return total
}
