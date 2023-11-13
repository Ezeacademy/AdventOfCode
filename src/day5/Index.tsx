import { useEffect, useState } from "react"
import Stacks from "../components/Stacks"
import StacksModal from "../components/StacksModal"
import useInput from "../utils/hooks/useInput"
import inputtxt from "./input.txt"
import resolution from "./resolution"

export default function Day5() {
  const [isOpen, setIsOpen] = useState(false)
  const [slideIdx, setSlideIdx] = useState(0)
  const [activePart, setActivePart] = useState(1)

  const [
    cratesOnTopPart1,
    cratesOnTopPart2,
    initialStacks,
    historyPart1,
    historyPart2,
  ] = useInput(resolution, inputtxt) ?? []

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft" && slideIdx > 0 && isOpen) {
        setSlideIdx(slideIdx - 1)
      }

      if (
        e.key === "ArrowRight" &&
        slideIdx < historyPart1.length - 2 &&
        isOpen
      ) {
        setSlideIdx(slideIdx + 1)
      }
    }

    if (historyPart1) document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  })

  return cratesOnTopPart1 &&
    cratesOnTopPart2 &&
    initialStacks &&
    historyPart1 &&
    historyPart2 ? (
    <div>
      <p>
        The crates on top of each stack for part 1 are {cratesOnTopPart1}, and
        for part 2 {cratesOnTopPart2}
      </p>
      <div className="flex items-center mt-4 flex-col">
        <p className="">Original stack</p>
        <Stacks stacks={initialStacks} columns={9} />
      </div>
      <div className="flex justify-around mt-4">
        <div className="flex gap-x-2 items-center">
          <div>
            <p className="flex justify-center">Final stack part 1</p>
            <Stacks
              stacks={historyPart1[historyPart1.length - 1]}
              columns={9}
            />
          </div>
          <button
            className="border-2 drop-shadow-md px-2 py-1 rounded-md bg-zinc-200 text-sm border-red-300"
            onClick={() => {
              setIsOpen(true)
              setActivePart(1)
            }}
          >
            View history
          </button>
        </div>
        <div className="flex gap-x-2 items-center">
          <button
            className="border-2 drop-shadow-md px-2 py-1 rounded-md bg-zinc-200 text-sm border-red-300"
            onClick={() => {
              setIsOpen(true)
              setActivePart(2)
            }}
          >
            View history
          </button>
          <div>
            <p className="flex justify-center">Final stack part 2</p>
            <Stacks
              stacks={historyPart2[historyPart2.length - 1]}
              columns={9}
            />
          </div>
        </div>
      </div>
      <StacksModal
        activePart={activePart === 1 ? historyPart1 : historyPart2}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        slideIdx={slideIdx}
        setSlideIdx={setSlideIdx}
      />
    </div>
  ) : (
    <></>
  )
}
