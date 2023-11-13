import { useState } from "react"
import { ListProps } from "../types"
import Pagination from "./Pagination"

type Item = Record<string, string | number | string[] | number[] | boolean>

export default function List<T extends Item>({
  list,
  renderer,
  filterBtnText = "filter",
  filterBtnText2 = "clear filter",
  filterFn = null,
  filterTitle = "",
  filterTitle2 = "",
  itemsPerPage = 0,
}: ListProps<T>) {
  const [isClick, setIsClick] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPP = Math.floor(itemsPerPage)

  const upperBound = currentPage * itemsPP
  const lowerBound = upperBound - itemsPP
  const totalPages = Math.ceil(list.length / itemsPP)

  if (filterFn) {
    list = isClick ? filterFn(list) : list
  }

  if (itemsPP > 0) {
    list = list.slice(lowerBound, upperBound)
  }

  return (
    <div className="space-y-2 w-full">
      {filterFn && (
        <>
          <button
            className={"px-2 py-1 rounded-md bg-slate-300"}
            onClick={() => setIsClick(!isClick)}
          >
            {isClick ? filterBtnText2 : filterBtnText}
          </button>
          {filterTitle && !isClick && (
            <h3 className="text-lg">{filterTitle}</h3>
          )}
          {filterTitle2 && isClick && (
            <h3 className="text-lg">{filterTitle2}</h3>
          )}
        </>
      )}
      {list.map((item, idx) => renderer(item, idx))}
      {itemsPP > 0 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          lastPage={totalPages}
          pagePadding={1}
        />
      )}
    </div>
  )
}
