import usePaginate from "../utils/hooks/usePaginate"

interface PaginationProps {
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  lastPage: number
  pagePadding?: number
}

export default function Pagination({
  currentPage,
  setCurrentPage,
  lastPage,
  pagePadding = 1,
}: PaginationProps) {
  const pageList = usePaginate(lastPage, pagePadding, currentPage)

  return (
    <div className="flex justify-center gap-4">
      <button
        className="px-2 rounded-md disabled:text-slate-300"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      {pageList.map((item, idx) => {
        if (item === "ELLIPSIS") return <span key={idx}>&#8230;</span>

        return (
          <button
            className={`px-2 select-none cursor-pointer border border-slate-600 ${
              currentPage === item && "bg-red-300"
            }`}
            onClick={() => setCurrentPage(item as number)}
            key={idx}
          >
            {item}
          </button>
        )
      })}
      <button
        className="px-2 rounded-md disabled:text-slate-300"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === lastPage}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  )
}
