import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe } from "vitest"
import Pagination from "../src/components/Pagination"

function isExpectedPages(arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    if (Number(arr1[i].textContent) !== arr2[i]) return false
  }
  return true
}

describe("When called with currentPage = 15, lastPage = 100 and pagePadding = 2 ", () => {
  beforeEach(() => {
    render(<Pagination currentPage={15} lastPage={100} pagePadding={2} />)
  })

  it("should display numbers 1, 13, 14, 15, 16, 17 and 100", () => {
    const expectedArray = [1, 13, 14, 15, 16, 17, 100]
    const pages = screen.getAllByText((content) => {
      const page = Number(content)
      return expectedArray.includes(page)
    })
    expect(pages).toBeDefined()
    expect(pages.length).toEqual(7)
    expect(isExpectedPages(pages, expectedArray)).toBe(true)
  })

  it("should display two '…'", () => {
    const ellipsis = screen.getAllByText(/…/)
    expect(ellipsis).toBeDefined()
    expect(ellipsis.length).toEqual(2)
  })

  it("should display a prev page button", () => {
    const buttons = screen.getAllByRole("button")
    const prev = buttons[0]
    expect(prev).toHaveClass("disabled:text-slate-300")
    expect(prev.textContent).toEqual("")
  })

  it("should display a next page button", () => {
    const buttons = screen.getAllByRole("button")
    const next = buttons[buttons.length - 1]
    expect(next).toHaveClass("disabled:text-slate-300")
    expect(next.textContent).toEqual("")
  })
})

describe("When called without a pagePadding prop", () => {
  it("should default to 1", () => {
    render(<Pagination currentPage={63} lastPage={100} />)
    const expectedArray = [1, 62, 63, 64, 100]
    const pages = screen.getAllByText((content) => {
      const page = Number(content)
      return expectedArray.includes(page)
    })
    expect(pages).toBeDefined()
    expect(pages.length).toEqual(5)
    expect(isExpectedPages(pages, expectedArray)).toBe(true)
  })
})

describe("The '…' character", () => {
  it("should be displayed only once to the right if the distance between currentPage and firstPage is <= pagePadding", () => {
    render(<Pagination currentPage={4} lastPage={20} pagePadding={2} />)
    const expectedArray = [1, 2, 3, 4, 5, 6, "…", 20]
    const ellipsis = screen.getAllByText("…")
    const content = screen.getAllByText(/./)

    expect(ellipsis).toBeDefined()
    expect(content).toBeDefined()
    expect(ellipsis.length).toEqual(1)
    expect(content.length).toEqual(8)
    expect(content[6].textContent).toEqual("…")
  })

  it("should be displayed only once to the left if the distance between currentPage and lastPage is <= pagePadding", () => {
    render(<Pagination currentPage={17} lastPage={20} pagePadding={2} />)
    const expectedArray = [1, "…", 15, 16, 17, 18, 19, 20]
    const ellipsis = screen.getAllByText("…")
    const content = screen.getAllByText(/./)

    expect(ellipsis).toBeDefined()
    expect(content).toBeDefined()
    expect(ellipsis.length).toEqual(1)
    expect(content.length).toEqual(8)
    expect(content[1].textContent).toEqual("…")
  })

  it("shouldn't be displayed if the distance between currentPage and firstPage/lastPage is <= pagePadding", () => {
    render(<Pagination currentPage={3} lastPage={6} pagePadding={2} />)
    const expectedArray = [1, 2, 3, 4, 5, 6]
    const ellipsis = screen.queryByText("…")
    const content = screen.getAllByText(/./)

    expect(ellipsis).toBeNull()
    expect(content).toBeDefined()
    expect(content.length).toBe(6)
    expect(isExpectedPages(content, expectedArray)).toBe(true)
  })
})

describe("When a setCurrentPage function prop is passed", () => {
  it("should attach a click handler to each page number that passes the number to the setCurrentPage function", async () => {
    const user = userEvent.setup()
    let currPage = 15
    function setPage(page) {
      currPage = page
    }
    const { rerender } = render(
      <Pagination
        currentPage={currPage}
        lastPage={100}
        setCurrentPage={setPage}
      />
    )

    expect(screen.queryByText(13)).not.toBeInTheDocument()
    expect(screen.getByText(16)).toBeInTheDocument()
    await user.click(screen.getByText(14))
    expect(currPage).toEqual(14)

    rerender(
      <Pagination
        currentPage={currPage}
        lastPage={100}
        setCurrentPage={setPage}
      />
    )
    expect(screen.getByText(13)).toBeInTheDocument()
    expect(screen.queryByText(16)).not.toBeInTheDocument()
  })

  it("should display the pages for the previous page when clicking the previous page button", async () => {
    const user = userEvent.setup()
    let currPage = 15
    function setPage(page) {
      currPage = page
    }

    const { rerender } = render(
      <Pagination
        currentPage={currPage}
        lastPage={100}
        setCurrentPage={setPage}
      />
    )

    const buttons = screen.getAllByRole("button")
    const prev = buttons[0]
    expect(screen.queryByText(13)).not.toBeInTheDocument()
    expect(screen.getByText(16)).toBeInTheDocument()

    await user.click(prev)

    rerender(
      <Pagination
        currentPage={currPage}
        lastPage={100}
        setCurrentPage={setPage}
      />
    )

    expect(screen.getByText(13)).toBeInTheDocument()
    expect(screen.queryByText(16)).not.toBeInTheDocument()
  })

  it("should display the pages for the next page when clicking the next page button", async () => {
    const user = userEvent.setup()
    let currPage = 15
    function setPage(page) {
      currPage = page
    }

    const { rerender } = render(
      <Pagination
        currentPage={currPage}
        lastPage={100}
        setCurrentPage={setPage}
      />
    )

    const buttons = screen.getAllByRole("button")
    const next = buttons[buttons.length - 1]
    expect(screen.queryByText(17)).not.toBeInTheDocument()
    expect(screen.getByText(14)).toBeInTheDocument()

    await user.click(next)

    rerender(
      <Pagination
        currentPage={currPage}
        lastPage={100}
        setCurrentPage={setPage}
      />
    )

    expect(screen.getByText(17)).toBeInTheDocument()
    expect(screen.queryByText(14)).not.toBeInTheDocument()
  })
})

describe("When the currentPage is 1 or lastPage", () => {
  it("should disable prev button when currentPage is 1", async () => {
    render(<Pagination currentPage={1} lastPage={100} />)

    const buttons = screen.getAllByRole("button")
    const prev = buttons[0]
    expect(prev).toBeDisabled()
  })

  it("should disable next button when currentPage is lastPage", async () => {
    render(<Pagination currentPage={100} lastPage={100} />)

    const buttons = screen.getAllByRole("button")
    const next = buttons[buttons.length - 1]
    expect(next).toBeDisabled()
  })
})
