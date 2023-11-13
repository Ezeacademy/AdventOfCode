export default function Moves({ moves }: { moves: string[] }) {
  const [amount, source, target] = moves

  return (
    <div data-testid="movesWrapper" className="mb-4 -mt-8">
      <div className="text-sm mx-auto flex justify-center">
        {"move " + amount + " from " + source + " to " + target}
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 mx-auto"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
        />
      </svg>
      <div className="text-sm mx-auto flex justify-center">
        {"move " + amount + " from " + target + " to " + source}
      </div>
    </div>
  )
}
