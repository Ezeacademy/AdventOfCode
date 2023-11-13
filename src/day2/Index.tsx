import { Fragment, useState } from "react"
import List from "../components/List"
import ListItem from "../components/ListItem"
import useInput from "../utils/hooks/useInput"
import inputtxt from "./input.txt"
import resolution from "./resolution"

export default function Index() {
  const [activePart, setActivePart] = useState(1)
  const [scorePart1, scorePart2, roundsPart1, roundsPart2] =
    useInput(resolution, inputtxt) ?? []

  const partBool = activePart === 1 ? 2 : 1

  const list = activePart === 1 ? roundsPart1 : roundsPart2

  return scorePart1 && scorePart2 && roundsPart1 && roundsPart2 ? (
    <>
      <div className="flex gap-4 items-center">
        <p>
          Showing results for <strong>part {activePart}</strong>. My score:{" "}
          <strong>{partBool === 1 ? scorePart1 : scorePart2}</strong>
        </p>
        <button
          onClick={() => setActivePart(partBool)}
          className="bg-slate-300 px-2 rounded-md py-1"
        >
          show part {partBool}
        </button>
      </div>
      <List
        list={list}
        itemsPerPage={10}
        renderer={(item, idx) => (
          <Fragment key={idx}>
            <ListItem item={item} />
          </Fragment>
        )}
      />
    </>
  ) : (
    <></>
  )
}
