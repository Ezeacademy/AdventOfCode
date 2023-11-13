import {
  faFile,
  faFolder,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface ComponentsType {
  [key: string]: JSX.Element
}

const iconComponents: ComponentsType = {
  directoryOpen: <FontAwesomeIcon icon={faFolderOpen} />,
  directory: <FontAwesomeIcon icon={faFolder} />,
  file: <FontAwesomeIcon icon={faFile} />,
}

export default function FileSystemIcons({ itemType }: { itemType: string }) {
  return <div className="mr-2 inline-block">{iconComponents[itemType]}</div>
}
