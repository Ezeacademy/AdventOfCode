import { File } from "../day7/resolution"
import FileSystemIcons from "./FileSystemIcons"

type TreeFileProps = {
  item: File
  hideSize: {
    dir: boolean
    file: boolean
  }
}

export default function TreeFile({ item, hideSize }: TreeFileProps) {
  return (
    <div data-testid={item.name} className={"mb-1 ml-6"}>
      <FileSystemIcons itemType={"file"} />
      {item.name}
      <div className={`ml-2 text-sm inline-block ${hideSize.file && "hidden"}`}>
        ({item.size})
      </div>
    </div>
  )
}
