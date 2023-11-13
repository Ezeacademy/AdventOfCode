import { useState } from "react"
import Loading from "../components/Loading"
import Tree from "../components/Tree"
import useInput from "../utils/hooks/useInput"
import inputtxt from "./input.txt"
import resolution from "./resolution"

export default function Day7() {
  const [part1Result, part2Result, fileSystem] =
    useInput(resolution, inputtxt) ?? []

  const [isShowingPart1, setIsShowingPart1] = useState(true)

  return part1Result && part2Result ? (
    <div>
      <p className="mb-1 font-bold">
        {isShowingPart1
          ? `The sum of the sizes directories of size at most 100000 is: ${part1Result}`
          : `The smallest directory that can be deleted so the system can update has size: ${part2Result}`}
      </p>
      <p className="mb-4 italic">
        *Files can be counted more than once when calculating directories sizes.
      </p>
      <button
        onClick={() => setIsShowingPart1(!isShowingPart1)}
        className="bg-slate-300 px-2 rounded-md py-1 flex mb-4"
      >
        show part {isShowingPart1 ? "2" : "1"}
      </button>
      <Tree root={fileSystem.root} isShowingPart1={isShowingPart1} />
    </div>
  ) : (
    <Loading />
  )
}
