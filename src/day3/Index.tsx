import { Fragment, useState } from "react"
import List from "../components/List"
import ListItem from "../components/ListItem"
import { RucksackGroupType, RucksackType } from "../types"
import useInput from "../utils/hooks/useInput"
import inputtxt from "./input.txt"
import resolution from "./resolution"

function Index() {
  const [activePart, setActivePart] = useState(1)
  const [resultPart1, resultPart2, part1List, part2List] =
    useInput(resolution, inputtxt) ?? []

  const partBool = activePart === 1 ? 2 : 1
  const list = activePart === 1 ? part1List : part2List

  return resultPart1 && resultPart2 && part1List && part2List ? (
    <>
      <div className="flex gap-4 items-center">
        <p>
          Showing results for <strong>part {activePart}</strong>. Priorities
          sum: <strong>{activePart === 1 ? resultPart1 : resultPart2}</strong>
        </p>
        <button
          onClick={() => setActivePart(partBool)}
          className="bg-slate-300 px-2 rounded-md py-1"
        >
          show part {partBool}
        </button>
      </div>
      <List<RucksackType | RucksackGroupType>
        list={list}
        renderer={(item, idx) => (
          <Fragment key={idx}>
            <ListItem item={item} />
          </Fragment>
        )}
        itemsPerPage={10}
      />
    </>
  ) : (
    <></>
  )
}

export default Index
