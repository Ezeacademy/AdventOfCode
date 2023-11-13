import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe } from "vitest"
import ListItem from "../src/components/ListItem"

const validObject = {
  name: "sam",
  age: 32,
  favoriteNumbers: [7, 17, 34],
  favoriteColors: ["pink", "black", "teal"],
  stringsAndNumbers: ["jeje", 100],
}

const invalidObject = {
  name: "matias",
  info: {
    street: "calle falsa 123",
    status: "single",
  },
}

describe("When ListItem.jsx is rendered", () => {
  it("should receive and display an objet's key: value pairs as long as they are of type string, number or array of them", () => {
    render(<ListItem item={validObject} />)
    const paragraphs = screen.getAllByText((content) => {
      const toMatch = [
        "sam",
        "32",
        "7, 17, 34",
        "pink, black, teal",
        "jeje, 100",
      ]
      return toMatch.includes(content)
    })

    expect(paragraphs.length).toEqual(5)
    expect(paragraphs[0].textContent).toEqual("name: sam")
    expect(paragraphs[1].textContent).toEqual("age: 32")
    expect(paragraphs[2].textContent).toEqual("favoriteNumbers: 7, 17, 34")
    expect(paragraphs[3].textContent).toEqual(
      "favoriteColors: pink, black, teal"
    )
    expect(paragraphs[4].textContent).toEqual("stringsAndNumbers: jeje, 100")
  })

  it("should show keys in bold font", () => {
    render(<ListItem item={validObject} />)
    const keys = screen.getAllByText((content) => {
      const toMatch = [
        "name:",
        "age:",
        "favoriteNumbers:",
        "favoriteColors:",
        "stringsAndNumbers:",
      ]
      return toMatch.includes(content)
    })
    keys.forEach((key) => expect(key).toHaveClass("font-bold"))
  })

  it("should apply classes to the wrapping div when passed by the classes prop", () => {
    const { container } = render(
      <ListItem item={validObject} classes={"lorem ipsum"} />
    )
    expect(container.firstChild).toHaveClass("lorem ipsum")
  })

  it("shouldn't display objects with object values", () => {
    expect(() => render(<ListItem item={invalidObject} />)).toThrow(
      "Objects are not valid as a React child (found: object with keys {street, status}). If you meant to render a collection of children, use an array instead."
    )
  })
})
