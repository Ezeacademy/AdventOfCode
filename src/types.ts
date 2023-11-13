export interface ListProps<T> {
  list: T[]
  renderer: (item: T, idx: number) => React.ReactNode
  filterBtnText?: string
  filterBtnText2?: string
  filterFn?: ((list: T[]) => T[]) | null
  filterTitle?: string
  filterTitle2?: string
  itemsPerPage?: number
}

export interface ListItemProps {
  item: Record<string, string | number | string[] | number[]>
  classes?: string
}

export type Enano = {
  name: string
  collected: number[]
  total: number
}

export type RoundType = {
  enanoPick: "Rock" | "Paper" | "Scissors"
  myPick: "Rock" | "Paper" | "Scissors"
  handResult: "Enano wins." | "Draw." | "I win."
}

export type RucksackType = {
  rucksack: string
  misplacedItem: string
  priority: number
}

export type RucksackGroupType = {
  rucksacks: string
  groupNumber: number
  badge: string
  priority: number
}

export type RangesLine = {
  ranges: string[]
  contains: boolean
  intersects: boolean
  areEqual: boolean
  containsDetails?: string
  intersection?: string
}

export type Grid = number[][]
