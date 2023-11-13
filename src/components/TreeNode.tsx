import { useState } from "react"
import { Directory } from "../day7/resolution"
import FileSystemIcons from "./FileSystemIcons"
import TreeFile from "./TreeFile"

import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type TreeNodeProps = {
  item: Directory
  level: number
  hideSize: {
    dir: boolean
    file: boolean
  }
  isShowingPart1: boolean
}

export default function TreeNode({
  item,
  level,
  hideSize,
  isShowingPart1,
}: TreeNodeProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const newLevel = level + 1

  return (
    <div
      className={`mb-1 ${level === 0 ? "ml-0" : "ml-6"} ${
        isShowingPart1
          ? item.isPart1 && "text-red-400"
          : item.isPart2 && "text-red-400"
      }`}
      data-testid={item.name}
    >
      <button
        className="mr-2"
        onClick={(e) => {
          e.stopPropagation()
          setIsCollapsed(!isCollapsed)
        }}
        data-testid={item.name + "-btn"}
      >
        {isCollapsed ? (
          <FontAwesomeIcon icon={faPlus} />
        ) : (
          <FontAwesomeIcon icon={faMinus} />
        )}
      </button>
      <FileSystemIcons itemType={isCollapsed ? "directoryOpen" : "directory"} />
      {item.name}
      <div className={`ml-2 text-sm inline-block ${hideSize.dir && "hidden"}`}>
        ({item.size})
      </div>
      <div
        className={`${isCollapsed && "hidden"} HOLACHEAMIGO`}
        data-testid={`${item.name}-childrenWrapper`}
      >
        {item.hasChildren() &&
          item.children.map((child, idx) => {
            return (
              <div key={`${item.name}-${idx}`}>
                {child instanceof Directory ? (
                  <TreeNode
                    key={`${item.name}-${idx}`}
                    item={child}
                    level={newLevel}
                    hideSize={hideSize}
                    isShowingPart1={isShowingPart1}
                  />
                ) : (
                  <TreeFile
                    key={`${item.name}-${idx}`}
                    item={child}
                    hideSize={hideSize}
                  />
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}
