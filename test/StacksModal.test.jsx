import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, mockClear, vi } from "vitest"
import StacksModal from "../src/components/StacksModal"

const activePart = [
  {
    stack1: ["a", "b", "c"],
    stack2: ["d", "e"],
  },
  {
    stack1: ["a", "b"],
    stack2: ["d", "e", "c"],
    mov: ["1", "stack1", "stack2"],
  },
  {
    stack1: [],
    stack2: ["d", "e", "c", "b", "a"],
    mov: ["2", "stack1", "stack2"],
  },
]

let isOpen = true
const setIsOpen = vi.fn(() => {
  isOpen = !isOpen
})

let slideIdx = 0
const setSlideIdx = vi.fn((newValue) => {
  slideIdx = newValue
})

describe("When StacksModal.tsx renders", () => {
  beforeEach(() => {
    isOpen = true
    slideIdx = 0
    setSlideIdx.mockClear()
  })

  it("should be hidden when isOpen is false", () => {
    isOpen = false
    render(
      <StacksModal
        activePart={activePart}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        slideIdx={slideIdx}
        setSlideIdx={setSlideIdx}
      />
    )
    expect(screen.getByTestId("modal")).toHaveClass("hidden")
  })

  it("shouldn't be hidden when isOpen is true", () => {
    render(
      <StacksModal
        activePart={activePart}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        slideIdx={slideIdx}
        setSlideIdx={setSlideIdx}
      />
    )

    expect(screen.getByTestId("modal")).not.toHaveClass("hidden")
  })

  it("should display a button in the header to close the modal", async () => {
    const user = userEvent.setup()
    const { rerender } = render(
      <StacksModal
        activePart={activePart}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        slideIdx={slideIdx}
        setSlideIdx={setSlideIdx}
      />
    )

    const closeButton = screen
      .getByTestId("modalHeader")
      .querySelector("button")

    await user.click(closeButton)
    expect(isOpen).toEqual(false)
    expect(setIsOpen).toHaveBeenCalledTimes(1)
    expect(setIsOpen).toHaveBeenCalledWith(false)

    rerender(
      <StacksModal
        activePart={activePart}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        slideIdx={slideIdx}
        setSlideIdx={setSlideIdx}
      />
    )

    expect(screen.getByTestId("modal")).toHaveClass("hidden")
  })

  it("should display prev and next buttons", () => {
    render(
      <StacksModal
        activePart={activePart}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        slideIdx={slideIdx}
        setSlideIdx={setSlideIdx}
      />
    )

    const modalBody = screen.getByTestId("modalBody")
    expect(modalBody).toContainElement(screen.getByTestId("prevButton"))
    expect(modalBody).toContainElement(screen.getByTestId("nextButton"))
  })

  it("should disable prev button if slideIdx is 0", () => {
    render(
      <StacksModal
        activePart={activePart}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        slideIdx={slideIdx}
        setSlideIdx={setSlideIdx}
      />
    )
    expect(slideIdx).toEqual(0)
    expect(screen.getByTestId("prevButton")).toBeDisabled()
  })

  it("should disable next button if slideIdx is activePart.length - 2", () => {
    slideIdx = activePart.length - 2

    render(
      <StacksModal
        activePart={activePart}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        slideIdx={slideIdx}
        setSlideIdx={setSlideIdx}
      />
    )

    expect(screen.getByTestId("nextButton")).toBeDisabled()
  })

  it("should call setSlideIdx with slideidx + 1 when clicking the next button", async () => {
    const user = userEvent.setup()

    render(
      <StacksModal
        activePart={activePart}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        slideIdx={slideIdx}
        setSlideIdx={setSlideIdx}
      />
    )

    expect(slideIdx).toEqual(0)
    await user.click(screen.getByTestId("nextButton"))
    expect(setSlideIdx).toHaveBeenCalledTimes(1)
    expect(setSlideIdx).toHaveBeenCalledWith(1)
    expect(slideIdx).toEqual(1)
  })

  it("should call setSlideIdx with slideidx - 1 when clicking the prev button", async () => {
    const user = userEvent.setup()
    slideIdx = 1

    render(
      <StacksModal
        activePart={activePart}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        slideIdx={slideIdx}
        setSlideIdx={setSlideIdx}
      />
    )

    expect(slideIdx).toEqual(1)
    await user.click(screen.getByTestId("prevButton"))
    expect(setSlideIdx).toHaveBeenCalledTimes(1)
    expect(setSlideIdx).toHaveBeenCalledWith(0)
    expect(slideIdx).toEqual(0)
  })
})

describe("When it receives a certain slideIdx prop", () => {
  it("should render the first two stacks when slideIdx is 0", () => {
    render(
      <StacksModal
        activePart={activePart}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        slideIdx={slideIdx}
        setSlideIdx={setSlideIdx}
      />
    )

    // screen.debug()

    expect(slideIdx).toEqual(0)
    const [leftStack, rightStack] = screen.getAllByTestId("stacksWrapper")

    expect(leftStack).toContainElement(screen.getByTestId("box02"))
    expect(leftStack).not.toContainElement(screen.queryByTestId("box12"))

    expect(rightStack).not.toContainElement(screen.queryByTestId("box02"))
    expect(rightStack).toContainElement(screen.getByTestId("box12"))
  })

  it("shows the second and third stacks when clicking the next button", async () => {
    const user = userEvent.setup()
    const { rerender } = render(
      <StacksModal
        activePart={activePart}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        slideIdx={slideIdx}
        setSlideIdx={setSlideIdx}
      />
    )

    expect(slideIdx).toEqual(0)
    await user.click(screen.getByTestId("nextButton"))
    expect(slideIdx).toEqual(1)

    rerender(
      <StacksModal
        activePart={activePart}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        slideIdx={slideIdx}
        setSlideIdx={setSlideIdx}
      />
    )

    const [leftStack, rightStack] = screen.getAllByTestId("stacksWrapper")
    expect(rightStack).not.toContainElement(screen.queryByTestId("box00"))
    expect(rightStack).toContainElement(screen.getByTestId("box14"))
  })

  it("shows the first and two stacks when clicking the prev button when it's showing the second and third stacks", async () => {
    slideIdx = 1
    const user = userEvent.setup()
    const { rerender } = render(
      <StacksModal
        activePart={activePart}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        slideIdx={slideIdx}
        setSlideIdx={setSlideIdx}
      />
    )

    expect(slideIdx).toEqual(1)
    await user.click(screen.getByTestId("prevButton"))
    expect(slideIdx).toEqual(0)

    rerender(
      <StacksModal
        activePart={activePart}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        slideIdx={slideIdx}
        setSlideIdx={setSlideIdx}
      />
    )

    const [leftStack, rightStack] = screen.getAllByTestId("stacksWrapper")
    expect(rightStack).toContainElement(screen.getByTestId("box12"))
    expect(rightStack).not.toContainElement(screen.queryByTestId("box14"))
  })
})
