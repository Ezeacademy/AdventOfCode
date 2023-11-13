import useInput from "../utils/hooks/useInput"
import inputtxt from "./input.txt"
import resolution from "./resolution"

export default function Day8() {
  const [visibleTrees, bestScenicScore, grid, gridWidth, gridHeight] =
    useInput(resolution, inputtxt) ?? []

  const treeColor: Record<number, string> = {
    0: "bg-green-100",
    1: "bg-green-200",
    2: "bg-green-300",
    3: "bg-green-400",
    4: "bg-green-500",
    5: "bg-green-600",
    6: "bg-green-700",
    7: "bg-green-800",
    8: "bg-green-900",
    9: "bg-green-950",
  }

  return visibleTrees &&
    bestScenicScore &&
    grid[0]?.length &&
    gridWidth &&
    gridHeight ? (
    <div>
      <p>
        Visible trees from outisde: {visibleTrees}. Highest scene score{" "}
        {bestScenicScore}
      </p>
      <div className="max-w-fit flex flex-col mt-4">
        <p className="font-bold">The darker the green, the higher the tree</p>
        <div className="bg-gradient-to-r from-green-100 to-green-950 h-2"></div>
      </div>

      <div
        className="grid gap-[2px] mt-4"
        style={{
          gridTemplateColumns: `repeat(${gridWidth}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${gridHeight}, minmax(0, 1fr))`,
        }}
      >
        {grid.map((row) =>
          row.map((tree) => (
            <div
              className={`col-span-1 row-span-1 w-2 h-2 ${treeColor[tree]}`}
            ></div>
          ))
        )}
      </div>
    </div>
  ) : (
    <></>
  )
}
