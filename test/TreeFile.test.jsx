import { render, screen } from "@testing-library/react"
import { beforeEach, describe } from "vitest"
import TreeFile from "../src/components/TreeFile"

const item = {
  name: "my file",
  size: "1337",
}

let hideSize = {
  dir: false,
  file: false,
}

describe("When TreeFile is rendered", () => {
  beforeEach(() => {
    hideSize.file = false
  })

  it("should display the item name", () => {
    render(<TreeFile item={item} hideSize={hideSize} />)
    expect(screen.getByText("my file")).toBeInTheDocument()
  })

  it("should display the size of the item if hideSize.file is false", () => {
    render(<TreeFile item={item} hideSize={hideSize} />)
    expect(hideSize.file).toEqual(false)
    expect(screen.getByText("(1337)")).toBeInTheDocument()
    expect(screen.getByText("(1337)")).not.toHaveClass("hidden")
  })

  it("shouldn't display the size of the item if hideSize.file is true", () => {
    hideSize.file = true
    render(<TreeFile item={item} hideSize={hideSize} />)
    expect(hideSize.file).toEqual(true)
    expect(screen.getByText("(1337)")).toHaveClass("hidden")
  })
})
