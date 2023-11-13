import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Fragment } from "react"
import { beforeEach, describe, vi } from "vitest"
import List from "../src/components/List"
import ListItem from "../src/components/ListItem"

const renderer = vi.fn((item, idx) => {
  return <div key={idx}>{item}</div>
})

const filterFn = vi.fn((list) => {
  return list.filter((item) => item !== "item2")
})

const list = ["item1", "item2", "item3"]

describe("When List.jsx renders", () => {
  beforeEach(() => {
    render(<List list={list} renderer={renderer} />)
  })

  it("should render the list it receives using the renderer passed to it", async () => {
    const [item1, item2, item3] = await screen.findAllByText(/item/)
    expect(renderer).toHaveBeenCalled(3)
    expect(item1.textContent).toEqual("item1")
    expect(item2.textContent).toEqual("item2")
    expect(item3.textContent).toEqual("item3")
  })

  it("should pass the item from the list and its index to the renderer", () => {
    expect(renderer).toHaveBeenCalledWith("item1", 0)
    expect(renderer).toHaveBeenCalledWith("item2", 1)
    expect(renderer).toHaveBeenCalledWith("item3", 2)
  })
})

describe("When a filter function is passed to the list", () => {
  it("should display a button to filter the list", async () => {
    const { rerender } = render(<List list={list} renderer={renderer} />)
    expect(await screen.queryByRole("button")).toBeNull()

    rerender(<List list={list} renderer={renderer} filterFn={filterFn} />)
    expect(await screen.queryByRole("button")).toBeInTheDocument()
  })

  it("should call the filter function with the list as argument when the button is clicked", async () => {
    const user = userEvent.setup()
    render(<List list={list} renderer={renderer} filterFn={filterFn} />)
    let item2 = await screen.queryByText("item2")
    expect(item2).toBeInTheDocument()

    const filterButton = await screen.queryByRole("button")
    await user.click(filterButton)
    item2 = await screen.queryByText("item2")
    expect(item2).toBeNull()
    expect(filterFn).toBeCalledWith(list)
  })

  it("should display the default button texts 'filter' / 'clear filter'", async () => {
    const user = userEvent.setup()
    render(<List list={list} renderer={renderer} filterFn={filterFn} />)
    const filterButton = await screen.queryByRole("button")
    expect(filterButton.textContent).toEqual("filter")
    await user.click(filterButton)
    expect(filterButton.textContent).toEqual("clear filter")
  })

  it("should display filterBtnText and 'clear filter' in the filter button if the filterBtnText prop was provided", async () => {
    const user = userEvent.setup()
    render(
      <List
        list={list}
        renderer={renderer}
        filterFn={filterFn}
        filterBtnText={"custom text"}
      />
    )
    const filterButton = await screen.queryByRole("button")
    expect(filterButton.textContent).toEqual("custom text")
    await user.click(filterButton)
    expect(filterButton.textContent).toEqual("clear filter")
  })

  it("should display 'filter' and filterBtnText2 in the filter button if the filterBtnText2 prop was provided", async () => {
    const user = userEvent.setup()
    render(
      <List
        list={list}
        renderer={renderer}
        filterFn={filterFn}
        filterBtnText2={"custom text 2"}
      />
    )
    const filterButton = await screen.queryByRole("button")
    expect(filterButton.textContent).toEqual("filter")
    await user.click(filterButton)
    expect(filterButton.textContent).toEqual("custom text 2")
  })

  it("should display filterBtnText and filterBtnText2 in the filter button if both props were provided", async () => {
    const user = userEvent.setup()
    render(
      <List
        list={list}
        renderer={renderer}
        filterFn={filterFn}
        filterBtnText={"custom text"}
        filterBtnText2={"custom text 2"}
      />
    )
    const filterButton = await screen.queryByRole("button")
    expect(filterButton.textContent).toEqual("custom text")
    await user.click(filterButton)
    expect(filterButton.textContent).toEqual("custom text 2")
  })

  it("should display no titles if filterTitle and filterTitle2 props were not provided", async () => {
    const user = userEvent.setup()
    render(<List list={list} renderer={renderer} filterFn={filterFn} />)

    expect(screen.queryByRole("heading", { level: 3 })).toBeNull()
    const filterButton = await screen.getByRole("button")
    await user.click(filterButton)
    expect(screen.queryByRole("heading", { level: 3 })).toBeNull()
  })

  it("should display filterTitle before filtering and no title after if filterTitle prop was provided", async () => {
    const user = userEvent.setup()
    render(
      <List
        list={list}
        renderer={renderer}
        filterFn={filterFn}
        filterTitle={"my filter title"}
      />
    )

    const filterTitle = await screen.getByRole("heading", { level: 3 })
    expect(filterTitle).toBeInTheDocument()
    expect(filterTitle.textContent).toEqual("my filter title")
    const filterButton = await screen.getByRole("button")
    await user.click(filterButton)
    expect(screen.queryByRole("heading", { level: 3 })).toBeNull()
  })

  it("should display no title before filtering and filterTitle2 after if filterTitle2 prop was provided", async () => {
    const user = userEvent.setup()
    render(
      <List
        list={list}
        renderer={renderer}
        filterFn={filterFn}
        filterTitle2={"my filter title 2"}
      />
    )

    expect(screen.queryByRole("heading", { level: 3 })).toBeNull()
    const filterButton = await screen.getByRole("button")
    await user.click(filterButton)
    const filterTitle2 = await screen.getByRole("heading", { level: 3 })
    expect(filterTitle2).toBeInTheDocument()
    expect(filterTitle2.textContent).toEqual("my filter title 2")
  })

  it("should display filterTitle before filtering and filterTitle2 after if filterTitle and filterTitle2 prop were provided", async () => {
    const user = userEvent.setup()
    render(
      <List
        list={list}
        renderer={renderer}
        filterFn={filterFn}
        filterTitle={"my filter title"}
        filterTitle2={"my filter title 2"}
      />
    )

    const filterTitle = await screen.getByRole("heading", { level: 3 })
    expect(filterTitle).toBeInTheDocument()
    expect(filterTitle.textContent).toEqual("my filter title")

    const filterButton = await screen.getByRole("button")
    await user.click(filterButton)
    const filterTitle2 = await screen.getByRole("heading", { level: 3 })
    expect(filterTitle2).toBeInTheDocument()
    expect(filterTitle2.textContent).toEqual("my filter title 2")
  })
})

describe("When an itemsPerPage prop is passed", () => {
  it("should paginate the page accordingly", async () => {
    const user = userEvent.setup()
    render(<List list={list} renderer={renderer} itemsPerPage={2} />)
    expect(screen.getByText("item1")).toBeInTheDocument()
    expect(screen.queryByText("item3")).not.toBeInTheDocument()
  })

  it("should update the display when changing pages", async () => {
    const user = userEvent.setup()

    render(<List list={list} renderer={renderer} itemsPerPage={2} />)
    const buttons = screen.getAllByRole("button")
    const prev = buttons[0]
    const next = buttons[buttons.length - 1]

    expect(screen.getByText("item1")).toBeInTheDocument()
    await user.click(next)
    expect(screen.getByText("item3")).toBeInTheDocument()
    expect(screen.queryByText("item1")).not.toBeInTheDocument()

    await user.click(prev)
    expect(screen.queryByText("item3")).not.toBeInTheDocument()
    expect(screen.getByText("item1")).toBeInTheDocument()
  })
})
