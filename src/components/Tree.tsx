import { useState } from "react"
import { Directory } from "../day7/resolution"
import TreeNode from "./TreeNode"

export default function Tree({
  root,
  isShowingPart1,
}: {
  root: Directory
  isShowingPart1: boolean
}) {
  const [hideSize, setHideSize] = useState({ dir: true, file: true })

  return (
    <>
      <div className="flex items-center gap-4 mb-2">
        <div className="flex items-center">
          <input
            id="dirsCheckbox"
            type="checkbox"
            className="mr-2 text-red-300 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-0"
            onChange={() => setHideSize({ ...hideSize, dir: !hideSize.dir })}
          />
          <label htmlFor="dirsCheckbox" className="text-sm">
            Show directories sizes
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="filesCheckbox"
            type="checkbox"
            className="mr-2 text-red-300 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-0"
            onChange={() => setHideSize({ ...hideSize, file: !hideSize.file })}
          />
          <label htmlFor="filesCheckbox" className="text-sm">
            Show files sizes
          </label>
        </div>
      </div>
      <TreeNode
        item={root}
        level={0}
        hideSize={hideSize}
        isShowingPart1={isShowingPart1}
      />
    </>
  )
}
