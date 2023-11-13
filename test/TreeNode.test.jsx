import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, vi } from "vitest"
import TreeFile from "../src/components/TreeFile"
import TreeNode from "../src/components/TreeNode"
import { Directory, File } from "../src/day7/resolution"

let directory = new Directory("myDirectory", 1954)
let childDir1 = new Directory("childDir1", 1485, directory)
let childFile1 = new File("childFile1", 234, directory)
let childFile2 = new File("childFile2", 235, directory)
directory.children.push(childDir1, childFile1, childFile2)

let hideSize = {
  dir: false,
  file: false,
}

describe("When TreeNode renders", () => {
  beforeEach(() => {
    hideSize.dir = false
  })

  it("should display the item name if it's a directory", () => {
    render(
      <TreeNode
        item={directory}
        level={0}
        hideSize={hideSize}
        isShowingPart1={true}
      />
    )
    expect(screen.getByText("myDirectory")).toBeInTheDocument()
    expect(screen.getByText("myDirectory")).not.toHaveClass("hidden")
  })

  it("should display the directory size if hideSize.dir is false", () => {
    render(
      <TreeNode
        item={directory}
        level={0}
        hideSize={hideSize}
        isShowingPart1={true}
      />
    )

    expect(hideSize.dir).toEqual(false)
    expect(screen.getByText("(1954)")).toBeInTheDocument()
    expect(screen.getByText("(1954)")).not.toHaveClass("hidden")
  })

  it("shouldn't display the directory size if hideSize.dir is true", () => {
    hideSize.dir = true

    render(
      <TreeNode
        item={directory}
        level={0}
        hideSize={hideSize}
        isShowingPart1={true}
      />
    )

    expect(hideSize.dir).toEqual(true)
    expect(screen.getByText("(1954)")).toBeInTheDocument()
    expect(screen.getByText("(1954)")).toHaveClass("hidden")
  })
})

describe("When TreeNode is passed a directory with children", () => {
  it("should render all children", () => {
    render(
      <TreeNode
        item={directory}
        level={0}
        hideSize={hideSize}
        isShowingPart1={true}
      />
    )

    expect(directory.hasChildren()).toEqual(true)
    expect(screen.getByTestId("childDir1")).toContainElement(
      screen.getByText("childDir1")
    )
    expect(screen.getByTestId("childFile1")).toContainElement(
      screen.getByText("childFile1")
    )
    expect(screen.getByTestId("childFile2")).toContainElement(
      screen.getByText("childFile2")
    )
  })

  it("should hide children when clicking the collapse button", async () => {
    const user = userEvent.setup()
    render(
      <TreeNode
        item={directory}
        level={0}
        hideSize={hideSize}
        isShowingPart1={true}
      />
    )

    await user.click(screen.getByTestId("myDirectory-btn"))

    screen.debug()
    expect(screen.getByTestId("myDirectory-childrenWrapper")).not.toBeVisible()
  })
})
