export default function Stacks({
  stacks,
  columns,
}: {
  stacks: { [key: string]: string[] }
  columns?: number
}) {
  const filteredStacks = Object.entries(stacks).filter(([key]) => key !== "mov")

  return (
    <div data-testid="stacksWrapper" className="pb-4">
      <div className="flex gap-2 min-h-full min-w-[14rem] bg-zinc-200 rounded-sm drop-shadow-sm w-fit p-2 font-bold">
        {filteredStacks.sort().map(([_, stack], idx) => (
          <div
            data-testid={`stack${idx + 1}`}
            key={idx}
            className="flex flex-col justify-end"
          >
            {stack.length > 0 ? (
              [...stack].reverse().map((letter, innerIdx) => (
                <div
                  data-testid={`box${idx}${innerIdx}`}
                  className={`min-w-[1rem] -mb-[0.35rem] text-center ${
                    innerIdx === 0 && "text-red-400"
                  }`}
                  key={innerIdx}
                >
                  {letter}
                </div>
              ))
            ) : (
              <div data-testid="emptyStack" className="min-w-[1rem]"></div>
            )}
          </div>
        ))}
      </div>
      {columns && (
        <div
          data-testid="enumerateFooter"
          className="text-md min-w-[14rem] flex gap-2 px-2 bg-zinc-600 text-white"
        >
          {Array.from({ length: columns }, (_, i) => i + 1).map((n, idx) => (
            <div
              data-testid={`stackNumber${idx + 1}`}
              className="inline-block font-bold min-w-[1rem] text-center"
              key={idx}
            >
              {n}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
