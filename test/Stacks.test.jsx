import { render, screen } from "@testing-library/react"
import { beforeEach, describe } from "vitest"
import Stacks from "../src/components/Stacks"

const stacksProp = {
  stack1: ["a", "b", "c"],
  stack2: ["d", "e"],
}

describe("When Stacks.tsx renders", () => {
  beforeEach(() => {
    render(<Stacks stacks={stacksProp} />)
  })

  it("should render each stack in its own div", () => {
    const stacks = screen.getAllByTestId(/^stack\d+$/)
    expect(stacks.length).toEqual(2)
    stacks.forEach((stack) => expect(stack.tagName).toEqual("DIV"))
    expect(stacks[0].childElementCount).toEqual(3)
    expect(stacks[1].childElementCount).toEqual(2)
  })

  it("should render each box of the stack in its own div", () => {
    const boxes = screen.getAllByTestId(/box.+/)
    boxes.forEach((box) => expect(box.tagName).toEqual("DIV"))
  })

  it("should render the boxes for each stack in reverse order", () => {
    const boxes = screen.getAllByTestId(/box.+/)
    const boxesArr = boxes.map((box) => box.textContent)
    expect(boxesArr).toEqual(["c", "b", "a", "e", "d"])
  })
})

describe("When Stacks.tsx is passed the optional columns prop", () => {
  it("should render a footer div that enumerates the columns", () => {
    render(<Stacks stacks={stacksProp} columns={2} />)
    const footer = screen.getByTestId("enumerateFooter")
    expect(footer).toBeInTheDocument()
    expect(footer.tagName).toEqual("DIV")

    const numbers = screen.getAllByTestId(/stackNumber.+/)
    expect(numbers.length).toEqual(2)
    expect(numbers[0].textContent).toEqual("1")
    expect(numbers[1].textContent).toEqual("2")
  })
})

const stacksPropWithEmptyStack = {
  stacks1: ["a", "b"],
  stacks2: [],
}

describe("When one of the stacks passed to Stacks.tsx is empty", () => {
  beforeEach(() => {
    render(<Stacks stacks={stacksPropWithEmptyStack} columns={2} />)
  })

  it("should display an empty div", () => {
    const stacks = screen.getAllByTestId(/^stack\d+$/)
    // screen.debug()
    expect(stacks.length).toEqual(2)
    expect(stacks[0].childElementCount).toEqual(2)
    expect(stacks[1].childElementCount).toEqual(1)

    const emptyDiv = screen.getByTestId("emptyStack")
    expect(stacks[1]).toContainElement(emptyDiv)
    expect(emptyDiv.childElementCount).toEqual(0)
  })

  it("should be an empty div that shares a class with the non-empty divs to mantain the same width even when empty", () => {
    const emptyDiv = screen.getByTestId("emptyStack")
    const nonEmptyStackBox = screen.getByTestId("stack1").firstChild
    expect(emptyDiv.className).toMatch(/min-w-/)
    expect(nonEmptyStackBox).toHaveClass(emptyDiv.className)
  })

  it("should still render 2 numbers in the footer, even if one of the columns is empty", () => {
    expect(screen.getByTestId("enumerateFooter").childElementCount).toEqual(2)
    expect(screen.getByTestId("stackNumber1")).toBeInTheDocument()
    expect(screen.getByTestId("stackNumber2")).toBeInTheDocument()
  })
})
