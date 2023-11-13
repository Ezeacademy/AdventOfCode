export default function usePaginate(
  lastPage: number,
  pagePadding: number,
  currentPage: number
): (string | number)[] {
  const pageRange = pagePadding * 2 + 3
  const firstPage = 1
  const ELLIPSIS = "ELLIPSIS"

  function range(length: number, offset: number) {
    return Array.from({ length: length }, (_, i) => i + offset)
  }

  if (pageRange >= lastPage) {
    return range(lastPage, 1)
  }

  const leftMarginPage = Math.max(currentPage - pagePadding, 1)
  const rightMarginPage = Math.min(currentPage + pagePadding, lastPage)

  const isEllipsisLeft = leftMarginPage > 2
  const isEllipsisRight = rightMarginPage < lastPage - 1

  if (isEllipsisLeft && isEllipsisRight) {
    const middleIsle = range(
      rightMarginPage - leftMarginPage + 1,
      leftMarginPage
    )
    return [1, ELLIPSIS, ...middleIsle, ELLIPSIS, lastPage]
  }

  if (isEllipsisLeft) {
    const rightSide = range(lastPage - leftMarginPage + 1, leftMarginPage)
    return [1, ELLIPSIS, ...rightSide]
  }

  const leftSide = range(rightMarginPage, 1)
  return [...leftSide, ELLIPSIS, lastPage]
}
