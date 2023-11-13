import { render, screen } from "@testing-library/react"
import { beforeEach, describe } from "vitest"
import Moves from "../src/components/Moves"

const moves = ["6", "stack3", "stack2"]

describe("When Moves.tsx renders", () => {
  beforeEach(() => render(<Moves moves={moves} />))

  it("should render the moves from left to right and from right to left", () => {
    expect(screen.getByText("move 6 from stack3 to stack2")).toBeInTheDocument()
    expect(screen.getByText("move 6 from stack2 to stack3")).toBeInTheDocument()
  })

  it("should render and svg as the second element of the moves wrapper", () => {
    expect(screen.getByTestId("movesWrapper").children[1].tagName).toEqual(
      "svg"
    )
  })
})
