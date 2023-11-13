import { ListItemProps } from "../types"

export default function ListItem({ item, classes }: ListItemProps) {
  return (
    <div
      className={`flex flex-col gap-1 border-2 items-start w-fit p-2 ${classes}`}
    >
      {Object.entries(item).map(([key, value]) => {
        return (
          <p key={key}>
            <>
              <span className="font-bold">{key}: </span>
              {Array.isArray(value) ? value.join(", ") : value}
            </>
          </p>
        )
      })}
    </div>
  )
}
