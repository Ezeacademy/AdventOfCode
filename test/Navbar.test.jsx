import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe } from "vitest"
import Navbar from "../src/components/Navbar"

function isExpectedArray(arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i].textContent !== arr2[i]) return false
  }
  return true
}

describe("When the navbar renders", () => {
  beforeEach(() => {
    render(<Navbar activeDay={3} setActiveDay={() => null} />)
  })

  it("should render 26 buttons", () => {
    const buttons = screen.getAllByRole("button")
    expect(buttons.length).toEqual(26)
  })

  it("should display button 'Home' and a list from 1 to 25", () => {
    let expectedArray = [...Array(26)].map((el, idx) => (el = String(idx)))
    expectedArray[0] = "Home"
    const buttons = screen.getAllByRole("button")
    expect(isExpectedArray(buttons, expectedArray)).toBe(true)
  })

  it("should highlight the active day", () => {
    const day3 = screen.getByText("3")
    expect(day3).toHaveClass("bg-red-300")
    expect(day3).not.toHaveClass("bg-slate-300")
  })
  it("shouldn't highlight inactive days", () => {
    let days = screen.getAllByRole("button")
    let inactiveDays = days.filter((day) => day.textContent !== "3")
    inactiveDays.forEach((day) => {
      expect(day).not.toHaveClass("bg-red-300")
      expect(day).toHaveClass("bg-slate-300")
    })
  })
})

describe("When a setActiveDay function prop is passed", () => {
  it("should attach a click handler to each button that passes the button index to the setActiveDay function", async () => {
    let currDay
    function setDay(item) {
      currDay = item
    }

    const user = userEvent.setup()
    render(<Navbar activeDay={3} setActiveDay={setDay} />)

    const day5 = screen.getByText("5")
    const home = screen.getByText("Home")

    await user.click(day5)
    expect(currDay).toEqual(5)

    await user.click(home)
    expect(currDay).toEqual(0)
  })
})
