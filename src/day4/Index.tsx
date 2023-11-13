import { useState } from "react"
import List from "../components/List"
import { RangesLine } from "../types"
import useInput from "../utils/hooks/useInput"
import inputtxt from "./input.txt"
import resolution from "./resolution"

export default function Index() {
  const [isPart1, setIsPart1] = useState(true)
  const [resultPart1, resultPart2, rangesLines] =
    useInput(resolution, inputtxt) ?? []

  let list = [] as RangesLine[]
  if (rangesLines) {
    list = isPart1
      ? rangesLines.filter((line) => line.contains)
      : rangesLines.filter((line) => line.intersects)
  }

  const equalColor = "text-pink-500"
  const containsColor = "text-blue-500"
  const intersectsColor = "text-purple-500"

  function renderer(line: RangesLine, idx: number) {
    let textColor = line.areEqual
      ? equalColor
      : line.contains
      ? containsColor
      : line.intersects
      ? intersectsColor
      : ""

    let annotation = ""

    if (line.areEqual) {
      annotation = "they are the same range"
    }

    if (!line.areEqual && line.contains) {
      annotation =
        line.containsDetails === "R2ContainsR1"
          ? `[${line.ranges[1]}] contains [${line.ranges[0]}]`
          : `[${line.ranges[0]}] contains [${line.ranges[1]}]`
    }
    if (!line.contains && line.intersects) {
      annotation =
        (("intersection range is [" + line.intersection) as string) + "]"
    }

    return (
      <p key={idx}>
        <span className={`${textColor} font-bold`}>
          {line.ranges.join(",")}
        </span>{" "}
        {annotation && " => " + annotation}
      </p>
    )
  }

  return resultPart1 && resultPart2 && rangesLines.length ? (
    <>
      <div className="flex flex-col gap-4 items-start">
        <p>
          <span className={`${equalColor} font-bold`}>Pink</span> means the
          dwarves were assigned the{" "}
          <span className={`${equalColor} font-bold`}>same</span> sectors.
          <br />
          <span className={`${containsColor} font-bold`}>Blue</span> means one
          dwarf has <span className={`${containsColor} font-bold`}>all</span>{" "}
          the sectors the other dwarf has.
          <br />
          <span className={`${intersectsColor} font-bold`}>Purple</span> means
          the dwarves have{" "}
          <span className={`${intersectsColor} font-bold`}>some</span> sectors
          in common.
        </p>
        <div>
          {isPart1
            ? `There are ${resultPart1} pairs where one contains the other`
            : `There are ${resultPart2} pairs that intersect`}
        </div>
        <button
          onClick={() => setIsPart1(!isPart1)}
          className="bg-slate-300 px-2 rounded-md py-1 flex"
        >
          {isPart1 ? "show part 2" : "show part 1"}
        </button>
      </div>

      <List list={list} renderer={renderer} itemsPerPage={50} />
    </>
  ) : (
    <></>
  )
}
